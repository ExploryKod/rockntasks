import {useState} from 'react';
import config from "../config/config.tsx";
import {Link} from 'react-router-dom';
import type {IRoom} from "../Types/typeRooms.d.ts";
import {useLoggedStore} from "../StateManager/userStore.ts";
import {useRoomStore} from "../StateManager/roomStore.ts";
import {useEffect} from "react";
import {Loader} from "./Loader.tsx";

export const ChatRoomCard = ({id, name, description}: IRoom) => {
    const serverHost: string = config.serverHost;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const imageUrl = "/images_food/boisson_chicoree.jpg";
    const {token} = useLoggedStore();
    const {setRoomName, setRoomId, setRoomDescription} = useRoomStore();
    // const [image, setImage] = useState<string>("");

    useEffect(() => {
        setRoomName(name);
        setRoomId(id);
        setRoomDescription(description);
        // setImage(`https://source.unsplash.com/200x200/?${name.split(' ')[0]}`);
        setIsLoading(false);
    }, []);

    const handleClick = async () => {
        try {
            const response = await fetch(`${serverHost}/chat/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'same-origin'
            });

            if (response.ok) {
                setIsLoading(false);
            } else {
                console.error('échec de la réponse chatroom');
                setIsLoading(false);
            }

        } catch (error) {
            console.error('log failed:', error);
            setIsLoading(false);
        }
    };

    const queryChat: string = `?id=${id.toString()}&name=${name}&description=${description}`

    return (
        isLoading ? (<div className="loader-lists"><div className='loader-container'><Loader/></div></div>) :
            (<div className={`rooms-card bgd-white margin-y-20 max-width-600 border-radius-10`}>
                <div className="rooms-card__img">
                    <img src={imageUrl} alt={`${name}`}/>
                </div>
                <div className='rooms-card__desc'>
                    <div className='card-desc__title'>
                        <h2>{name && name.length > 0 && `${name.toLowerCase()}`}</h2>
                    </div>
                    <div className='card-desc__text'>
                        <p>{description && description.length > 0 && `${description}`}</p>
                    </div>
                    <div className='card-desc__btn'>
                        <Link onClick={handleClick} className='btn-mini'
                              to={{
                                  pathname: `${id.toString()}`,
                                  search: queryChat
                              }}>
                          Rejoindre
                        </Link>
                    </div>
                </div>

            </div>)
    );

}

export default ChatRoomCard;