import type { IUpdateUserModal } from "../Types/typeModals.d.ts";
import type { IUser } from "../Types/typeUsers.d.ts";
import {useLoggedStore} from "../StateManager/userStore.ts";
import useFlashMessage from "../Hook/useFlashMessage.tsx";
import config from "../config/config.tsx";
import React, {useState} from "react";

export const UpdateUserModal = ({selectedUser, userList, setUserList, setOpenUpdateModal}: IUpdateUserModal) => {
    const serverHost: string = config.serverHost;
    const onClose = () => {
        setOpenUpdateModal(false);
    }

    const { token, username, admin } = useLoggedStore();
    const { toastMessage, createDefaultToastOptions } = useFlashMessage("");
    const toastOptionsError = createDefaultToastOptions({type: 'error', position: 'top-center', autoClose: 3000});
    const toastOptionsSuccess = createDefaultToastOptions({type: 'success', position: 'top-center', autoClose: 3000});
    const [updatedData, setUpdatedData] = useState<IUser>({id: selectedUser.id,username: "", admin: "", email: ""})
    const onUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const initialEmail: string = selectedUser.email ? selectedUser.email : "";

        try {
            const response = await fetch(`${serverHost}/update-user`, {
                method: 'POST',
                mode: "cors",
                body: new URLSearchParams({
                    id: updatedData.id.toString(),
                    username: updatedData.username != "" ? updatedData.username : selectedUser.username,
                    admin: updatedData.admin != "" ? updatedData.admin : selectedUser.admin,
                    email: updatedData.email ? updatedData.email : initialEmail
                }),
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                toastMessage(data.message, toastOptionsSuccess);
                setUserList(values => {
                    return values.map(item => item.id === selectedUser.id ? {...item, ...updatedData} : item)
                })
            } else if (response.status !== 500) {
                const errorData = await response.json();
                console.error("échec de la modification:", errorData);
                toastMessage(errorData.message, toastOptionsError);
            }
        } catch(error) {
            console.error('log failed:', error);
            toastMessage('Il y a eu une erreur dans la requête', toastOptionsError)
        }
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== "") {
            setUpdatedData(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value !== "") {
            setUpdatedData(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    return (
        <div className={`modal` }>
            <div className="modal-content large-auto">
                <div className="modal-header">
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body no-padding-y">
                    {userList.filter(user => user.id === (selectedUser.id && user.username !== username)).map(user =>
                        <p key={user.id}> Modifier <span>{user.username} (id: {user.id})</span> ?</p>
                    )}
                    {userList.filter(user => user.id === (selectedUser.id && user.username === username)).map(user =>
                        <p key={user.id}> Bonjour {user.username}, vous pouvez modifier vos données: ?</p>
                    )}
                </div>
                {userList.filter(user => user.id === selectedUser.id).map(user => (
                    <form className="form-container --80" key={user.id} onSubmit={onUpdate}>
                        <div className="form-elem align-start">
                            <label htmlFor="username" className="text-w-700 padding-y-5">Changer son nom d'utilisateur: </label>
                            <input type="text" name="username" id="username" placeholder={user.username} onChange={handleUserChange}/>
                        </div>
                        <div className="form-elem align-start">
                            <label htmlFor="email" className="text-w-700 padding-y-5">Changer ou allouer un email: </label>
                            <input type="text" name="email" id="email" placeholder={user.email ? user.email : "Aucun email renseigné"} onChange={handleUserChange}/>
                        </div>

                        {(user.admin !== "1" && admin === "1") &&
                        (<div className="form-elem align-start">
                            <label htmlFor="admin" className="text-w-700 padding-y-5">Changer le statut: </label>
                            <div className="select-wrapper">
                                <select name="admin" id="admin" className="custom-select" value={user.admin} onChange={handleUserSelect}>
                                    <option value="0">Utilisateur</option>
                                    <option value="1">Administrateur</option>
                                </select>
                                <div className="select-arrow "></div>
                            </div>
                        </div>)}

                        <div className="modal-footer no-border no-padding margin-top-50 margin-bottom-30">
                            <button className={"footer__button-cancel bgd-darkLavender h-opacity-low text-black text-w-700 shadow"} type={"button"} onClick={onClose}>Annuler</button>
                            <button className={"footer__button-confirm bgd-darkpink h-opacity-low text-white text-w-700 shadow"} type={"submit"} >Modifier</button>
                        </div>
                    </form>

                ))}
            </div>
        </div>
    );
}