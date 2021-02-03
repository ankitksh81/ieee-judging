import React, {useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css'
import {auth, firebase} from '../firebase';
function Login() {
    const history = useHistory();
    const [mobile, setMobile] = useState("");
    const [OTPsent, setOTPsent] = useState(false);
    const [otp, setOtp] = useState(null);
    const [user, setUser] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const signIn = (e) => {
        e.preventDefault();
        var appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber("+91" + mobile, appVerifier)
        .then(function (confirmationResult) {
            setOTPsent(true);
            setConfirm(confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        }).catch(function (error) {
            console.error(error);
        });

    };
    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': function(response) {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                signIn();
            }
        });
    }, [])

    const finalSignIn = (e) => {
        e.preventDefault();
            confirm.confirm(otp).then(function (result) {
            setUser(result.user);
            // console.log(user);
            history.push({pathname:"/"})
            }).catch(function (error) {
                console.error(error);
            });
    }
    return (
        <div className="container">
            <div className="login__header">
                <h1>Gov-TechThon 2020</h1>
            </div>
            <div className="login__container">
                <div className="login">
                    <h1 className="login__heading">Jury Login</h1>
                    <form >
                        <label htmlFor="mobNumber">Mobile Number </label>
                        <input type="tel" name="mobNumber" id="mobNumber" placeholder="Enter your Mobile Number" onChange={(e)=>{setMobile(e.target.value)}} required/>
                        {OTPsent&&<input type="number" name="otp" id="otp" placeholder="Enter OTP" onChange={(e)=>{setOtp(e.target.value)}} required/>}
                        <br/>
                        <button onClick={OTPsent?(e)=>finalSignIn(e):(e)=>signIn(e)} id="sign-in-button" className="login__button">{OTPsent?"Login":"Send OTP"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
