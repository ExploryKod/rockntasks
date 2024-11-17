import type { IConfirmModal } from "../Types/typeModals.d.ts";
import type { IUser } from "../Types/typeUsers.d.ts";
import {useLoggedStore} from "../StateManager/userStore.ts";
import config from "../config/config.tsx";

export const ConfirmModal = ({title,selectedUser, userList, setUserList, setOpenConfirmModal}: IConfirmModal) => {
    const serverHost: string = config.serverHost;
    const onClose = () => {
        setOpenConfirmModal(false);
    }

    const { token, username } = useLoggedStore();

    const onDelete = (user: IUser) => {
        fetch(`${serverHost}/delete-user/${user.id.toString()}`, {
            method: "DELETE",
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
            .then(response => response.json())
            .then(() => {
                setUserList(values => {
                    return values.filter(item => item.id.toString() !== user.id.toString())
                })
                setOpenConfirmModal(false);
            })
            .catch(error => {
                console.error('Il y a une erreur dans la requête de suppression:', error);
                throw error;
            });
    }

    return (
        <div className={`modal` }>
            <div className="modal-content">

                <div className="modal-header">
                    <h2>{title}</h2>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body small-auto">
                    {userList.filter(user => user.id === selectedUser.id && user.username !== username).map(user => (
                    <p key={user.id}> Voulez-vous supprimer <span>{user.username} (id: {user.id})</span> ?</p> ))}
                    {userList.filter(user => user.id === selectedUser.id && user.username === username).map(user => (
                        <p key={user.id}> Voulez-vous vraiment nous quitter définitivement ?</p> ))}
                </div>
                {userList.filter(user => user.id === selectedUser.id).map(user => (
                <div key={user.id} className="modal-footer">
                    <button className={"footer__button-cancel bgd-success"} type={"button"} onClick={onClose}>Annuler</button>
                    <button className={"footer__button-confirm bgd-warning"} type={"button"} onClick={() => onDelete(user)}>Confirmer</button>
                </div>
                ))}
            </div>
        </div>
    );
}
