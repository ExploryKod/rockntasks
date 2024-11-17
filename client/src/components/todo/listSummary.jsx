import {useContext} from "react";
import {ListContext} from "../context/list.context";
import { IconContext } from "react-icons";
import { RiDeleteBin6Line }from "react-icons/ri";
import { Tooltip } from "../components/tooltip.jsx";

const ListSummary = ({key, listItem}) => {

    const { id, task_name, task_image_url, task_status, quantity } = listItem;
    const {  removeItemFromList } = useContext(ListContext);

    const removeTaskFromList = () => removeItemFromList(listItem);

    const imageUrl = task_image_url ? `${process.env.REACT_APP_API_URL}/uploads/${task_image_url}.jpeg` : "../assets/img/products/generic_food.jpg";
  
    return (
        <div className="body-row">
            <div className="table-row__image">
               <img src={imageUrl} alt={task_name} />
            </div>
            <div className="table-row__item-name">
                <span>{id} - {task_name ? task_name : "Pas de nom"}</span>
            </div>
            <div className="table-row__quantity">{quantity}</div>
            <div className="table-row__price">{task_status}</div>
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