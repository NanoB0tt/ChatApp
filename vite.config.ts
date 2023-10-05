import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": `${path.resolve(__dirname, "./src/components/index.ts")}`,
      "@context": `${path.resolve(__dirname, "./src/context/")}`,
      "@customHooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@api": path.resolve(__dirname, "./src/services/api/"),
      "@socket": path.resolve(__dirname, "./src/services/socket/socket.ts"),
    },
  },
});
