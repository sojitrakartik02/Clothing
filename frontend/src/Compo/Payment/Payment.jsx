import React, { useState } from 'react';
import './Payment.css';
import axios from "axios";
const Payment = (props) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [recommendedSubOption, setRecommendedSubOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setRecommendedSubOption(null);
    };

    const handleSubOptionSelect = (subOption) => {
        setRecommendedSubOption(subOption);
    };



    const checkoutHandler = async (amount) => {

        const { data: { key } } = await axios.get("http://www.localhost:4000/api/getkey")

        const { data: { order } } = await axios.post("http://localhost:4000/api/checkout", {
            amount
        })

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "6 Pack Programmer",
            description: "Tutorial of RazorPay",
            image: "https://avatars.githubusercontent.com/u/25058652?v=4",
            order_id: order.id,
            callback_url: "http://localhost:4500/api/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }



    return (
        <div className='payment'>
            <h1>Choose Payment Mode</h1>
            <div className="payment1">
                <div className="payment-left">
                <p onClick={() => handleOptionSelect('recommended')} className={selectedOption === 'recommended' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Recommended</p>
                    <p onClick={() => handleOptionSelect('cash_on_delivery')} className={selectedOption === 'cash_on_delivery' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Cash on Delivery</p>
                    <p onClick={() => handleOptionSelect('upi')} className={selectedOption === 'upi' ? 'active-section' : ''} style={{ cursor: "pointer" }}>UPI(Pay via any app)</p>
                    <p onClick={() => handleOptionSelect('credit_card')} className={selectedOption === 'credit_card' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Credit/Debit card</p>
                    <p onClick={() => handleOptionSelect('wallets')} className={selectedOption === 'wallets' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Wallets</p>
                    <p onClick={() => handleOptionSelect('pay_later')} className={selectedOption === 'pay_later' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Pay Later</p>
                    <p onClick={() => handleOptionSelect('emi')} className={selectedOption === 'emi' ? 'active-section' : ''} style={{ cursor: "pointer" }}>EMI</p>
                    <p onClick={() => handleOptionSelect('net_banking')} className={selectedOption === 'net_banking' ? 'active-section' : ''} style={{ cursor: "pointer" }}>Net Banking</p>
                </div>
                <div className="payment-right">
                    {selectedOption === 'recommended' && (
                        <div className='recommended'>
                            <div>
                                <p className='Main-recom'>Recommended Payment Option</p>
                                <div className="option">
                                    <div className='border'>
                                        <input
                                            type="radio"
                                            id="cash_on_delivery"
                                            name="payment_option"
                                            onChange={() => handleSubOptionSelect('cash_on_delivery')}
                                        />
                                        <label className='recom' htmlFor="cash_on_delivery">Cash on Delivery(Cash/UPI)</label>
                                        <hr /></div>
                                    <div className='border'>
                                        <input
                                            type="radio"
                                            id="google_pay"
                                            name="payment_option"
                                            onChange={() => handleSubOptionSelect('google_pay')}
                                        />
                                        <label className='recom' htmlFor="google_pay">Google Pay</label>
                                        <hr /></div>
                                    <div >
                                        <input
                                            type="radio"
                                            id="phone_pay"
                                            name="payment_option"
                                            onChange={() => handleSubOptionSelect('phone_pay')}
                                        />
                                        <label className='recom' htmlFor="phone_pay">Phone Pay</label>
                                    </div>
                                </div>
                            </div>
                            {recommendedSubOption === 'cash_on_delivery' && (
                                <div className="recommended-options">
                                    <p>You can pay via cash/UPI on Delivery</p>
                                    <button className='pay_now' onClick={() => checkoutHandler(props.new_price)} >Plase Order</button>
                                </div>
                            )}
                            {recommendedSubOption === 'google_pay' && (
                                <div className="recommended-options">
                                    <p>Enter Google Pay UPI ID:</p>

                                    <div className='recom1'>
                                        <input type="text" placeholder='Enter Google Pay UPI ID' />
                                    </div> <button className='pay_now' onClick={() => checkoutHandler(props.new_price)}>PAY NOW</button>
                                </div>

                            )}
                            {recommendedSubOption === 'phone_pay' && (
                                <div className="recommended-options">
                                    <p>Enter Phone Pay UPI ID:</p>
                                    <div className='recom1'>
                                        <input className='recom1' type="text" placeholder='Enter Phone Pay UPI ID' />
                                    </div>
                                    <button className='pay_now' onClick={() => checkoutHandler(props.new_price)}>PAY NOW</button>
                                </div>

                            )}
                        </div>
                    )}
                    {selectedOption === 'cash_on_delivery' && (
                        <div className='Main-cash'>
                            <p className='cash_on2'>Cash on delivery</p>
                            <div className='border'>
                                <input
                                    type="radio"
                                    id="cash_on_delivery"
                                    name="payment_option"
                                    onChange={() => handleSubOptionSelect('cash_on_delivery')}
                                />
                                <label className='recom' htmlFor="cash_on_delivery">Cash on Delivery(Cash/UPI)</label>
                                <hr /></div>
                            <div>
                                {recommendedSubOption === 'cash_on_delivery' && (
                                    <div className="recommended-options">
                                        <p>You can pay via cash/UPI on Delivery</p>
                                        <button className='pay_now' onClick={() => checkoutHandler(props.new_price)}>Plase Order</button>
                                    </div>
                                )}
                            </div>

                        </div>

                    )}
                    {selectedOption === 'upi' && (
                        <div className="upi">
                            <div className='Main-cash'>
                                <p className='cash_on2'>Phone pay</p>
                                <div className='border'>
                                    <input
                                        type="radio"
                                        id="cash_on_delivery"
                                        name="payment_option"
                                        onChange={() => handleSubOptionSelect('cash_on_delivery')}
                                    />
                                    <label className='recom' htmlFor="cash_on_delivery">Phone pay</label>
                                </div>
                                <div>
                                    {recommendedSubOption === 'cash_on_delivery' && (
                                        <div className="recom-phone_pay">
                                            <div className='Cashback'>
                                                <p className='Up'>Up to 500 Cashback</p>
                                                <p className='RuPay'>On RuPay Credit Card transaction on PhonePe UPI.TCS</p>
                                            </div>
                                            <div className='btn'>
                                                <button className='pay_now' onClick={() => checkoutHandler(props.new_price)}>Pay Now</button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                    )}
                    {selectedOption === 'credit_card' && (
                        <div className="creditcard">
                            <div className='creditcard-p'><p>Please ensure your card can be used for online transaction. <span>know more</span></p></div>
                            <div className='creditcard-input'>
                                <input className='name' type="number" placeholder='Enter Card Number' name="" id="" />
                                <input className='name' type="text" placeholder='Enter Name' />
                                <div className="dateandcvv">
                                    <input className='date' type="Date" placeholder='Enter Date (MM/YY)' name="" id="" />
                                    <input className='cvv' type="number" placeholder='Enter CVV' name="" id="" />
                                </div>
                                <button className='pay_now' onClick={() => checkoutHandler(props.new_price)} style={{width:"30%"}}>PAY NOW</button>
                            </div>
                        </div>
                    )}
                    {selectedOption === 'wallets' && (
                        <div className="wallets">
                            <p>Wallet</p>
                        </div>
                    )}
                    {selectedOption === 'pay_later' && (
                        <div className="pay_later">
                            <p>Pay Later</p>
                        </div>
                    )}
                    {selectedOption === 'emi' && (
                        <div className="emi">
                            <p>EMI</p>
                        </div>
                    )}
                    {selectedOption === 'net_banking' && (
                        <div className="net_banking">
                            <p>Net Banking</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payment;
