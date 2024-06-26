import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import viteTsConfigPaths from 'vite-tsconfig-paths';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsConfigPaths({
    root: './',
  }),],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
})
