import { create } from 'zustand';

export interface RoomState {
    roomId: number;
    roomName: string;
    roomDescription: string;
    setRoomName: (roomName: string) => void;
    setRoomDescription: (description: string) => void;
    setRoomId: (id: number) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
    roomId: 0,
    roomName: '',
    roomDescription: '',
    setRoomName: (name: string) => set({ roomName: name }),
    setRoomDescription: (description: string) => set({ roomDescription: description }),
    setRoomId: (id: number) => set({ roomId: id }),
}));

export interface SenderMessageStore {
    sendername: string | null;
    sendermessage: string | null;
    action: string | null;
}

export interface ISavedMessageState extends SenderMessageStore {
    id: number;
    roomId: number | string;
    setSendername: (sendername: string) => void,
    setSendermessage: (description: string) => void,
    setRoomId: (roomId: number | string) => void,
    setAction: (action: string) => void,
}

export const useMessagesStore = create<ISavedMessageState>((set) => ({
    id: 0,
    roomId: 0,
    sendermessage: '',
    sendername: '',
    action: '',
    setSendername: (sendername: string) => set({ sendername: sendername }),
    setSendermessage: (description: string) => set({ sendermessage: description }),
    setRoomId: (roomId: number | string) => set({ roomId: roomId }),
    setAction: (action: string) => set({ action: action }),
}));
