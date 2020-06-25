import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth } from './Firebase/firebase.util'


class App extends Component{
    constructor(){
        super() 
        this.state ={
            currentUser:null
        }
        
    }

    unSubscribeFromAuth = null;

    componentDidMount(){
        this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({ currentUser:user });

            console.log(user);
        })
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }


    render(){
        return(
            <div>
                <Header currentUser={ this.state.currentUser }/>
                <Switch>
                    <Route exact path='/' component = { Homepage }/>
                    <Route  path = '/signin' component ={ SignInAndSignUp } />
                    <Route  path='/shop' component = { ShopPage }/>
                </Switch>
            </div>
        )
    }
}

export default App