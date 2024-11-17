import { useContext } from "react";
import { ListContext } from "../../context/list.context";

export const ListItem = ({listItem}) => {
    const { task_name, task_deadline, quantity } = listItem;
    const {  removeItemFromList } = useContext(ListContext);
    const removeTaskFromList = () => removeItemFromList(listItem);

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

    return(
         <div className='checkout-item-container row'>
            <span className='cell name'> {task_name} </span>
            <span className='cell quantity'> {quantity}</span>
            <span className='cell status'>{deadline}</span>
            <div onClick={removeTaskFromList} className='remove-button'>&#10005;</div>
         </div>
    )
}

export default ListItem;