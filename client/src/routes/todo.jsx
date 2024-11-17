import { Outlet } from 'react-router-dom';

import ActivitiesContainer from "../components/todo/activities-container";
const Todo = () => {

  return (
    <div className="home">
    <ActivitiesContainer/>
    <Outlet/>
    </div>
  );
};

export default Todo;
