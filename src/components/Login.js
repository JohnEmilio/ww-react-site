import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function Login () {
    const [userInfo, setUserInfo] = useState({
        email:"",
        password:"",
        id:nanoid()
    })

    function handleUserInfo (event) {
        const {name, value} = event.target

        setUserInfo(prevInfo => (
            {...prevInfo, [name]: value}
        ))
    }

    function userLogin (event) {
        event.preventDefault()
        if(userInfo.password){
            console.log("Thanks for signing up")
        }
        console.log(userInfo)
    }

    return (
        <div className="loginContainer">
            <h2 className="loginHeading">Sign in</h2>
            <form className="loginForm">
                <input 
                    value={userInfo.email} 
                    type="email"
                    name="email"
                    placeholder="Please Enter Your Email" 
                    className="loginInput" 
                    id="loginEmailInput" 
                    onChange={(event) => handleUserInfo(event)}
                />
                <input 
                    value={userInfo.password} 
                    type="password"
                    name="password"
                    placeholder="Please Enter Your Password"
                    className="loginInput"
                    id="loginPasswordInput"
                    onChange={(event) => handleUserInfo(event)}
                />
                <button onClick={(event) => userLogin(event)} className="loginInput exerciseBtn">Build Your Workout!</button>
            </form>
        </div>
    )
}