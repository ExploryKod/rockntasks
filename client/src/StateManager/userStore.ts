import { create } from 'zustand';

interface LoggedState {
    token: string;
    username: string;
    admin: string;
    setToken: (logged: string) => void;
    setUsername: (username: string) => void;
    setAdminStatus: (admin: string) => void;
    removeAdminStatus: () => void;
    removeToken: () => void;
    removeUsername: () => void;
}

export const useLoggedStore = create<LoggedState>((set) => ({
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
    admin: localStorage.getItem('admin') || '',
    setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token: token });
    },
    removeToken: () => {
        localStorage.removeItem('token');
        set({ token: '' }); // Set the token to an empty string in the state
    },
    setUsername: (username: string) => {
        localStorage.setItem('username', username);
        set({ username: username });
    },
    removeUsername: () => {
        localStorage.removeItem('username');
        set({ username: '' }); // Set the username to an empty string in the state
    },
    setAdminStatus: (admin: string) => {
        localStorage.setItem('admin', admin);
        set({ admin: admin });
    },
    removeAdminStatus: () => {
        localStorage.removeItem('admin');
    }
}));



