const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;
        
        // Step 1: Google se mile token ko verify karein
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Step 2: Token se user ki details nikalein
        // Hum yahan 'name' bhi nikal rahe hain, lekin use 'username' banane ke liye use karenge
        const { email_verified, email, name, picture, sub: googleId } = ticket.getPayload();

        if (!email_verified) {
            return res.status(400).json({
                message: "Email not verified by Google."
            });
        }

        // Step 3: Check karein ki user pehle se database me hai ya nahi
        let user = await User.findOne({ email });

        // Step 4: Agar user nahi hai, to ek naya user banayein
        if (!user) {
            // Username generation logic
            let username = email.split('@')[0]; // e.g., "john.doe" from "john.doe@example.com"
            const userExists = await User.findOne({ username });
            if (userExists) {
                // Agar username exist karta hai, to unique banane ke liye random number add karein
                username = username + Math.floor(Math.random() * 1000);
            }

            // Naya user object banayein jo aapke schema se bilkul match karta ho
            user = new User({
                username: username,         // Schema se match kiya (required)
                email: email,               // Schema se match kiya (required, unique)
                googleId: googleId,         // Schema se match kiya
                profileImage: picture,      // Schema se match kiya
                isVerified: true,           // Schema se match kiya
                provider: 'google',         // Track that this is a Google user
                phone: '',                  // Initialize empty phone
                address: ''                 // Initialize empty address
            });
            
            await user.save();
        }

        // Step 5: User ke liye ek JWT token generate karein
        const token = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin }, // Using _id consistently
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Step 6: Frontend ko token aur user ki details bhej dein
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            message: "Server error during Google login"
        });
    }
};