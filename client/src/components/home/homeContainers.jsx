import CoachingItem from "./coachingItem";

const COACHINGS = [

    { id: 1, category_name: "Mes habitudes", route: 'todo' },

    { id: 2, category_name: "Mon alimentation", route: 'shop' },
  ];


const HomeContainers = () => {
  
    return (
        <>
        {COACHINGS.length > 0 ?
                (<div className="categories-container">
            {COACHINGS.map( ( item ) => (
                <CoachingItem key={item.id} category={item} /> ))}
        </div>): (<div className="categories-container__no-category"> 
                <h1 className="no-category__title">Pas d'activité de coaching pour l'instant </h1>
                <div className="no-category__icon-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-cooking-pot"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
                </div>
            </div>)}
        </>
    )
}

export default HomeContainers;