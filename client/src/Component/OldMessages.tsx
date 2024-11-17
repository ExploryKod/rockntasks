import {IMessageHistory} from "../Types/typeChat";
import {BiSolidUserVoice} from "react-icons/bi";

export const OldMessages = ({messages, savedMessages, setOpenHistory } : IMessageHistory) => {

    const onClose = () => {
        setOpenHistory(false)
    }

    return (
        <div className={"modal"}>
            <div className={"modal-content large-auto"}>
                <div className="modal-header">
                    <span className="close" onClick={onClose}>&times;</span>
                </div>
                <div className="modal-body no-padding-y">
                    <div className={`card ${savedMessages.messages ? "chat-active" : "make-none"}`}>
                        <h1>Mon historique</h1>
                        {(messages.length && messages.length > 0 && savedMessages.messages) &&
                            Array.from({ length: Math.ceil(messages.length / 10) }, (_, i) => (
                                <details className={`${i % 2 === 0 ? "warning" : "alert"}`} key={i}>
                                    <summary>Anciens messages {i * 10 + 1} - {Math.min((i + 1) * 10, messages.length)}</summary>
                                    {messages.slice(i * 10, (i + 1) * 10)
                                        .filter(message => message.sendername != undefined || message.username != undefined)
                                        .map((message, index) => (
                                            <div key={index} className={`logs-container__log`} >
                                                <div className="log__info bgd-darkBlue padding-10">
                                                    <span className="info__user text-white">{message.username+ " : "}</span>
                                                </div>
                                                <div className="log__message bgd-darkLavender padding-10"><BiSolidUserVoice className="voice-icon"/>&nbsp;
                                                    {/*<span className="message__content">{message}</span>*/}
                                                </div>
                                            </div>
                                        ))}
                                </details>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}