import config from '../config/config.js';

export default function useGetChat() {
    const serverHost: string | undefined = config.serverHost;

    return async function () {
        const data = await fetch(`${serverHost}/chat`, {
            method: 'GET',
            mode: "cors"
        });
        return await data.json();
    }
}