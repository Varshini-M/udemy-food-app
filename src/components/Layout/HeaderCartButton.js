import React,{useContext,useEffect,useState} from 'react';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((currentNumber,item)=>{return currentNumber+item.amount},0);
    const [buttonIsHighlighted,setButtonIsHighlighted] = useState(false);
    const buttonClasses = `${classes.button}  ${buttonIsHighlighted ? classes.bump:''}`;
    
    const {items}=cartCtx;
    useEffect(()=>{
        if(cartCtx.items.length === 0){
            return;
        }
        setButtonIsHighlighted(true);
        const timer = setTimeout(()=>{
            setButtonIsHighlighted(false);
        },300);

        return () => {
            clearTimeout(timer);
        }
    },[items]);
    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
};

export default HeaderCartButton;