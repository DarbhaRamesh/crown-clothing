import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, createUserProfileDocument } from './Firebase/firebase.util';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';


import Homepage from './page/homepage/homepage.component';
import ShopPage from './page/shop/shop.component';
import SignInAndSignUp from './page/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './page/checkout/checkout.component';


import Header from './components/header/header.component';

import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';

import './App.css';


class App extends Component{

    unSubscribeFromAuth = null;

    componentDidMount(){
        const {setCurrentUser} = this.props;

        this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if(userAuth){
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id:snapshot.id,
                        ...snapshot.data()
                    })
                });
            }
            else{
                setCurrentUser(userAuth)
            }
            // addCollectionAndDocuments('collections',
            // collectionsArray.map(({title, items}) => ({title, items})))
        });
    }

    componentWillUnmount() {
        this.unSubscribeFromAuth();
    }


    render(){
        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path ='/' component = { Homepage }/>
                    <Route exact path = '/checkout' component = { CheckoutPage } />
                    <Route exact path = '/signin' render = {() => 
                        this.props.currentUser ?(
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
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);