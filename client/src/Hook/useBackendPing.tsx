import config from "../config/config";

interface PingResponse {
    message: string;
    // Add other properties if necessary
}

export default function useBackendPing() {
    const serverHost = config.serverHost;

    return function (userId: number): Promise<string> {
        return fetch(`${serverHost}/ping/${userId}`, {
            method: 'POST',
        })
            .then(response => response.json() as Promise<PingResponse>)
            .then(data => data.message);
    };
}
