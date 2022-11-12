import React, { Component, createRef } from 'react';
import axios from 'axios'


class Register extends Component {

    constructor(props) {
        super(props);
        this.forms = createRef()
        this.match = false
        this.sucess = false
        this.matcher = this.matcher.bind(this)
        this.submitdata=this.submitdata.bind(this)

    }
    submitdata(event) {
        if (this.match) {
            axios.get("http://localhost:4000/profile?email=" + this.forms.email.value)
                .then(data => {
                    if (data.data.length === 0) {
                        axios.post("http://localhost:4000/profile", { name: this.forms.name.value, mobileno: this.forms.mobno.value, email: this.forms.email.value, password: this.forms.password.value, security: this.forms.security.value })
                            .then(() => {
                                alert("Account Created Sucessfully Please Login Again")
                                window.history.back();
                            })
                            .catch(error => {
                                alert(error)
                            })
                    } else {
                        alert("Account Already Exist")
                    }
                })
                
        }

        event.preventDefault()

    }
    matcher(event) {
        const password = document.getElementById("password").value;
        if (event.target.value === password) {
            this.match = true
            document.getElementById("confirmpass").setCustomValidity("")
        }
        else {
            document.getElementById("confirmpass").setCustomValidity("Password Doesn't match")
            this.match = false
        }
    }

    render() {

        return (
            <div>
                <link rel="stylesheet" href={require('../Css/register.css')}></link>

                <div className="Border" style={{ marginTop: "10px" }}>
                    <div className="Heading">
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "fit-content" }}>
                            <img src={require("../images/aspireLogo.png")} alt="" />
                            <h2>Aspire Shopping</h2>
                        </div>
                        <div style={{ display: "block", margin: "auto", width: "fit-content" }}>
                            <h3 style={{ width: "fit-content", color: " rgb(88, 26, 147)", fontFamily: "sans-serif" }}>Register</h3>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={this.submitdata} ref={ref => this.forms = ref}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span>Name</span>
                                        </td>
                                        <td>
                                            <input type="text" name="name" placeholder="Name" pattern="^[A-Za-z\s]*$" onInvalid={(event) => event.target.setCustomValidity('Only alphabets allowed')} onInput={(event) => event.target.setCustomValidity('')} required /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Mobile No.</span>
                                        </td>
                                        <td>
                                            <input type="tel" name="mobno" placeholder="Mobile No." required pattern="(0|91)?[6-9][0-9]{9}" onInput={(event) => event.target.setCustomValidity('')} onInvalid={(event) => event.target.setCustomValidity('Enter valid Mobile Number')} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Email</span>
                                        </td>
                                        <td>
                                            <input type="email" name="email" placeholder="Email" required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Password</span>
                                        </td>
                                        <td>
                                            <input type="password" id="password" name="password" placeholder="Password" pattern='((^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[%$@#&]).{8,20}))' onInvalid={(event) => event.target.setCustomValidity('Must contain minimum 8 characters, atleast one Upper case character, atleast one special character ')} onInput={(event) => event.target.setCustomValidity('')} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Confirm Password</span>
                                        </td>
                                        <td>
                                            <input id="confirmpass" type="password" name="confirmpassword" placeholder="Password" onChange={this.matcher} onInput={(event) => event.target.setCustomValidity('')} required /><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>Security Question</span>
                                        </td>
                                        <td>
                                            <input type="text" name="security" placeholder="Favorite Color" required />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <input type={"submit"} value="Register" />
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Register;