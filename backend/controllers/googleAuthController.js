const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
    try {
        const { tokenId } = req.body;
        
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email_verified, email, name, picture } = ticket.getPayload();

        if (!email_verified) {
            return res.status(400).json({
                message: "Email not verified by Google."
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if doesn't exist
            user = new User({
                name,
                email,
                profileImage: picture,
                googleId: ticket.getUserId(),
                isVerified: true // Since email is verified by Google
            });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({
            message: "Error processing Google login"
        });
    }
};