import {FormEvent, useEffect, useState} from 'react';
import ChatRoomCard from '../Component/ChatRoomCard.tsx';
import {useLoggedStore} from "../StateManager/userStore.ts";
import useGetRoomsList from '../Hook/useGetRoomsList.tsx';
import useFlashMessage from "../Hook/useFlashMessage.tsx";
import type { IRoom }  from "../Types/typeRooms.d.ts";
import config from "../config/config.tsx";
import {Loader} from "../Component/Loader.tsx";
import {CreateRoomModal} from "../Component/createRoomModal.tsx";

const ChatRoomsPreview = () => {
    // Hosts
    const serverHost: string = config.serverHost;

    // Hooks
    const {token} = useLoggedStore();
    const getRoomsList = useGetRoomsList();
    const { toastMessage, createDefaultToastOptions, setFlashMessage, flashMessage, opacityMessage} = useFlashMessage('');

    // UseStates
    const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);
    const [roomsList, setRoomsList] = useState<IRoom[]>([]);
    const [roomName, setRoomName] = useState<string>('');
    const [description, setRoomDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const toastOptionsError = createDefaultToastOptions({type: 'error', position: 'top-center', autoClose: 3000});
    const toastOptionsSuccess = createDefaultToastOptions({type: 'success', position: 'top-center', autoClose: 3000});

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getRoomsList();

          setRoomsList(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Erreur dans la requête des listes de salles: ", error);
          toastMessage('Erreur dans la requête des listes de salles', toastOptionsError);
        }
      };

      fetchData();

    },[]);

    useEffect(() => {
        if(roomsList && roomsList.length >= 6) {
            setFlashMessage({alert: 'Nombre maximal de salle atteinte', name: 'alert'});
        }

    }, [roomsList]);


    const createRoom = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (roomName !== '' && description !== '') {
            try {
                const response = await fetch(`${serverHost}/chat/create`, {
                    method: 'POST',
                    body: new URLSearchParams({
                        'roomName': roomName,
                        'description': description,
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'same-origin'
                });

                if (response.ok) {
                    const data = await response.json();
                    if(data.id && data.name && data.description) {
                        const newRoom ={id: data.id, name: data.name, description: data.description} as IRoom;
                        setRoomsList([...roomsList, newRoom]);
                        setIsLoading(false);
                        toastMessage(`${data.name} a bien été créé`, toastOptionsSuccess);
                    } else {
                        setIsLoading(false);
                        toastMessage('échec de votre requête: élèments manquants', toastOptionsError);
                    }
                } else {
                    setIsLoading(false);
                    toastMessage('échec dans la création de la salle', toastOptionsError);
                }

            } catch (error) {
                setIsLoading(false);
                console.error('log failed:', error);
                toastMessage('échec dans la création de la salle', toastOptionsError);
            }
        }else{
            setIsLoading(false);
            setFlashMessage({alert: 'Veuillez donner un nom et une description à votre salle', name: 'alert'});
        }
    };

    return (
        <main className={"main-container main-container__rooms padding-x-50"} >
            {isLoading ? (
                <div className="loader-lists">
                    <div className="loader-container">
                        <Loader />
                    </div>
                    <p className={"loader-text"}>Données en attente ...</p>
                </div>
                ): (<div>
                <div className="category-text padding-20">
                    <h1 className="text-center text-darkBlue">Salles de discussion</h1>
                </div>
        {flashMessage.alert !== "" && <div className={`${opacityMessage} output-message text-lightLavender bgd-darkBlue padding-5 border-radius-5`}>{flashMessage.alert}</div>}
                {(roomsList && roomsList.length < 6) &&
                <div className="padding-y-50 create-room-container">
                    <button className="btn-mini" onClick={() => setOpenCreateRoomModal(true)}>Créer une salle</button>
                </div>}


            <div className={"overflow-auto rooms-container custom-scrollbar-container vh-height-75 padding-20 border-radius-10"} >
                {roomsList?.map((item: IRoom, index: number) => (
                    <ChatRoomCard key={index} name={item.name} id={item.id} description={item.description}/>))}
            </div>

    </div>)}
            {openCreateRoomModal && (
                <CreateRoomModal
                    createRoom={createRoom}
                    setRoomDescription={setRoomDescription}
                    setRoomName={setRoomName}
                    roomsList={roomsList}
                    setRoomsList={setRoomsList}
                    setOpenCreateRoomModal={setOpenCreateRoomModal}
                />
            )}
        </main>
    );
};

export default ChatRoomsPreview;