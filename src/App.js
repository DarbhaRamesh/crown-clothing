import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'


const App = () =>{
    return(
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component = { Homepage }/>
                <Route  path = '/signin' component ={ SignInAndSignUp } />
                <Route  path='/shop' component = { ShopPage }/>
            </Switch>
        </div>
    )
}

export default App