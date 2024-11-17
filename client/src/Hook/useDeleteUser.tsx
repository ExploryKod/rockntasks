import config from '../config/config.js';
import { useLoggedStore } from '../StateManager/userStore.ts';
export default function useDeleteUser(id: number | string) {

    const serverHost: string = config.serverHost;
    const { token } = useLoggedStore();

    return function () {
        return fetch(`${serverHost}/delete-user/${id.toString()}`, {
            method: 'GET',
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}