import React, {useEffect, lazy, Suspense} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';


import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component'
import { checkUserSession } from './redux/user/user.actions'
import {selectCurrentUser} from './redux/user/user.selectors';

import './App.css';

const Homepage = lazy(() => import('./page/homepage/homepage.component'));
const ShopPage = lazy(() => import('./page/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./page/sign-in-and-sign-up/sign-in-and-sign-up.component'));
const CheckoutPage = lazy(() => import('./page/checkout/checkout.component'));


const App = ({ checkUserSession, currentUser}) =>{

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])


    
    return(
        <div>
            <Header />
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
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
                    </Suspense>
                </ErrorBoundary>
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