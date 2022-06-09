import { useGlobalState } from "./useGlobalState";

export function useApi() {
  const { api } = useGlobalState();

  return api;
}
