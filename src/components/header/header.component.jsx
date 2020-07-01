import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {ReactComponent as Logo} from '../../assets/logo.svg';
import { auth } from '../../Firebase/firebase.util';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropDown/cart-dropdown.component';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import './header.styles.scss'

const Header = ({ currentUser, hidden}) => (
    <div className = 'header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut() }> SIGN OUT</div>
                :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
            }
            <CartIcon className='option' />
        </div>
        { hidden ? null : <CartDropdown />}
    </div>
);

const mapStatetoProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
});



export default connect(mapStatetoProps)(Header);