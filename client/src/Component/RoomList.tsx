import {useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { IRoom } from "../Types/typeRooms.d.ts";

import userRoomsList from "../Hook/useGetRoomsList";

import { ConfirmRoomModal } from "./ConfirmRoomModal.tsx";

import { IconContext } from "react-icons";
import { RiDeleteBin6Line }from "react-icons/ri";
import { FaUserCog } from "react-icons/fa";
import { Tooltip } from "./Tooltip.tsx";
import useFlashMessage from "../Hook/useFlashMessage.tsx";
import {RoomUpdateModal} from "./RoomUpdateModal.tsx";
import {Loader} from "./Loader.tsx";

export default function RoomList() {
    const [openConfirmRoomModal, setOpenConfirmRoomModal] = useState(false);
    const [openUpdateRoomModal, setOpenUpdateRoomModal] = useState(false);
    const { toastMessage, createDefaultToastOptions } = useFlashMessage('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roomList, setRoomList] = useState<IRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<IRoom>();
    const getRoomList = userRoomsList();
    // Create custom options
    const toastOptions = createDefaultToastOptions({
        position: "bottom-right",
        theme: "dark",
        type: "error",
    });


    useEffect(() => {
        setIsLoading(true);
        setOpenConfirmRoomModal(false);
        setSelectedRoom(undefined);
    }, []);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const data = await getRoomList();
                setRoomList(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Erreur dans la requête des listes de rooms: ", error);
                toastMessage('Erreur dans la requête des rooms existantes', toastOptions);
            }
        };

        fetchRoomData();

    },[]);

    const handleDeleteRoom = (room: IRoom) => {
        setSelectedRoom(room);
        setOpenConfirmRoomModal(true);
    };

    const handleUpdateRoom = (room: IRoom) => {
        setSelectedRoom(room);
        setOpenUpdateRoomModal(true);
    };

    return (
        <>
            {isLoading ? (
                <div className="loader-lists">
                    <div className="loader-container">
                        <Loader />
                    </div>
                    <p className={"loader-text"}>En attente des salles de chat ...</p>
                </div>
            ): (
            <div className={"user-list__container"}>
                {!roomList || !roomList.length ?
                    (<div>
                        <h2 className="category-text"> Aucune salle de chat en vue... Soyez le premier à en créer une</h2>
                        <Link to="/chat" className="button-container width-50-centered">Créer ma salle</Link>
                    </div>

                    ):
                    (<div className="categories-container">
                            <h2 className="category-text"> Liste des salles de chat: </h2>
                        </div>
                        ) }
                <section className="table-container">
                    <div className="table">
                        {roomList && roomList?.length > 0 && (
                            <div className="table-header">
                                <div>Identifiant</div>
                                <div>Nom de salle</div>
                                <div>Thème</div>
                                <div>Actions</div>
                            </div>)}

                        {roomList && roomList?.map((room) => (
                            <div key={room.id} className="body-row">
                                <div className="table-row__id">
                                    <span className="row__text">Identifiant:&nbsp;</span>
                                    <span>{room.id}</span>
                                </div>
                                <div className="table-row__room-name">
                                    <span className="row__text">{room.name ? `Nom:${String.fromCharCode(160)}`: ""}</span>
                                    <span>{room.name ? room.name : "Salle de chat"}</span>
                                </div>
                                <div className="table-row__theme">{room.description? room.description : "Aucun thème"}</div>
                                <div className={"table-row__actions"}>
                                    <Tooltip content="Supprimer" direction="top">
                                        <IconContext.Provider value={{ color: "#de392a", className: "trash-icon"}}>
                                            <div>
                                                <button title="delete room" type="button" className="btn-reset" onClick={() => handleDeleteRoom(room)}>
                                                    <RiDeleteBin6Line className={"trash-icon"} />
                                                </button>
                                            </div>
                                        </IconContext.Provider>
                                    </Tooltip>
                                    <Tooltip content="Modifier" direction="top">
                                        <IconContext.Provider value={{ color: "blue", className: "update-icon" }}>
                                            <div>
                                                <button title="delete room" type="button" className="btn-reset" onClick={() =>  handleUpdateRoom(room)}>
                                                    <FaUserCog className={"update-icon"} />
                                                </button>
                                            </div>
                                        </IconContext.Provider>
                                    </Tooltip>
                                </div>
                            </div>
                        ))}
                        {openConfirmRoomModal && (
                            <ConfirmRoomModal
                                roomList={roomList}
                                setRoomList={setRoomList}
                                selectedRoom={selectedRoom}
                                setOpenConfirmRoomModal={setOpenConfirmRoomModal}
                                title={"Supprimer une salle"}
                            />
                        )}
                        {(openUpdateRoomModal && selectedRoom) &&
                            (<RoomUpdateModal
                                    roomList={roomList}
                                    setRoomList={setRoomList}
                                    selectedRoom={selectedRoom}
                                    setOpenUpdateRoomModal={setOpenUpdateRoomModal}
                                    title={"Modifier une salle"}
                                />
                            )}
                    </div>
                </section>
            </div>
            )}
        </>
    );
}