import UserList from "../Component/UserList";
import { useLoggedStore } from '../StateManager/userStore.ts';
import RoomList from "../Component/RoomList.tsx";
import { Link } from "react-router-dom";

const Profile = () => {
    const { username } = useLoggedStore();

    return (
        <main className="main-container">
            <h1 className="margin-bottom-10 category-title">Bienvenue {username} !</h1>

            <div className="room-link-container">
                <Link className='max-width-400 button-container center-me nav-link' to='/chat'>
                    Je veux chatter maintenant
                </Link>
            </div>

            <div>
                <UserList />
                <RoomList />
            </div>

        </main>
    );
};

export default Profile;
