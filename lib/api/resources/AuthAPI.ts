import { Platform } from "react-native";
import { Auth } from "../../auth";
import { HTTP } from "../http";
import { parseUserResponse } from "../parseResponse";
import type {
  AuthenticatedResponse,
  UserResponse,
  VerifyActivationCodeResponse,
} from "../types";

export class AuthAPI {
  private http: HTTP;
  constructor(http: HTTP) {
    this.http = http;
  }

  async login(username: string, password: string) {
    const response = await this.http.post<AuthenticatedResponse>(
      "v1/auth/login",
      {
        username,
        password,
      }
    );

    await Auth.updateState(response.accessToken, response.refreshToken);
  }

  async completeRegistration(
    username: string,
    password: string,
    activationCode: string,
    locale: string
  ) {
    const response = await this.http.post<AuthenticatedResponse>(
      "v1/auth/register/complete",
      {
        username,
        password,
        activationCode,
        locale,
      }
    );

    await Auth.updateState(response.accessToken, response.refreshToken);

    return response;
  }

  async startRegistration(email: string) {
    await this.http.post("v1/auth/register/start", {
      email,
    });
  }

  async refresh() {
    if (!Auth.getRefreshToken()) throw new Error("No refresh token in cache");

    const response = await this.http.post<AuthenticatedResponse>(
      "v1/auth/refresh",
      {
        refreshToken: Auth.getRefreshToken(),
      }
    );

    await Auth.updateState(response.accessToken, response.refreshToken);
  }

  async me() {
    const response = await this.http.get<UserResponse>("v1/auth/me");

    return parseUserResponse(response);
  }

  async verifyActivationCode(activationCode: string) {
    const response = await this.http.post<VerifyActivationCodeResponse>(
      "v1/auth/activation-code/verify",
      {
        activationCode,
      }
    );

    return response;
  }

  async startPasswordReset(emailOrUsername: string) {
    await this.http.post("v1/auth/reset-password", {
      emailOrUsername,
    });
  }

  async completePasswordReset(password: string, activationCode: string) {
    await this.http.post("v1/auth/reset-password/complete", {
      password,
      activationCode,
    });
  }

  async registerDeviceToken(token: string) {
    await this.http.post("v1/auth/device-token", {
      token,
      platform: Platform.OS,
    });
  }

  async updateLocale(locale: string) {
    await this.http.put("v1/auth/locale", {
      locale,
    });
  }

  async logout(deviceToken: string | null) {
    await this.http.post("v1/auth/logout", {
      deviceToken,
      refreshToken: Auth.getRefreshToken(),
    });
  }
}
