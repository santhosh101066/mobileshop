import axios from 'axios';
import React, { Component } from 'react';

import Header from './Header';

class Home extends Component {
   
    constructor(props) {
        super(props);
        this.state = { list: []  }
        this.quantity=0
    }

    componentDidMount() {
        axios.get("http://localhost:4000/product")
            .then((data) => {
                this.setState({ list: data.data})
                
            })
    }
    render() {
        
        const list = this.state.list.map(data => 
            <div key={data.id} onClick={() => {
                window.history.pushState({p_id:data.id},"","product")
                window.history.go()}} className="product">
                <img src={"images/"+data.id+".jpg"} alt=''/>
                <h5>{data.title}</h5>
                <span>₹ {data.price}</span>
            </div>
        )
        return (
            <div>
                <Header />
                <section>
                    <h4 style={{ marginLeft: "5px" }}>Mobile Products</h4>
                    <div className="productSection">
                        <div className="productdiv">
                            {list}
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

export default Home;