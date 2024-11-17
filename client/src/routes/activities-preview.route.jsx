import { useState, useEffect } from 'react';
import { ActivityPreview } from '../components/todo/activity-preview.component';

  const ACTIVITIES = [

    { id: 1, activity_name: "sport", route: 'board/1' },

    { id: 2, activity_name: "travail", route: 'board/2' },

    { id: 3, activity_name: "relations", route:'board/3' },

    { id: 4, activity_name: "famille", route:'board/4' },

    { id: 5, activity_name: "voyages", route: 'board/5' },

    { id: 6, activity_name: "business", route: 'board/6' },

    { id: 7, activity_name: "detente", route: 'board/7' },
  ];

export const ActivitiesPreview = () => {
    const [activities, setActivities] = useState(ACTIVITIES);


    console.log("activities", activities)
  
    useEffect(() => {
        const fetchAllActivities = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/activity`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data)
                } else {
                    console.error('Error fetching activities:', response.status);
                    setActivities(ACTIVITIES);
                }
            } catch (error) {
                console.error('Error fetching activities:', error);
                setActivities(ACTIVITIES);
            }
        };

       fetchAllActivities();
    }, []);
    
  console.log("real activities", activities);

    return (  
        <section>
            {activities.length ?
            (<div className="category-food-wrapper">
            {activities.map((activity) =>{
                return (
                    <ActivityPreview  
                    key={activity.id}
                    title={activity.activity_name}
                    selected_activity_id={activity.id}
                    activity={activity.activity_name} />
                )
            })}
            </div>): null}    
        </section>
    ) 
        
};
