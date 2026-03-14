import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use single-file output only when VITE_SINGLE_FILE=true (e.g. for email/offline demos)
const useSingleFile = process.env.VITE_SINGLE_FILE === "true";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(useSingleFile ? [viteSingleFile()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          
          // Page chunks
          'pages-home': ['./src/pages/Home.tsx'],
          'pages-properties': ['./src/pages/PropertiesPage.tsx', './src/pages/PropertyDetailsPage.tsx'],
          'pages-payment': ['./src/pages/PaymentPage.tsx', './src/pages/PaymentGatewayPage.tsx'],
          'pages-admin': ['./src/pages/AdminDashboard.tsx'],
          
          // Component chunks
          'components-contact': ['./src/components/Contact.tsx'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
