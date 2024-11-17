import { Outlet } from 'react-router-dom';
import HomeContainers from '../components/home/homeContainers';

const Food = () => {

  return (
    <div className="home">
     <div className="categories-container">
        <h1 className="category-title">Bienvenue sur Foodcare, votre site de coaching de vie et alimentaire !</h1>
        <p  className="category-text">Ce site est un site-relai entre foodcare et vous même. Votre coach a choisi pour vous une palette de tâches et des aliments sains. 
            Commandez certains aliments et engagez-vous sur certaines tâches.
            Vous pouvez en outre acheter directement des aliments à notre boutique si cela facilite vos engagements. 
            Ils seront disponible pour vous dans l'une de nos 260 boutiques en Europe.
            Une fois vos commandes et engagements passé, votre coach vous contacte pour la suite des évènements.
            </p>     
    </div>
    <HomeContainers/>
    <Outlet/>
    </div>
  );
};

export default Food;
