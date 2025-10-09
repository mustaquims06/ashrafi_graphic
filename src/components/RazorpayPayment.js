import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const RazorpayPayment = ({ amount, onSuccess, onFailure }) => {
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async () => {
        try {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

            if (!res) {
                alert('Razorpay SDK failed to load');
                return;
            }

            // Creating a new order
            const { data } = await axios.post('/api/payment/create-order', {
                amount: amount
            });

            if (!data.success) {
                alert('Error creating order');
                return;
            }

            // Getting the order details back
            const { order } = data;

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Ashrafi Graphics",
                description: "Payment for your order",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const { data } = await axios.post('/api/payment/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (data.success) {
                            onSuccess(response);
                        } else {
                            onFailure(new Error('Payment verification failed'));
                        }
                    } catch (err) {
                        onFailure(err);
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error:', error);
            onFailure(error);
        }
    };

    return (
        <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={displayRazorpay}
        >
            Pay Now
        </button>
    );
};

export default RazorpayPayment;