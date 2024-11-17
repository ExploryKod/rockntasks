import { Fragment } from 'react';
import { useLoggedStore } from '../StateManager/userStore.ts';
import useFlashMessage from '../Hook/useFlashMessage.tsx';
import { LogOut } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import CartIcon from '../components/cart-icon'
import TaskIcon from '../components/todo/task-icon'
import { CartContext } from '../context/cart.context';
import { ListContext } from '../context/list.context';
import logo from '../assets/img/logo.png';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Button from '../components/button';
import CartItem from '../components/cart-item'
import ListItem from '../components/todo/list-item'
import { useNavigate } from 'react-router-dom';

const Navigation = () => {

    const { toastMessage, createDefaultToastOptions } = useFlashMessage('');
    const { removeToken, removeUsername, removeAdminStatus } = useLoggedStore();
    const toastOptionsSuccess = createDefaultToastOptions({type: 'success', position: 'top-center', autoClose: 3000});

    const handleLogout = () => {
        removeToken();
        removeUsername();
        removeAdminStatus();
        toastMessage('Vous êtes bien déconnecté', toastOptionsSuccess);
        // Redirect to the login page or any other desired page after logout
        navigate('/');
    };

    const { cartItems } = useContext(CartContext);
    const { listItems } = useContext(ListContext);
    const [total, setTotal] = useState(0);
    const [totalQuality, setTotalQuality] = useState({points: 0, color: ''});
    const [openCart, setOpenCart] = useState(false);
    const [openList, setOpenList] = useState(false);

    const onOpenCartModal = () => setOpenCart(true);
    const onCloseCartModal = () => setOpenCart(false);
    const onOpenListModal = () => setOpenList(true);
    const onCloseListModal = () => setOpenList(false);

    const navigate = useNavigate();
    const goToCheckoutPage = () => {
        navigate('/checkout')
        setOpenCart(false);
    };

    const goToTaskPage = () => {
        navigate('/task-list')
        setOpenList(false);
    };

    useContext(CartContext);
    useContext(ListContext);

    function sumArray(arr) {
        var total = arr.reduce(function(acc, curr) {
          return acc + curr;
        }, 0);
        return total;
      }

    useEffect(() => {
        let totalPrice = 0;
        let totalNutrition = [];
        cartItems.forEach((cartItem) => {
          const { product_price, quantity, category_id } = cartItem;
          const itemPrice = parseFloat(product_price) * parseFloat(quantity);
          totalNutrition.push(category_id);
          totalPrice += itemPrice;
        });
        setTotal(totalPrice);
        
        const nutriPoints = sumArray([...new Set(totalNutrition)]);
        setTotalQuality({points: nutriPoints, color: nutriPoints < 6 ? 'red' : 'green'});
    }, [cartItems]);

    return (
        <Fragment>
            <div className='navigation'>
                <div className='logo-container'>
                    <Link to="/"><img src={logo} alt='logo' className='logo'></img></Link>
                </div>
                
            
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/'>
                        ACCUEIL
                    </Link>
                    <Link className='nav-link' to='/shop'>
                        BOUTIQUE
                    </Link>
                    <Link className='nav-link' to='/todo'>
                        MES ACTIVITES
                    </Link>
                    <CartIcon onOpenModal={onOpenCartModal} />
                    <TaskIcon onOpenModal={onOpenListModal} />
                    <button className='exit-btn nav-link' onClick={handleLogout}>
                        <span className="exit-btn__icon"><LogOut  size={24} /></span>
                    </button>
                </div>
            </div>
            {totalQuality.points > 0 ?
            (<div className="container"> 
                <div className="indice-container">
                    <p className="category-text">Mon indice de repas équilibré: <span class="points"> {totalQuality.points}</span></p>  
                </div>
            </div>): null}

            <Modal open={openCart} onClose={onCloseCartModal} center >
                <div className="cart-dropdown-container">
                    <div className={`cart-dropdown ${cartItems.length <= 0 ? "no-cart-items" : ""}`}>
                    {cartItems.length > 0 ?
                        (<>
                        <div className='cart-items'>
                            {cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)}
                        </div>
                        <Button onClick={goToCheckoutPage}>Valider</Button>
                        </>
                        ): (<p> Vous n'avez pas encore d'articles </p>)}

                    </div>
                </div>
            </Modal>

            <Modal open={openList} onClose={onCloseListModal} center >
                <div className="list-dropdown-container">
                    <div className={`list-dropdown ${listItems.length <= 0 ? "no-list-items" : ""}`}>
                    {listItems.length > 0 ?
                        (<>
                        <div className='list-items'>
                            {listItems.map((item) => <ListItem  key={item.id} listItem={item} />)}
                        </div>
                        <Button onClick={goToTaskPage}>Voir</Button>
                        </>
                        ): (<p> Vous n'avez pas encore de tâches </p>)}

                    </div>
                </div>
            </Modal>

            <Outlet />

        </Fragment>
    )
}

export default Navigation;
