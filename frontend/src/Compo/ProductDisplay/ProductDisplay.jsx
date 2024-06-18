import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const ProductDisplay = (props) => {



    const { product } = props;
    const{addToCart}=useContext(ShopContext);
    
    if (!product || !product.image) {
        return <div>No product data available</div>;
    }
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdiaplay-image">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_dull_icon} />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdispaly-right-price-old">
                        ${product.old_price}
                    </div>
                    <div className="productdispaly-right-price-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore itaque, est dolorum, laboriosam repudiandae molestiae, quas minima aut magnam vel nemo! Rem consequatur, ex iure repellat corporis necessitatibus provident quae.
                </div>
                <div className='productdisplay-right-size'>
                    <h1>Select Size</h1>
                    <div className='productdisplay-right-sizes'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>Xl</div>
                        <div>XXl</div>
                    </div>
                </div>
                <button  onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category : </span>Women,T-Shirt,Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags : </span>Modern,Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay
