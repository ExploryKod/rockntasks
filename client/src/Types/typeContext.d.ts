import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }
  export type TodoContextType = {
    todos: ITodo[];
    saveTodo: (todo: ITodo) => void;
    updateTodo: (id: number) => void;
  };

export interface UserContextProps {
    user: IUser[];
    setUser: Dispatch<SetStateAction<IUser[]>>;
}

interface UserProviderProps {
    children: ReactNode;
}

