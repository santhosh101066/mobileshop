import axios from 'axios';
import React, { Component } from 'react';
import Header from './Header';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={
            cart:[]
        }
    }
    componentDidMount(){
        axios.get("http://localhost:4000/usercart?email="+sessionStorage.getItem('email'))
    }
    render() {
        return (
            <div>
                <link rel="stylesheet" href="css/cart.css"></link>
                <Header/>
                <section>
                    <h4 style={{textAlign: "center"}}> Your Cart is Empty</h4>
                    <div className="Listoncart">
                        <div style={{height: "140px", margin: "5px", objectFit: "contain"}}>
                            <img src="images/1.png" alt="img" />
                        </div>

                        <h3 style={{margin: "5px",width: "100%"}}>title</h3>
                        <span
                            style={{display: "flex", justifyContent: "space-around", alignItems: "center", width: "200px"}}>Quantity:
                            1</span>
                        <div className="Ondisplay">
                            <span> ₹ </span>
                            <button 
                                className="Removebtn" onClick={()=>{
                                    window.history.pushState({artist:"yuvan"},"","test")
                                    window.history.go();
                                }}>Delete</button>
                        </div>
                    </div>
                    <div className="Subtotal">
                        <button id="buy" className="Buynow" >Buy All Products</button>
                        <span> Subtotal: ₹
                        </span>
                    </div>
                </section>
            </div>
        );
    }
}

export default Cart;