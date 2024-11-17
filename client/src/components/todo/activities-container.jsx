import ActivityItem from "./activity-item";

const ACTIVITIES = [

    { id: 1, activity_name: "sport", route: 'board/1' },

    { id: 2, activity_name: "travail", route: 'board/2' },

    { id: 3, activity_name: "relations", route:'board/3' },

    { id: 4, activity_name: "famille", route:'board/4' },

    { id: 5, activity_name: "voyages", route: 'board/5' },

    { id: 6, activity_name: "business", route: 'board/6' },

    { id: 7, activity_name: "Autres", route: 'board/7' },
  ];

const CategoriesContainer = () => {
  
    return (
        <>
        {ACTIVITIES.length > 0 ?
                (<div className="categories-container">
            {ACTIVITIES.map( ( item ) => (
                <ActivityItem key={item.id} activity={item} /> ))}
        </div>): (<div className="categories-container__no-category"> 
                <h1 className="no-category__title">Aucune activité disponible pour le moment </h1>
                <div className="no-category__icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
                </div>
            </div>)}
        </>
    )
}

export default CategoriesContainer;