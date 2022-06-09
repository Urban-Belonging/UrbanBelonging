import * as SecureStore from "expo-secure-store";

// @NOTE Changing these keys will cause the user to login again
const ACCESS_TOKEN_KEYCHAIN_KEY = "snappthis-auth-access-token";
const REFRESH_TOKEN_KEYCHAIN_KEY = "snappthis-auth-refresh-token";
let ACCESS_TOKEN: string | null = null;
let REFRESH_TOKEN: string | null = null;

export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 24;

function getAccessToken() {
  return ACCESS_TOKEN;
}

function getRefreshToken() {
  return REFRESH_TOKEN;
}

async function updateState(
  accessToken: string | null,
  refreshToken: string | null
) {
  ACCESS_TOKEN = accessToken;
  REFRESH_TOKEN = refreshToken;

  if (accessToken) {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEYCHAIN_KEY, accessToken);
  } else {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEYCHAIN_KEY);
  }
  if (refreshToken) {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEYCHAIN_KEY, refreshToken);
  } else {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEYCHAIN_KEY);
  }
}

async function initState() {
  ACCESS_TOKEN = await SecureStore.getItemAsync(ACCESS_TOKEN_KEYCHAIN_KEY);
  REFRESH_TOKEN = await SecureStore.getItemAsync(REFRESH_TOKEN_KEYCHAIN_KEY);
  if (ACCESS_TOKEN && REFRESH_TOKEN) return true;
  return false;
}

export const Auth = {
  getAccessToken,
  getRefreshToken,
  updateState,
  initState,
};
