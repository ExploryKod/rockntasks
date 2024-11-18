interface Config {
  serverPort: string | number;
  serverHost: string;
}
console.info("server host is : ", process.env.VITE_SITE_URL_HTTP )
const config:Config = {
    serverPort: 8000,
    serverHost: process.env.VITE_SITE_URL_HTTP ?? "https://rockntasks-api.onrender.com/"
};
  
export default config;

  