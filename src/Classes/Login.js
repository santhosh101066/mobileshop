import axios from 'axios';
import React, { Component, createRef } from 'react';
import {ReactSession} from 'react-client-session'


class Login extends Component {
    
    constructor(props) {
        
        super(props);
        this.forms = createRef()
        this.onformsubmit=this.onformsubmit.bind(this)
        ReactSession.setStorageType("sessionStorage")
    }
    onformsubmit(event){
        const msg=document.getElementById("incorrectcred");
        axios.get("http://localhost:4000/profile?email="+this.forms.email.value+"&password="+this.forms.password.value)
        .then(value=>{
            if(value.data.length>0){
                sessionStorage.setItem("email",value.data[0].email)
                
                ReactSession.set("email",value.data[0].email)
                
                window.history.back()
            }
            else{
                msg.style.display="block"
            }
        })
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <link rel='stylesheet' href={require('../Css/login.css')}></link>
                <section style={{ marginTop: "10px" }}>
                    <div className="Border">
                        <div className="Heading">
                            <div
                                style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "fit-content" }}>
                                <img src={require("../images/aspireLogo.png")} alt="" />
                                <h2>Aspire Shopping</h2>
                            </div>
                        </div>
                        <div style={{ display: "block", margin: "auto", width: "fit-content" }}>
                            <h3
                                style={{ width: "fit-content", color: "rgb(88, 26, 147)", fontFamily: "sans-serif" }}>Login</h3>
                        </div>
                        <div>
                            <form ref={ref => this.forms = ref} onSubmit={this.onformsubmit} onChange={()=>{document.getElementById("incorrectcred").style.display="none"}} >
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><span>Email</span></td>
                                            <td><input id="email" type="email" name="email"
                                                placeholder="Email" required  /><br />
                                                <span
                                                    id="emailvalid"
                                                    style={{ color: "red", display: "none", fontSize: "x-small" }}>*Enter
                                                    valid email address</span></td>
                                        </tr>
                                        <tr>
                                            <td><span>Password</span></td>
                                            <td><input type="password" name="password" id="password"
                                                placeholder="Password" required /> <input type="hidden"
                                                    name="type" value="login" /> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <span id="incorrectcred"
                                    style={{ color: "red", display: "none", fontSize: "small", margin: "auto", transform:"translate(70px,-10px)", position:"absolute" }}>Incorrect
                                    email or password</span>

                                <input id="submitbtn" type="submit" value="Login" />
                                <div
                                    style={{ display: "flex", justifyContent: "space-around", alignItems: "center", marginBottom: "10px" }}>
                                    <a href="/" hidden="hidden">Forgot Password?</a> 
                                    <a href="register">New User</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;