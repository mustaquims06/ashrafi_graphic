import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

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

            // Get the token from localStorage
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser || !currentUser.token) {
                alert('Please login to make a payment');
                return;
            }

            // Verify we have the current user and token
            console.log('Creating order with amount:', amount);
            console.log('User token available:', !!currentUser.token);
            
            // Creating a new order with explicit headers
            const { data } = await axiosInstance.post('/payment/create-order', 
                { amount: amount },
                { 
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Order response:', data);
            if (!data.success) {
                console.error('Order creation failed:', data);
                alert('Error creating order: ' + (data.message || 'Unknown error'));
                return;
            }

            // Getting the order details back
            const { order } = data;

            // Get key from window.__ENV__ or env
            const key = process.env.REACT_APP_RAZORPAY_KEY_ID;
            
            const options = {
                key: key,
                amount: order.amount,
                currency: order.currency,
                name: "Ashrafi Graphics",
                description: "Payment for your order",
                order_id: order.id,
                handler: async function (response) {
                    try {
                        console.log('Payment response:', response);
                        const { data } = await axiosInstance.post('/payment/verify-payment', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        console.log('Verification response:', data);
                        if (data.success) {
                            onSuccess(response);
                            alert('Payment successful! Thank you for your order.');
                        } else {
                            console.error('Verification failed:', data);
                            onFailure(new Error(data.message || 'Payment verification failed'));
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (err) {
                        console.error('Verification error:', err);
                        onFailure(err);
                        alert('Payment verification error. Please check your order status.');
                    }
                },
                prefill: {
                    name: currentUser.username || currentUser.name,
                    email: currentUser.email,
                    contact: currentUser.phone || ""
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