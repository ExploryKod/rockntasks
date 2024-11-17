import { Fragment } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useLoggedStore } from '../StateManager/userStore.ts';
import useFlashMessage from '../Hook/useFlashMessage.tsx';
import { LogOut } from 'lucide-react';

const Navigation = () => {

    const navigate = useNavigate();
    const { toastMessage, createDefaultToastOptions } = useFlashMessage('');
    const { removeToken, removeUsername, removeAdminStatus } = useLoggedStore();
    const toastOptionsSuccess = createDefaultToastOptions({type: 'success', position: 'top-center', autoClose: 3000});
    const avatarImg :string = "https://picsum.photos/id/1011/500/500"

    const handleLogout = () => {
        removeToken();
        removeUsername();
        removeAdminStatus();
        toastMessage('Vous êtes bien déconnecté', toastOptionsSuccess);
        // Redirect to the login page or any other desired page after logout
        navigate('/');
    };

    return (
        <Fragment>
            <div className='padding-top-30 --justify-between --vertical navigation'>
                <div className='--vertical first-nav nav-links-container'>
                    <div className="avatar nav-link">
                        <div className="margin-bottom-30 avatar-container">
                            <img className="avatar-container__image" src={avatarImg} alt="avatar"/>
                        </div>
                    </div>
                </div>
                <div className='--vertical nav-links-container second-nav'>
                    <Link className='board nav-link' to='/'>
                        Mon board
                    </Link>
                    <Link className='nav-link salon' to='/chat'>
                        Les Salons
                    </Link>
                </div>
                <div className='--vertical last-nav nav-links-container'>
                    <button className='exit-btn nav-link' onClick={handleLogout}>
                        <span>Se déconnecter</span>
                        <span className="exit-btn__icon"><LogOut  size={24} /></span>
                    </button>
                </div>
            </div>

            <Outlet />
        </Fragment>
    )
}

export default Navigation;
