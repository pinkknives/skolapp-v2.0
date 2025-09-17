import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = Number(process.env.PORT) || 5173;
const previewPort = Number(process.env.PREVIEW_PORT) || 5175;
const isCodespaces = !!process.env.CODESPACE_NAME && !!process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

const hmr = isCodespaces
  ? {
      protocol: 'wss' as const,
      host: `${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`,
      clientPort: 443,
    }
  : {
      protocol: 'ws' as const,
      host: 'localhost',
      clientPort: port,
      port,
    };

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port,
    strictPort: false,
    hmr,
    origin: isCodespaces
      ? `https://${process.env.CODESPACE_NAME}-${port}.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
      : undefined,
  },
  preview: {
    host: true,
    port: previewPort,
    strictPort: false,
  },
});
