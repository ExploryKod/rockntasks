import config from '../config/config.js';
import { useLoggedStore } from '../StateManager/userStore.ts';

export default function useGetUserList() {

    const serverHost:number | string = config.serverHost;
    const { token } = useLoggedStore();
    return async function () {
        return fetch(`${serverHost}/user-list`, {
            method: 'GET',
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(data => data.json())
    }
}