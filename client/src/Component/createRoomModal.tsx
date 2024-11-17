import { IcreateRoomModal} from "../Types/typeModals";
import {ChangeEvent, useState} from "react";
import {IWordLength} from "../Types/typeRooms";


export const CreateRoomModal = ({roomsList, createRoom, setRoomName, setRoomDescription, setOpenCreateRoomModal}: IcreateRoomModal) => {
    const [wordLength, setwordLength] = useState<IWordLength>({num: 0, max: 0, text: '', endMessage:""});
    const onClose = () => {
        setOpenCreateRoomModal(false);
    }


    const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setwordLength({num: 0, max: 0, text: "", endMessage: ""})
        if (e.target.value.length < 31) {
            setRoomName(e.target.value)
        }
        if (e.target.value.length > 1 && e.target.value.length < 30) {
            setwordLength({num: e.target.value.length, max: 30, text: "Nom, caractères: ", endMessage: ""})
            return
        }
        if (e.target.value.length === 30) {
            setwordLength({num: 30, max: 30, text: "Nom, caractères: ", endMessage: "Maximum atteint"})
            return
        }
    }

    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setwordLength({num: 0, max: 0, text: "", endMessage: ""})
        if (e.target.value.length < 51) {
            setRoomDescription(e.target.value)
        }
        if(e.target.value.length > 1 && e.target.value.length < 50) {
            setwordLength({num: e.target.value.length, max: 50, text: "Thème: ", endMessage: ""})
            return
        }
        if(e.target.value.length === 50) {
            setwordLength({num: 50, max: 50, text: "Thème, caratères: ", endMessage: "Maximum atteint"})
            return
        }
    }

return (
    <div className={`modal` }>
        <div className="modal-content large-auto">

            <div className="modal-header">
                <h2>Créer une salle</h2>
                <span className="close" onClick={onClose}>&times;</span>
            </div>
            <div className="modal-body">
                {roomsList && roomsList.length >= 6 ? (<div>
                    <h2 className="category-title"> Nombre maximum de salles atteint </h2>
                </div>) : (<form className="message-form" method={'post'} onSubmit={createRoom}>
                    <div className="container-20 flex-center-childs-column">
                        <p className={`opacity-transition ${wordLength.num ? "opacity-100" : "opacity-0"} ${wordLength.endMessage != "" ? "text-success" : "text-red"} padding-y-5`}>
                            {wordLength.max && wordLength.endMessage === "" ? wordLength.text+wordLength.num+"/"+wordLength.max : wordLength.endMessage}
                        </p>
                    </div>

                    <input maxLength={30} className="input-log margin-bottom-20" name={'roomName'} type={'text'} placeholder={'Trouvez un nom de salle en un mot'} onChange={handleChangeName}/>
                    <input maxLength={50} className="input-log" name={'description'} type={'text'} placeholder={'Ecrivez un thème de la salle'} onChange={handleChangeDescription}/>
                    <button className="button-container room-button" type={'submit'}>Créer une salle</button>
                </form>) }
            </div>
                <div className="modal-footer">
                    <button className={"footer__button-cancel"} type={"button"} onClick={onClose}>Annuler</button>
                </div>
        </div>
    </div>
);
}