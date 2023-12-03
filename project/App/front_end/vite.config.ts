import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __TOKEN_PREFIX__: `"${process.env.TOKEN_PREFIX}"`,
    __BACKEND_URL__: `"${process.env.BACKEND_URL}"`,
  },
});
