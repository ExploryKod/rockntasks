import {Routes, Route} from "react-router-dom";
import Home from "./routes/home";
import Todo from "./routes/todo";
import Shop from "./routes/shop";
import Board from "./routes/board";
import Checkout from "./routes/checkout";
import TaskList from "./routes/taskList.jsx";

import Shopping from "./routes/shopping";
import NotFoundPage from './routes/notFoundPage';
import StripePayment from "./routes/StripePayment";
import PaymentSuccess from "./routes/PaymentSuccess";
import Commitment from "./routes/commitment";

import NeedAuth from "./Auth/NeedAuth.tsx";
import Connexion from "./Auth/Connexion.tsx";
import Navigation from "./routes/navigation.jsx";
import {Credits} from "./Pages/Credits.tsx";

function App() {

    return (
      <Routes>
          <Route path='/' element={<Navigation/>}>
              <Route index element={<NeedAuth><Home /></NeedAuth>}/>
              <Route index element={<Home />} />
              <Route path='todo' element={<Todo />} />
              <Route path='shop/*' element={<NeedAuth><Shop /></NeedAuth>} />
              <Route path='todo/board/*' element={<NeedAuth><Board /></NeedAuth>} />
              <Route path='checkout' element={<NeedAuth><Checkout /></NeedAuth>} />
              <Route path='task-list' element={<NeedAuth><TaskList /></NeedAuth>} />
              <Route path='shopping' element={<NeedAuth><Shopping /></NeedAuth>} />
              <Route path="payment" element={<NeedAuth><StripePayment /></NeedAuth>} />
              <Route path="success" element={<NeedAuth><PaymentSuccess /></NeedAuth>} />
              <Route path="commitment" element={<NeedAuth><Commitment /></NeedAuth>} />
              <Route path='*' element={<NotFoundPage category={""} />}  />
          </Route>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/connexion' element={<Connexion/>}/>
      </Routes>
    );
}

export default App;

