import { Routes, Route } from 'react-router-dom';
import ChatRoomsPreview  from './ChatRoomsPreview.tsx';
import ChatRoom from './ChatRoom';

const ChatBoard = () => {

  return (
      <Routes>
          <Route index element={<ChatRoomsPreview />} />
          <Route path=':roomNumber' element={<ChatRoom/>} />
      </Routes>
  );
};

export default ChatBoard;


