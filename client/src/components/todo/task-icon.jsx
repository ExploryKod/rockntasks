import { useContext } from 'react';
import { Clipboard } from 'lucide-react';
import { ListContext } from '../../context/list.context';

const CartIcon = ({onOpenModal}) => {
    const { listCount } = useContext(ListContext);

    return (
        <div className='cart-icon-container' onClick={onOpenModal}>
            <Clipboard className='clipboard-icon' />
            <span className='item-count'>{listCount}</span>
        </div>
    );

}

export default CartIcon;




