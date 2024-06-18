import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

 
    
    const addProduct = async () => {
        if (!productDetails.name || !productDetails.new_price || !productDetails.old_price || !image) {
            alert("Please fill in all fields and upload an image.");
            return;
        }
    
        const product = { ...productDetails, new_price: Number(productDetails.new_price), old_price: Number(productDetails.old_price) };
        let formData = new FormData();
        formData.append('product', image);
        console.log("Form Data:", formData);
    
        try {
            const uploadResponse = await fetch('http://localhost:4500/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            }).then(res => res.json());
    
            console.log("Upload Response:", uploadResponse);  // Log the upload response
    
            if (uploadResponse.succes) {
                product.image = uploadResponse.image_url;
                const addResponse = await fetch('http://localhost:4500/addproduct', {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product),
                }).then(res => res.json());
    
                console.log("Add Product Response:", addResponse);  // Log the add product response
    
                if (addResponse.succes) {
                    alert("Product Added");
                } else {
                    alert("Failed to add product");
                    console.log("Error adding product:", addResponse.error);
                }
            } else {
                alert("Failed to upload image");
                console.log("Error uploading image:", uploadResponse.error);
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        }
    }
    


    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type..' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='number' name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input type='number' name='new_price' value={productDetails.new_price} onChange={changeHandler} placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnailimg' alt="Product" />
                </label>
                <input onChange={imageHandler} type='file' name='image' id="file-input" hidden />
            </div>
            <button onClick={addProduct} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct;
