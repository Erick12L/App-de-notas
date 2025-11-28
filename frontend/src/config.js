import Constants from "expo-constants";

export const API_URL =
  Constants.expoConfig?.extra?.API_URL ??
  Constants.manifest?.extra?.API_URL ??
  "https://app-de-notas-production.up.railway.app";