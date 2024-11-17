import { Navigate, useLocation } from "react-router-dom";
import { useLoggedStore } from '../StateManager/userStore.ts';
import React from "react";

interface NeedAuthProps {
    children: React.ReactNode;
}

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const admin = localStorage.getItem('admin');
if (token) {
    useLoggedStore.setState({ token: token });
}
if(username) {
    useLoggedStore.setState({ username: username });
}
if(admin) {
    useLoggedStore.setState({ admin: admin });
}
export default function NeedAuth(props: NeedAuthProps): React.ReactElement {
    const location = useLocation();
    const { token, username } = useLoggedStore();


    if (token && username) {
        return <>{props.children}</>;
    } else {
        return <Navigate to="/connexion" state={{ from: location }} />;
    }
}
