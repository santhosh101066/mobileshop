import axios from 'axios';
import React, { Component } from 'react';

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.addproduct = this.addproduct.bind(this)
        this.images = []
        
    }

    addproduct(event) {

        event.preventDefault()
        const form = event.target
        if (form.other_image.files.length === 5) {
            var generate_more = form.more_details.value.replace("\n", '<br/> <br/>●')
            var product = {
                title: form.title.value,
                detailedtitle: form.detailed_title.value,
                more_details: generate_more,
                quantity: form.quantity.value,
                price: form.price.value,

            }
            axios.post("http://localhost:4000/product", product)
                .then(data => {
                    let id = data.data.id
                    var formdata = new FormData();
                    Array.prototype.forEach.call(form.other_image.files,file=>{
                        console.log(file);
                        formdata.append("multifiles", file);
                    })
                    console.log(formdata);
                    axios({method:'post', url:"http://localhost:2000/uploads?id=" + id,data: formdata, 
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(()=>{
                        var formdata1=new FormData();
                        formdata1.append("file",form.main_image.files[0])
                        axios.post("http://localhost:2000/upload?id=" + id, formdata1, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                    })
                    .then(()=>alert("Product Added Sucessfully"))
                    .catch((err)=>alert("Single file Error: ",err ))
                })                              
                .catch((err)=>alert("Multi file Error: ",err ))
            })
            .catch((err)=>alert("content Error: ",err ))

            //     Array.prototype.forEach.call(form.other_image.files,(file)=>{
            //         const read = new  FileReader()
            //     read.onloadend=()=>(this.images.push(read.result.toString())) 
            //     read.readAsDataURL(file)
            //     })
            //     console.log(this.images[0]);
            //    var img={
            //         images:this.images
            //     }
            //     axios.post("http://localhost:4000/productimg",img)
            //     .then(()=>{
            //         var generate_more=form.more_details.value.replace('\n','<br/> <br/>●')
            //         var main_image;
            //         const read = new  FileReader()
            //     read.onloadend=()=>(main_image=read.result) 
            //     read.readAsDataURL(form.main_image.files.files[0])
            //         var product={
            //             title:form.title.value,
            //             detailedtitle:form.detailed_title.value,
            //             more_details:generate_more,
            //             quantity:form.quantity.value,
            //             price:form.price.value,
            //             main_image:main_image
            //         }
            //     // axios.post("http://localhost/product",product)
            //     // .then((data)=>{
            //     //     alert('Product Added Sucessfully')
            //     //     form.clear()
            //     // })
            //     })
            //     .catch(error=>{
            //         alert('Error occured :',error)
            //     })
        }
        else {
            form.other_image.setCustomValidity('Must contain only 5 image file')
        }
    }

    render() {
        return (
            <div>
                <link rel={require('../Css/productmanage.css')}></link>
                <section>
                    <div className="Addproduct">
                        <div className="Heading">
                            <div
                                style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "fit-content" }}>
                                <img src={require('../images/aspireLogo.png')} alt="logo" />
                                <h2>Aspire Shopping</h2>
                            </div>
                        </div>
                        <div>
                            <h4
                                style={{ width: "fit-content", display: "block", margin: "auto", marginBottom: "10px" }}>Add
                                Product</h4>
                        </div>
                        <form onSubmit={this.addproduct} >
                            <table>
                                <tbody>
                                    <tr>
                                        <td><label> Title:</label></td>
                                        <td><input type="text" name="title" required
                                            autoComplete="off" /></td>
                                    </tr>
                                    <tr>
                                        <td><label> Detailed Title:</label></td>
                                        <td><input type="text" name="detailed_title" required
                                            autoComplete="off" /></td>
                                    </tr>
                                    <tr>
                                        <td><label> More Details:</label></td>
                                        <td><textarea style={{ width: "90%" }} name="more_details" id=""
                                            cols="30" rows="10" required></textarea></td>
                                    </tr>
                                    <tr>
                                        <td><label> Quantity:</label></td>
                                        <td><input type="number" name="quantity" required
                                            autoComplete="off" /></td>
                                    </tr>
                                    <tr>
                                        <td><label> price:</label></td>
                                        <td><input type="number" name="price" required
                                            autoComplete="off" /></td>
                                    </tr>
                                    <tr>
                                        <td><label> Main Image</label></td>
                                        <td><input type="file" name="main_image"
                                            accept="image/png, image/gif, image/jpeg" required /></td>
                                    </tr>
                                    <tr>
                                        <td><label> Other Images</label></td>
                                        <td><input id="multifiles" type="file" name="other_image"
                                            accept="image/png, image/gif, image/jpeg" multiple required onChange={(event) => event.target.setCustomValidity('')} /><br />
                                            <span style={{ fontSize: "x-small", color: "red" }}>*Must
                                                contain only 5 Image files</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <button className="Submitbtn" type="submit" >Submit</button>
                            </div>
                        </form>
                    </div>
                </section>

            </div>
        );
    }
}

export default AddProduct;