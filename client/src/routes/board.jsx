import { Routes, Route } from 'react-router-dom';
import { ActivitiesPreview }  from './activities-preview.route';
import { Activity } from './activity'

const Board = () => {

    return (
        <Routes>
            <Route index element={<ActivitiesPreview/>} />
            <Route path=':task_id' element={<Activity/>} />
        </Routes>
    );
};

export default Board;
