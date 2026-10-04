import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,  // <-- Force frontend to always use 5174
    strictPort: true, // <-- If 5174 is taken, it will fail instead of choosing another
  },
});
