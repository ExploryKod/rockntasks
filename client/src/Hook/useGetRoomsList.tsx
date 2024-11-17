import config from '../config/config.js';
import { useLoggedStore } from '../StateManager/userStore.ts';

export default function userRoomsList() {
  
    const serverHost:string = config.serverHost;
    const { token } = useLoggedStore();
    return async function () {
        const data = await fetch(`${serverHost}/chat/rooms`, {
            method: 'GET',
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await data.json();
    }
}
