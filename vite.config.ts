import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// import { componentTagger } from "lovable-tagger"; // <-- Supprimer cet import

export default defineConfig(async ({ mode }) => {
  let taggerPlugin = undefined;
  if (mode === "development") {
    // Import dynamique du module ESM
    const mod = await import("lovable-tagger");
    taggerPlugin = mod.componentTagger();
  }
  return {
    server: {
      host: "::",
      port: 8081,
    },
    plugins: [react(), taggerPlugin].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      base: './',
    },
  };

});