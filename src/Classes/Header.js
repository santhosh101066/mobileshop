import React, { Component, createRef } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
        this.login = createRef()
        this.state = {
            login: sessionStorage.getItem('email') ?  
                <><div className="dropdown">
                    <img className="dropbtn" style={{ width: "40px", height: "40px" }} alt='' src={"https://img.icons8.com/material/90/9B59B6/user-male-circle--v1.png"} />
                    <div className="dropdown-content">
                        <button onClick={this.logout}>Your Order</button>
                        <button onClick={this.logout} >Logout</button>
                    </div>
                </div><a href="Cart"><img style={{ width: "40px", height: "40px " }}
                    src={"https://img.icons8.com/ios-glyphs/90/9B59B6/shopping-cart--v1.png"} alt=''></img></a></> : <a href="login">Login/Register</a>  
        }

    }
    logout() {
        sessionStorage.removeItem('email')
        this.setState({ login: <a href="login">Login/Register</a> })

    }
    render() {
        return (
            <div>
                <header>
                    <div className="Header">
                        <img src={require("../images/aspireLogo.png")} alt=''></img>
                        <h3>Aspire Shopping</h3>
                        <div className="Null"></div>
                        <nav className="navClass">
                            {this.state.login}
                        </nav>
                    </div>
                </header>
            </div>

        );
    }
}

export default Header;