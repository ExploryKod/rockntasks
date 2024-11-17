interface Config {
  serverPort: string | number;
  serverHost: string;
  serverWsHost: string;
}

const config:Config = {
    serverPort: 8000,
    serverHost: process.env.VITE_SITE_URL_HTTP ?? "http://localhost:4000",
    serverWsHost: process.env.VITE_SITE_URL_WS ?? "wss://localhost:4000"
};
  
export default config;

  