import config from '../config/config.js';
import { useLoggedStore } from '../StateManager/userStore.ts';
export default function useDeleteChatHistory(id: number | string) {

    const serverHost: string = config.serverHost;
    const { token } = useLoggedStore();

    return async function () {
        const data = await fetch(`${serverHost}/messages/room/delete-history/${id.toString()}`, {
            method: 'DELETE',
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await data.json();
    }
}