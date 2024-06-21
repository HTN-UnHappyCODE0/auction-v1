import type { APIResponse } from "@/types";
import axios from "../plugins/axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("AthStore", {
  state: () => ({}),

  actions: {
    async registerUser(form: Record<string, string>) {
      return new Promise<number>(async (resolve, reject) => {
        try {
          const { data } = await axios.post("/api/User/register", { ...form });
          console.log("REGISTER", data);
          resolve(1);
        } catch (error) {
          reject(error);
        }
      });
    },
    async loginUser(form: Record<string, string>) {
      return new Promise<String>(async (resolve, reject) => {
        try {
          const { data } = await axios.post<
            APIResponse<{ accessToken: string; refreshToken: string }>
          >("/login", { ...form });
          console.log("LOGIN", data);

          localStorage.setItem(
            "currentAuthTokens",
            JSON.stringify({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            }),
          );
          resolve("OK");
        } catch (error) {
          reject(error);
        }
      });
    },
  },
});
