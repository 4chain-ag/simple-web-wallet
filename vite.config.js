import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/spv-wallet': {
        target: 'https://bsvworkshops.pl',
        // target: 'http://localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/spv-wallet/, ''),

        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log(
                "Sending Request:",
                req.method,
                req.url,
                " => TO THE TARGET =>  ",
                proxyReq.method,
                proxyReq.protocol,
                proxyReq.host,
                proxyReq.path,
                JSON.stringify(proxyReq.getHeaders()),
            );
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url,
                JSON.stringify(proxyRes.headers),
            );
          });
        },
      }
    }
  }
})
