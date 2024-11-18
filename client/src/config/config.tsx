interface Config {
  serverPort: string | number;
  serverHost: string;
}

const config:Config = {
    serverPort: 8000,
    serverHost: process.env.VITE_SITE_URL_HTTP ?? "https://rockntasks-api.onrender.com/"
};
  
export default config;

  