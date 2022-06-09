import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Auth } from "../auth";
import { Config } from "../config";

class APIError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

const UNAUTHENTICATED_ROUTES = [
  "v1/auth/login",
  "v1/auth/register",
  "v1/auth/refresh",
  "v1/auth/register/start",
  "v1/auth/activation-code/verify",
];

export class HTTP {
  private onRefreshToken: () => Promise<void>;
  private http: AxiosInstance;

  constructor(onRefreshToken: () => Promise<void>) {
    this.onRefreshToken = onRefreshToken;
    this.http = axios.create({
      baseURL: Config.apiBaseUrl,
      timeout: 25000,
      withCredentials: true,
    });
    this.initHTTP();
  }

  private initHTTP() {
    this.http.defaults.headers = {
      "Content-Type": "application/json",
    };

    this.http.interceptors.request.use((request) => {
      console.log(`[${request.method?.toUpperCase()} ${request.url}]`);
      if (!UNAUTHENTICATED_ROUTES.includes(request.url as string)) {
        request.headers.Authorization = `Bearer ${Auth.getAccessToken()}`;
      }

      // @ts-ignore
      request.metadata = {
        startTime: new Date(),
      };
      return request;
    });

    this.http.interceptors.response.use((response) => {
      console.log(
        `[${response.config.method?.toUpperCase()} ${response.config.url}]: ${
          response.status
        } ${
          // @ts-ignore
          response.config.metadata &&
          // @ts-ignore
          new Date().valueOf() - response.config.metadata.startTime.valueOf()
        }ms`
      );

      if (response && response.data) {
        if (
          response.data.skip !== undefined &&
          response.data.limit !== undefined
        ) {
          return response.data;
        } else {
          return response.data.result;
        }
      } else {
        return response;
      }
    });

    this.createErrorResponseInterceptor();
  }

  async get<ResponseType>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ResponseType> {
    return this.http.get(url, config);
  }

  async post<ResponseType>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ResponseType> {
    return this.http.post(url, data);
  }

  async patch<ResponseType>(url: string, data?: any): Promise<ResponseType> {
    return this.http.patch(url, data);
  }

  async put<ResponseType>(url: string, data?: any): Promise<ResponseType> {
    return this.http.put(url, data);
  }

  private createErrorResponseInterceptor() {
    const interceptor = this.http.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        let didEject = false;

        const apiError = !err.response
          ? new APIError(err.message, -1)
          : new APIError(
              err.response.data.errorMessage || err.response.data,
              err.response.status
            );

        try {
          if (
            err.response.status === 401 &&
            err.response.config.url !== "v1/auth/login"
          ) {
            // Eject this interceptor to prevent a loop if we get a 404 after refreshing
            this.http.interceptors.response.eject(interceptor);

            didEject = true;

            // Refresh the access token
            await this.onRefreshToken();

            // Replay the original request
            return this.http(err.response.config);
          } else {
            throw apiError;
          }
        } catch (refreshErr) {
          throw apiError;
        } finally {
          if (didEject) this.createErrorResponseInterceptor();
        }
      }
    );
  }
}
