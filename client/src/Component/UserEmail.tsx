import { UserEmailType } from '../Types/typeUsers';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import {IconContext} from "react-icons";
import Tooltip from "./Tooltip.tsx";

function UserEmail({email, receiver}: UserEmailType) {

    const handleClick = () => {
        const body = encodeURIComponent(`Bonjour ${receiver.replace(/^\w/, c => c.toUpperCase())},\n\n`);
        window.location.href = `mailto:${email}?body=${body}`;
    };

    return (
        <Tooltip content="Envoyer un email" direction="top">
            <IconContext.Provider value={{ size: "20", color: "#28a745", className: "comity-icon"}}>
                <button aria-label="contacter par email" type="button" className="btn-reset" onClick={handleClick}>
                    <MdOutlineAlternateEmail className={"trash-icon"} />
                </button>
            </IconContext.Provider>
        </Tooltip>
    );
}

export default UserEmail;