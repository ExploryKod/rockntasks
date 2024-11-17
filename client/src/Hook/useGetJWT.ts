import config from "../config/config.tsx";

export default function useGetJWT() {


    return function (username: string, password:string) {
        const credentials = btoa(`${username}:${password}`);
        const serverHost: string | undefined = config.serverHost;

        return fetch(`${serverHost}/login`, {
            method: 'GET',
            credentials: "include",
            mode: "cors",
            headers: {
                'Authorization': `Basic ${credentials}`
            }
        })
            .then(data => data.json())
    }
}