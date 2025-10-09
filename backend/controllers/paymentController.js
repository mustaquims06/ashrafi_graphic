const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay with your key_id and key_secret
let razorpay;
try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    }
} catch (error) {
    console.error('Failed to initialize Razorpay:', error);
}

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        if (!razorpay) {
            return res.status(500).json({
                success: false,
                message: 'Razorpay is not configured. Please check your environment variables.'
            });
        }

        const { amount, currency = "INR" } = req.body;
        
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Could not create order'
        });
    }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            res.json({
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid signature sent!"
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Could not verify payment'
        });
    }
};