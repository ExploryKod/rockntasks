import React from 'react';
import { useNavigate } from 'react-router-dom';
import image_1 from "../../assets/img/activities/sport.jpeg";
import image_2 from "../../assets/img/categories/vegetables.jpeg";


const images = [
    { imageUrl: image_1, category_id: 1 },
    { imageUrl: image_2, category_id: 2 }
]
const CoachingItem = ({ category }) => {
  // We need image url so we pass it through props (here ou directly in parenthesis of the function)
  const { category_name, route, id } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className={`main-category-container card-${id}`} onClick={onNavigateHandler}>
    {images
        .filter((image) => image.category_id === id)
        .map((image) => (
        <div
            key={image.category_id}
            className="background-image"
            style={{ backgroundImage: `url(${image.imageUrl})` }}
        />
    ))}

      <div className="body">
        <h2>{category_name}</h2>
        <p>Decouvrir</p>
      </div>
    </div>
  );
};

export default CoachingItem;
