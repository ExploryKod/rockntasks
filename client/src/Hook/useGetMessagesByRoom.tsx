
import { useState } from 'react';
import { useLoggedStore } from "../StateManager/userStore.ts";
import config from '../config/config.js';
import type {IMessagesSaved} from '../Types/typeChat';


export default function useGetMessagesByRoom() {
    const [savedMessages, setSavedMessages] = useState<IMessagesSaved>({message: "", messages: []});
    const { token } = useLoggedStore();
    const serverHost:string = config.serverHost;

    const getMessagesByRoom = async (roomId: string) => {
        const data = await fetch(`${serverHost}/chat/messages/${roomId}`, {
            method: 'GET',
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return await data.json();
    };

    return {
        savedMessages,
        setSavedMessages,
        getMessagesByRoom
    };
}