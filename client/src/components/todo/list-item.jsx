import { useContext } from "react";
import { ListContext } from "../../context/list.context";

export const ListItem = ({listItem}) => {
    const { task_name, task_status, quantity } = listItem;
    const {  removeItemFromList } = useContext(ListContext);
    const removeTaskFromList = () => removeItemFromList(listItem);

    return(
         <div className='checkout-item-container row'>
            <span className='cell name'> {task_name} </span>
            <span className='cell quantity'> {quantity}</span>
            <span className='cell status'>{task_status}</span>
            <div onClick={removeTaskFromList} className='remove-button'>&#10005;</div>
         </div>
    )
}

export default ListItem;