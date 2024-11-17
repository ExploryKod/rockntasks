import { Outlet } from 'react-router-dom';

import CategoriesContainer from "../components/categories-container";
const Food = () => {

  return (
    <div className="home">
    <CategoriesContainer/>
    <Outlet/>
    </div>
  );
};

export default Food;
