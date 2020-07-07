import React, {useEffect} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';


import Homepage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './page/checkout/checkout.component';


import Header from './components/header/header.component';
import { checkUserSession } from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors';

import './App.css';


const App = ({ checkUserSession, currentUser}) =>{

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])


    
    return(
        <div>
            <Header />
            <Switch>
                <Route exact path ='/' component = { Homepage }/>
                <Route exact path = '/checkout' component = { CheckoutPage } />
                <Route exact path = '/signin' render = {() => 
                    currentUser ?(
                        <Redirect to='/' />
                        ) : (
                            <SignInAndSignUp />
                            )
                        }
                        />
                <Route path ='/shop' component = { ShopPage }/>
            </Switch>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
})

const mapDispatchToProps = dispatch =>({
    checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);