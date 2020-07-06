import React, {useState} from 'react';
import {connect } from 'react-redux';
import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart, githubSignInStart } from '../../redux/user/user.actions'


const SignIn = ({ emailSignInStart, googleSignInStart, githubSignInStart }) => {
    const [userCredentials, setUserCredentials] = useState({email: '', password:''});

    const {email,password } = userCredentials;

    const handleSubmit = event =>{
        event.preventDefault()

        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const {value, name } = event.target;

        setUserCredentials({ ...userCredentials , [name]:value});
    }

    
    return(
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
            <FormInput 
            name= 'email' 
            type ='email' 
            value ={ email } 
            handleChange= { handleChange}
            label='Email'
            required
            />
            <FormInput 
            name='password' 
            type ='password' 
            value ={ password }
            handleChange= { handleChange}
            label='Password'
            required
            />
            <div className='buttons'>
                <CustomButton type ='submit'>
                    Sign in
                </CustomButton>

                <CustomButton
                type = 'button' 
                onClick = { googleSignInStart } isGoogleSignIn
                >
                    Google sign in 
                </CustomButton>
            </div>
            <CustomButton
            type = 'button' 
            onClick = { githubSignInStart }
            >
                Github sign in 
            </CustomButton>
            </form>

            
        </div>
    )
}


const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password ) => dispatch(emailSignInStart({email, password})),
    githubSignInStart: () => dispatch(githubSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn);