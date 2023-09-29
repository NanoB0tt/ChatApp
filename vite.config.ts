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
      "@context/interfaces": `${path.resolve(
        __dirname,
        "./src/context/interfaces.ts",
      )}`,
      "@customHooks": path.resolve(__dirname, "./src/hooks/index.ts"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@auth/components": path.resolve(
        __dirname,
        "./src/pages/auth/components/index.ts",
      ),
      "@chat/components": path.resolve(
        __dirname,
        "./src/pages/chat/components/index.ts",
      ),
      "@api/axios": path.resolve(__dirname, "./src/services/api/axios.ts"),
      "@api/routes": path.resolve(__dirname, "./src/services/api/routes.ts"),
      "@socket": path.resolve(__dirname, "./src/services/socket/socket.ts"),
    },
  },
});
