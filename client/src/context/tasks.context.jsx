import { createContext, useState, useEffect } from "react";

export const TasksContext = createContext({
    tasksData: {},
});

const TASKS = [
    {
      id: "1",
      activity_id: "1",
      task_activity: "travail",
      task_name: "",
      product_image_url: "",
      task_status: "Pending",
      task_deadline: ""
    },
    {
      id: "2",
      activity_id: "1",
      task_activity: "travail",
      task_name: "",
      product_image_url: "",
      task_status: "Pending",
      task_deadline: ""
    },
    {
      id: "3",
      activity_id: "1",
      task_activity: "travail",
      task_name: "",
      product_image_url: "",
      task_status: "Pending",
      task_deadline: ""
    },
    {
      id: "4",
      activity_id: "1",
      task_activity: "travail",
      task_name: "",
      product_image_url: "",
      task_status: "Pending",
      task_deadline: ""
    },
    {
      id: "5",
      activity_id: "3",
      task_activity: "voyage",
      task_name: "",
      product_image_url: "",
      task_status: "Pending",
      task_deadline: ""
    }
  ]

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState(TASKS);
    const [activities, setActivities] = useState([]);
    const [loading, setIsLoading] = useState(false);
   
    useEffect(() => {
        setIsLoading(true);
        const fetchTasks = async () => {

                
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {mode: 'cors'});
                const data = await response.json();
               
                setTasks(data.length > 0 ? data : TASKS);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
              setIsLoading(false)
            }

        };

        fetchTasks()
    }, [])

    useEffect(() => {
      setIsLoading(true);
        const fetchActivities = async () => {


            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/activity`);
                const data = await response.json();
                console.log(data)
                setActivities(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
              setIsLoading(false)
            }

        };

        fetchActivities()
    }, [])
    
    const data_tasks = { tasks, activities, loading };

    console.log("data_tasks", data_tasks);

    return (
        <TasksContext.Provider value={data_tasks}> {children}</TasksContext.Provider>
    )
}
