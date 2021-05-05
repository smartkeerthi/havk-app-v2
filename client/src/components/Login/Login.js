import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'reactstrap'
import { auth, provider } from '../../firebase'
import { setActiveUser } from '../../reducers/userSlice'
import './login.css'
import axios from '../../Axios/axios'

function Login() {
    const dispatch = useDispatch()

    const handleSignIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch(setActiveUser({
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userProfilePic: result.user.photoURL
                }))
                axios.post('/api/addUser',{
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    userProfile: result.user.photoURL
                })
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    return (
        <div className="bg-dark loginPage">
            <div className="loginBody">
                <div className="loginLeft">
                    <div>
                        <h3>Login</h3>
                    </div>
                </div>
                <div className="loginRight">
                    <div>
                        <Button color="primary" onClick={handleSignIn} >SignIn With Google</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
