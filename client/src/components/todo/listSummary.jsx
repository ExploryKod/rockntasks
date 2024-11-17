import {useContext} from "react";
import {ListContext} from "../../context/list.context";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line }from "react-icons/ri";
import { Tooltip } from "../tooltip.jsx";

const ListSummary = ({key, listItem}) => {
    console.log("list item in summary >> ", listItem);
    const { task_name, task_image_url, task_deadline, quantity } = listItem;
    const {  removeItemFromList } = useContext(ListContext);
  
    const removeTaskFromList = () => removeItemFromList(listItem);

    const imageUrl = task_image_url ? `${process.env.REACT_APP_API_URL}/uploads/${task_image_url}.jpeg` : "../assets/img/products/generic_food.jpg";
  

    const date = new Date(task_deadline);

    const options = {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
    };

    const formattedDeadline = new Intl.DateTimeFormat('fr-FR', options).format(date);
    const deadline = `${formattedDeadline.replace(',', ' à')}`;

    return (
        <div className="body-row">
            <div className="table-row__image">
               <img src={imageUrl} alt={task_name} />
            </div>
            <div className="table-row__item-name">
                <span>{task_name ? task_name : "Pas de nom"}</span>
            </div>
            <div className="table-row__quantity">{quantity}</div>
            <div className="table-row__price">{deadline}</div>
            <div className={"table-row__actions"}>
                <Tooltip content="Supprimer" direction="top">
                    <IconContext.Provider value={{ color: "#de392a", className: "trash-icon"}}>
                        <div>
                            <button title="delete room" type="button" className="btn-reset"  onClick={removeTaskFromList}>
                                <RiDeleteBin6Line className={"trash-icon"} />
                            </button>
                        </div>
                    </IconContext.Provider>
                </Tooltip>
            </div>
        </div>
    );

}

export default ListSummary;