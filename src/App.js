import React, {Component} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component'

import { auth, createUserProfileDocument } from './Firebase/firebase.util'


class App extends Component{
    constructor(){
        super() 
        this.state ={
            currentUser:null
        }
        
    }

    unSubscribeFromAuth = null;

    componentDidMount(){
        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser:{
                            id:snapshot.id,
                            ...snapshot.data()
                        }
                    })
                });
            }
            else{
                this.setState({currentUser:userAuth})
            }
        });
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