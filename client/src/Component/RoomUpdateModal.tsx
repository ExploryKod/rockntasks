import type { IUpdateRoomModal } from "../Types/typeModals.d.ts";
import type { IRoom } from "../Types/typeRooms.d.ts";
import {useLoggedStore} from "../StateManager/userStore.ts";
import useFlashMessage from "../Hook/useFlashMessage.tsx";
import config from "../config/config.tsx";
import React, {useState} from "react";

export const RoomUpdateModal = ({title,selectedRoom, roomList, setRoomList, setOpenUpdateRoomModal}: IUpdateRoomModal) => {
    const serverHost: string = config.serverHost;
    const onClose = () => {
        setOpenUpdateRoomModal(false);
    }

    const { token } = useLoggedStore();
    const { toastMessage, createDefaultToastOptions } = useFlashMessage("");
    const toastOptionsError = createDefaultToastOptions({type: 'error', position: 'top-center', autoClose: 3000});
    const toastOptionsSuccess = createDefaultToastOptions({type: 'success', position: 'top-center', autoClose: 3000});
    const [updatedRoomData, setUpdatedRoomData] = useState<IRoom>({id: selectedRoom.id, name: "", description: ""})
    const onUpdate = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const initialDescription: string = selectedRoom.description ? selectedRoom.description : "";

        try {
            const response = await fetch(`${serverHost}/update-room`, {
                method: 'POST',
                mode: "cors",
                body: new URLSearchParams({
                    id: updatedRoomData.id.toString(),
                    name: updatedRoomData.name != "" ? updatedRoomData.name : selectedRoom.name,
                    description: updatedRoomData.description ? updatedRoomData.description : initialDescription
                }),
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                toastMessage(data.message, toastOptionsSuccess);

                setRoomList(values => {
                    return values.map(item => item.id === selectedRoom.id ? {...item, ...updatedRoomData} : item)
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

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== "") {
            setUpdatedRoomData(prevState => {
                return {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            })
        }
    }

    // const handleRoomStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     if(e.target.value !== "") {
    //         setUpdatedData(prevState => {
    //             return {
    //                 ...prevState,
    //                 [e.target.name]: e.target.value
    //             }
    //         })
    //     }
    // }

    return (
        <div className={`modal` }>
            <div className="modal-content large-auto">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body no-padding-y">
                    {roomList.filter(room => room.id === selectedRoom.id).map(room =>
                        <p key={room.id}> Modifier <span>{room.name} (id: {room.id})</span> ?</p>
                    )}
                </div>
                {roomList.filter(room => room.id === selectedRoom.id).map(room => (
                    <form className="form-container --80" key={room.id} onSubmit={onUpdate}>
                        <div className="form-elem align-start">
                            <label htmlFor="room-name" className="text-w-700 padding-y-5">Changer le nom : </label>
                            <input type="text" name="name" id="room-name" placeholder={room.name} onChange={handleRoomChange}/>
                        </div>
                        <div className="form-elem align-start">
                            <label htmlFor="description" className="text-w-700 padding-y-5">Changer le thème: </label>
                            <input type="text" name="description" id="description" placeholder={room.description ? room.description : "Aucune description renseigné"} onChange={handleRoomChange}/>
                        </div>
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