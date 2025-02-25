import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"), // Added alias for components
      "contexts": path.resolve(__dirname, "./src/contexts"), // Added alias for contexts
    },
  },
})