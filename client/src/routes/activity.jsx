import { useContext } from 'react';
import {Link, useParams} from 'react-router-dom';
import { TasksContext } from '../context/tasks.context';
import { TaskCard } from '../components/todo/task-card';


export const Activity = () => {

    let { task_id } = useParams();
    const { activities, tasks, loading }= useContext(TasksContext);
 
    //const { tasks, activities, loading } = useContext(TasksContext);
    console.log(task_id)
    console.log('activity data from context ', activities)
    console.log('product data from context ', tasks)

    if(loading) {
        return (
            <div className='category-container product-container'>
                    <div style={{ minWidth:'300px', minHeight:'200px', padding:'30px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius:'10px', color: '#000', backgroundColor:'transparent', position:'absolute', top:'100px', right:'50%', transform: 'translateX(50%)'}}>
                        <h2 className="category-text"> Tâches en cours de changement ... </h2>
                        <span className="mb-2 category-text"> 
                            Le saviez-vous ? 
                        </span>
                        <p className='mb-4 category-text'>Au Cameroun mais aussi dans d'autres pays, il existe des "sac marmites" en tissu fait pour accueillir des marmites 
                            bouillantes et permette de finir la cuisson des aliments. 
                            En plus d'économiser de l'électricité, cela permet aussi de mieux préserver certains nutriments.</p>
                        <Link className="button-container" to={'todo/board'}>Revenir au board</Link>
                    </div>
                </div>
        )
    }

    
    console.log("TASK ID in activity route", task_id)
    console.log("TASKS in activity route", tasks)
    
    return(
        <>
        {activities?.length > 0 ?
                (
            <>
            {activities.filter((activity) => parseInt(activity.id) === parseInt(task_id))
                .map((activity) => (
                <div  className="category-title-container" key={activity.id} >
                    <h2 className='category-title'>{activity.activity_name.toUpperCase()}</h2>
                </div>
            ))}
            {tasks && tasks.length > 0 ?
                    (<div className='products-container'>
                {tasks.filter(task => task.task_activity_id === parseInt(task_id)).map((task) =>
                    (<TaskCard key={task.id} task={task} selected_activity_id={task.task_activity_id} />))}
            </div>): ( <div className='category-container product-container'>
                    <div style={{ minHeight:'200px', padding:'30px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius:'10px', color: '#fff', backgroundColor:'#00AD9C', position:'absolute', top:'100px', right:'50%', transform: 'translateX(50%)'}}>
                        <h2 className="category-text"> Il n'y a pas de tâche dans cette activité </h2>
                        <Link className="els-text-link button-container" to={'/todo/board'}>Revenir au board</Link>
                    </div>
                </div>)}
            </>
            ) : (
                <div className='category-container category-container--empty product-container'>
                    <div style={{ minHeight:'200px', padding:'30px', display:'flex', flexDirection:'column', justifyContent:'space-between', borderRadius:'10px', color: '#fff', backgroundColor:'#00AD9C', position:'absolute', top:'100px', right:'50%', transform: 'translateX(50%)'}}>
                        <h2 className="title"> Cette activité est indisponible </h2>
                        <Link className="els-text-link button-container" to={'/todo/board'}>Revenir au board</Link>
                    </div>
                </div>
            )}
        </>)
    
}