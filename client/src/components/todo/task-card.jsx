import {useContext, useEffect, useState} from 'react';
import Button from '../button';
import { removeAccent } from '../../utils/dataValidation/stringValidation.utils';
import { ListContext } from '../../context/list.context';
import image_7 from "../../assets/img/categories/recipes.jpg";

export const TaskCard = ({ task, selected_activity_id }) => {
    const { task_activity_id, task_activity, task_name, task_image_url, task_deadline } = task;
    const { addItemToList } = useContext(ListContext);
    const addTaskToList = () => addItemToList(task);
    const [imageUrl, setImageUrl] = useState(`../assets/img/products/${task_image_url}.jpeg`)


    const date = new Date(task_deadline);

    const options = {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
    };

    const formattedDeadline = new Intl.DateTimeFormat('fr-FR', options).format(date);

    // Format output: "21 nov. à 8:00"
    const deadline = `${formattedDeadline.replace(',', ' à')}`;
    
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_API_URL}/uploads/${task_image_url}.jpeg`,
            {method: 'HEAD'})
            .then(res => {
                if (res.ok) {
                    setImageUrl(`${process.env.REACT_APP_API_URL}/uploads/${task_image_url}.jpeg`);
                } else {
                    setImageUrl(`${image_7}`);
                }
            })
            .catch(err => console.error('Error:', err))
    },[task_activity])

    console.log(task_activity_id)
    console.log("task activity in card compo ", task_activity)
    console.log("task name in card  ", task_name)
    return (
        <>
            {selected_activity_id === task_activity_id &&
                (<div className={`task-card-container card-${task_name}`}>
   
                <div className='footer'>
                    <span className='task-name'>{task_name}</span>
                    <span className='task-date'>{deadline}</span>
                </div>
                <img className="task-card-container__task-img" src={imageUrl} alt={`${removeAccent(task_name)}`} />
                <Button onClick={addTaskToList }>Ajouter</Button>
        </div>)}
        </>
    );

}

export default TaskCard;
