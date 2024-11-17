import React from 'react';
import { useNavigate } from 'react-router-dom';
import image_1 from "../../assets/img/activities/sport.jpg";
import image_2 from "../../assets/img/activities/travail.jpg";
import image_3 from "../../assets/img/activities/relations.jpg";
import image_4 from "../../assets/img/activities/famille.jpg";
import image_5 from "../../assets/img/activities/voyage.jpg";
import image_6 from "../../assets/img/activities/business.jpg";
import image_7 from "../../assets/img/activities/autres.jpg";

//Photo de fauxels: https://www.pexels.com/fr-fr/photo/photo-de-personnes-faisant-des-poignees-de-main-3184416/
// Photo de Pixabay: https://www.pexels.com/fr-fr/photo/groupe-de-joueur-de-sport-a-genoux-sur-terrain-262524/
// Photo de Chevanon Photography: https://www.pexels.com/fr-fr/photo/low-angle-view-of-woman-relaxing-on-beach-contre-le-ciel-bleu-317157/
// Photo de Emily Ranquist: https://www.pexels.com/fr-fr/photo/photographie-de-personnes-diplomees-1205651/
// Photo de Agung Pandit Wiguna: https://www.pexels.com/fr-fr/photo/homme-debout-a-cote-de-sa-femme-enseignant-a-leur-enfant-comment-faire-du-velo-1128318/
// Photo de Ylanite Koppens: https://www.pexels.com/fr-fr/photo/trois-pots-en-ceramique-blanche-avec-des-plantes-a-feuilles-vertes-pres-de-cahier-ouvert-avec-stylo-clic-sur-le-dessus-796602/
// Photo de Vlada Karpovich: https://www.pexels.com/fr-fr/photo/femme-creatif-smartphone-ordinateur-portable-4050302/
// Photo de Marina Leonova: https://www.pexels.com/fr-fr/photo/main-rock-rocher-caillou-7634707/
// Photo de Helena Lopes: https://www.pexels.com/fr-fr/photo/chemise-habillee-homme-boutonnee-blanche-708440/
const images = [
    { imageUrl: image_1, activity_id: 1 },
    { imageUrl: image_2, activity_id: 2 },
    { imageUrl: image_3, activity_id: 3 },
    { imageUrl: image_4, activity_id: 4 },
    { imageUrl: image_5, activity_id: 5 },
    { imageUrl: image_6, activity_id: 6 },
    { imageUrl: image_7, activity_id: 7 },
]
const ActivityItem = ({ activity }) => {
  // We need image url so we pass it through props (here ou directly in parenthesis of the function)
  const { activity_name, route, id } = activity;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className={`main-category-container card-${id}`} onClick={onNavigateHandler}>
    {images
        .filter((image) => image.activity_id === id)
        .map((image) => (
        <div
            key={image.activity_id}
            className="background-image"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
        />
    ))}

      <div className="body">
        <h2>{activity_name}</h2>
        <p>Explorer</p>
      </div>
    </div>
  );
};

export default ActivityItem;
