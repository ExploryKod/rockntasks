import { Link } from 'react-router-dom';
import { TaskCard } from './task-card';
import { removeAccent } from '../../utils/dataValidation/stringValidation.utils';
import {useEffect, useState} from "react";

const TASKS = [
    {
      id: "1",
      category_id: "1",
      task_activity: "sport",
      task_name: "Poulet Bio",
      task_image_url: "proteines_poulet_bio.jpeg",
      task_price: "25.00"
    },
    {
      id: "2",
      category_id: "1",
      task_activity: "travail",
      task_name: "Tofu",
      task_image_url: "proteines_tofu",
      task_price: "18.00"
    },
    {
      id: "3",
      category_id: "1",
      task_activity: "sport",
      task_name: "Poisson",
      task_image_url: "proteines_poisson",
      task_price: "35.00"
    },
    {
      id: "4",
      category_id: "1",
      task_activity: "famille",
      task_name: "Edamam",
      task_image_url: "proteines_edamam",
      task_price: "25.00"
    },
    {
      id: "5",
      category_id: "1",
      task_activity: "famille",
      task_name: "Lentilles",
      task_image_url: "proteines_lentilles",
      task_price: "18.00"
    },
    {
      id: "6",
      category_id: "1",
      task_activity: "sport",
      task_name: "Pois Chiches",
      task_image_url: "proteines_pois_chiches",
      task_price: "14.00"
    },
    {
      id: "7",
      category_id: "1",
      task_activity: "travail",
      task_name: "Viande rouge",
      task_image_url: "proteines_viande_rouge",
      task_price: "18.00"
    },
    {
      id: "8",
      category_id: "1",
      task_activity: "relations",
      task_name: "Sardine",
      task_image_url: "proteines_sardine",
      task_price: "14.00"
    },
    {
      id: "9",
      category_id: "1",
      task_activity: "sante",
      task_name: "Green Beans",
      task_image_url: "proteines_green_beans",
      task_price: "16.00"
    },
    {
      id: "10",
      category_id: "2",
      task_activity: "travail",
      task_name: "chou fleur",
      task_image_url: "legumes_chou_fleur",
      task_price: "8.00"
    },
    {
      id: "11",
      category_id: "2",
      task_activity: "sport",
      task_name: "Poivron",
      task_image_url: "legumes_poivron",
      task_price: "3.00"
    },
    {
      id: "12",
      category_id: "2",
      task_activity: "legumes",
      task_name: "Tomate",
      task_image_url: "legumes_tomate",
      task_price: "4.00"
    },
    {
      id: "13",
      category_id: "2",
      task_activity: "famille",
      task_name: "Brocoli",
      task_image_url: "legumes_brocoli",
      task_price: "5.00"
    },
    {
      id: "14",
      category_id: "2",
      task_activity: "famille",
      task_name: "Carotte",
      task_image_url: "legumes_carotte",
      task_price: "2.00"
    },
    {
      id: "15",
      category_id: "3",
      task_activity: "sport",
      task_name: "Banane",
      task_image_url: "fruits_banane",
      task_price: "1.00"
    },
    {
      id: "16",
      category_id: "3",
      task_activity: "fruits",
      task_name: "Pomme",
      task_image_url: "fruits_pomme",
      task_price: "2.00"
    },
    {
      id: "17",
      category_id: "3",
      task_activity: "fruits",
      task_name: "Orange",
      task_image_url: "fruits_orange",
      task_price: "1.00"
    },
    {
      id: "18",
      category_id: "3",
      task_activity: "sport",
      task_name: "Fraise",
      task_image_url: "fruits_fraise",
      task_status: "3.00"
    },
    {
      id: "19",
      category_id: "3",
      task_activity: "sport",
      task_name: "Mangue",
      task_image_url: "fruits_mangue",
      task_price: "5.00"
    },
    {
      id: "20",
      category_id: "3",
      task_activity: "sport",
      task_name: "Apple",
      task_image_url: "proteines_apple",
      task_price: "8.00"
    }
  ]


export const ActivityPreview = ({ title, selected_activity_id, activity }) => {
   const [ tasks, setTasks ] = useState([])
   const [ isLoading, setIsLoading] = useState(false)

   console.log("tasks", tasks)

    useEffect(() => {
        setIsLoading(true)
        const fetchTasksByActivity = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${activity}`);
                if (response.ok) {
                    const data = await response.json();
                    setTasks(data)
                } else {
                    console.error('Error fetching task by activity:', response.status);
                    setTasks([])
                }
            } catch (error) {
                console.error('Error fetching task by activity:', error);
                setTasks([])
            }  finally {
              setIsLoading(false); 
          }
        };

       fetchTasksByActivity();
    }, [activity]);

    if(isLoading) {
        return (<div className="category-preview-container__no-category">
           <h1 className="no-category__title">Chargement des tâches... </h1>
           <div className="no-category__icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
            </div>
           </div>)
    }

    if(TASKS.length <= 0 || tasks.length <= 0) { 
        return (<div className="category-preview-container__no-category"> 
            <h1 className="no-category__title">Aucune série de tâches pour le moment </h1>
            <div className="no-category__icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
            </div>
        </div>)
    }

  console.log("preview compo - tasks : ", tasks)
    return(
        <>
        {tasks.length ?
        (<div className="category-preview-container">
        
                <h2>
                <Link  className='title' to={`/todo/board/${selected_activity_id}`}>
                    {title?.toUpperCase()}
                </Link>
                </h2>
                <div className='preview shop'>
                    {tasks.slice(0, 4).map( ( task ) => (
                        <TaskCard key={task.id} selected_activity_id={selected_activity_id} task={task} />
                    ))}
                </div>
        </div>) :      (<div className="category-preview-container__no-category"> 
            <h1 className="no-category__title">Aucune tâche pour le moment </h1>
            <div className="no-category__icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
            </div>
        </div>)}
        </>
    )
}

export default ActivityPreview;