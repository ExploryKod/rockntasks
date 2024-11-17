import { Outlet } from 'react-router-dom';
import HomeContainers from '../components/home/homeContainers';

const Food = () => {

  return (
    <div className="home">
    <HomeContainers/>
    <Outlet/>
    </div>
  );
};

export default Food;
