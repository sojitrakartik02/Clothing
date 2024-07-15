import React, { createContext, useEffect, useState } from "react";

import Product from "../Pages/Product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);




    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4500/allproducts')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Products:", data);
                setAll_Product(data);
            })
            .catch((error) => console.error("Error fetching products:", error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4500/getcart', {
                method: "POST",
                headers: {
                    Accept: "application/form-data",
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    "Content-Type": 'application/json',
                },
                body: "",

            }).then((response) => response.json()).then((data) => setCartItems(data))
        }


    }, []);
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4500/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/from-data',
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((response) => response.json())
                .then((data) => console.log(data))
        }
    }

    const removeToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4500/removefromcart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/form-data',
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((response) => response.json())
                .then((data) => console.log(data))
        }
    }


    const getTotalCartAmout = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                } else {
                    console.warn(`Product with id ${item} not found`);
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem


    }



    const contextValue = { getTotalCartItems, getTotalCartAmout, all_product, cartItems, addToCart, removeToCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
