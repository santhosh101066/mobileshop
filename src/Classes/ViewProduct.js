import axios from 'axios';
import React, { Component} from 'react';

import Header from './Header';


class ViewProduct extends Component {
    constructor(props) {
        super(props);
        this.id = window.history.state.p_id ? window.history.state.p_id : null
        this.state = {
            product: [],
            quantity: 1,
            maxquantity: 0,
            dec:true,
            inc:false,
        }

        this.onimageclick = this.onimageclick.bind(this)
        this.decrement = this.decrement.bind(this)
        this.increment = this.increment.bind(this)
        this.addtocart=this.addtocart.bind(this)


    }
    onimageclick(event) {
        let src = event.target.src
        if (src) {
            document.getElementById("Singleimage").src = src
        }
    }
    componentDidMount() {
        if (this.id) {
            axios.get("http://localhost:4000/product?id=" + this.id)
                .then((data) => this.setState({ product: data.data, maxquantity: parseInt(data.data[0].quantity) }))
        } else {
            window.location.href = '/'
        }
        
    }
    increment() {
        if (this.state.quantity < this.state.maxquantity) {
            const increment = this.state.quantity + 1
            this.setState({ quantity: this.state.quantity + 1, dec:false })
            
            if (increment >= this.state.maxquantity) {
                this.setState({inc: true})
            }
        }
        

    }
    addtocart(){
        const email=sessionStorage.getItem('email')
        if(email && this.id){
           axios.get("http://localhost:4000/usercart?email="+email+"&p_id="+this.state.product[0].id)
           .then(res=>{
            if (res.data.length===0){
                axios.post("http://localhost:4000/usercart",{email:email,p_id:this.id,quantity:this.state.quantity})
                .then((res)=> alert("Product added sucessfully"))
            }
            else{
                alert("Product already added to your cart")
            }
           })
           .catch(err=>alert("Connection error: "+err))
        }else{
            alert("Login to add your product to cart")
            window.location.href='login'
        }
    }
    decrement() {
        if (this.state.quantity >1) {
            const decrement=this.state.quantity-1
            this.setState({ quantity: this.state.quantity - 1, inc:false })
            if(decrement===1){
                this.setState({dec: true})
            }


        }

    }

    render() {
       
        const product = this.state.product.map(data =>
            
            <div key={data.id} style={{ margin: "10px", display: "flex" }}>

                <div className="Allimages" id="Allimages" onMouseOver={this.onimageclick} >
                    <div>
                        <img src={"images/" + data.id + ".jpg"} alt="" />
                    </div>
                    <div>
                        <img src={"images/" + data.id + "_1.jpg"} alt="" />
                    </div>
                    <div>
                        <img src={"images/" + data.id + "_2.jpg"} alt="" />
                    </div>
                    <div>
                        <img src={"images/" + data.id + "_3.jpg"} alt="" />
                    </div>
                    <div>
                        <img src={"images/" + data.id + "_4.jpg"} alt="" />
                    </div>
                    <div>
                        <img src={"images/" + data.id + "_5.jpg"} alt="" />
                    </div>
                </div>
                <div className="Singleimage" >
                    <img id="Singleimage" src={"images/" + data.id + ".jpg"} alt="" />
                </div>
                <div style={{ width: "90%" }}>
                    <h3 style={{ textAlign: "justify", marginBottom: "40px" }}>{data.detailedtitle}</h3>
                    <h5 style={{ marginBottom: "5px" }}>More Details :</h5>
                    {data.more_details.split("\n").map((val, i) => <p key={i} style={{ fontSize: "smaller", textAlign: "justify" }}><span style={{ width: "50px" }} /> ● {val}</p>)}


                </div>
                
                
                <div className="Cart">
                    <h3 style={{ textAlign: 'center' }}>₹ {data.price}</h3>
                    {this.state.maxquantity>0 ? 
                    <div><span style={{ margin: "10px" }}>Quantity:</span><div style={{ display: "flex", margin: "10px", marginBottom: "20px" }}>

                            <input className="QuantityBut" style={{ width: "30px" }} type="button" value="-" id='-' disabled={this.state.dec} onClick={this.decrement} />

                            <span id="quantity" data-quantity="5">{this.state.quantity}</span>
                            <input className="QuantityBut" style={{ width: "30px" }} type="button" value="+" disabled={this.state.inc} onClick={this.increment} />

                        </div><input className="But" type="button" id="addcart" value="Add to cart" onClick={this.addtocart} /><br></br><input className="But" id="buy" type="button" value="Buy Now" /></div>
                        :
                        <div>
                           <span style={{display:"block",margin:"auto",width:"fit-content",color:"red"}}><b>Out of stock</b></span> 
                        </div>}
                    
               
                </div>
            </div>
        
        )

        return (
            <div>

                <Header />
                <div className="Mainblock">
                    {product}
                    
                </div>
                
            </div>
            

        );
    }
}

export default ViewProduct;