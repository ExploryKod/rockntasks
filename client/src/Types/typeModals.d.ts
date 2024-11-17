import { Dispatch, SetStateAction } from "react";
import {IUser} from "./typeUsers";

export interface IProfileModal {
    profile: IProfile;
    setToggle: Dispatch<SetStateAction<boolean>>;
}

export interface IConfirmModal {
    userList: IUser[];
    selectedUser: IUser;
    title: string;
    setOpenConfirmModal: Dispatch<SetStateAction<boolean>>;
    // isLoading: boolean;
    // setIsLoading: Dispatch<SetStateAction<boolean>>;
    setUserList: Dispatch<SetStateAction<IUser[]>>;
}

export interface IConfirmRoomModal {
    roomList: IRoom[];
    selectedRoom: IRoom;
    title: string;
    setOpenConfirmRoomModal: Dispatch<SetStateAction<boolean>>;
    setRoomList: Dispatch<SetStateAction<IRoom[]>>;
    // isLoading: boolean;
    // setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface IcreateRoomModal {
    roomsList: IRoom[];
    createRoom: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setOpenCreateRoomModal: Dispatch<SetStateAction<boolean>>;
    setRoomsList: Dispatch<SetStateAction<IRoom[]>>;
    setRoomName: Dispatch<SetStateAction<string>>;
    setRoomDescription: Dispatch<SetStateAction<string>>;
}

export interface IUpdateUserModal {
    title: string,
    selectedUser: IUser,
    userList: IUser[],
    setUserList: Dispatch<SetStateAction<IUser[]>>;
    setOpenUpdateModal: Dispatch<SetStateAction<boolean>>;
}

export interface IUpdateRoomModal {
    title: string,
    selectedRoom: IRoom,
    roomList: IRoom[],
    setRoomList: Dispatch<SetStateAction<IRoom[]>>;
    setOpenUpdateRoomModal: Dispatch<SetStateAction<boolean>>;
}