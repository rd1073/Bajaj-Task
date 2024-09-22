const express = require('express');
const router = express.Router();
const { toBase64} = require('base64-to-file');
const { Buffer } = require('buffer');

// Sample user data (hardcoded)
const user = {
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123"
};

// Helper function to classify input
const classifyData = (data) => {
    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
            if (item === item.toLowerCase() && item > highestLowercase) {
                highestLowercase = item;
            }
        }
    });

    return { numbers, alphabets, highestLowercase };
};

// Function to check MIME type from Base64 string
const base64MimeType = (encoded) => {
    let result = null;

    if (typeof encoded !== 'string') {
        return result;
    }

    const mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    
    if (mime && mime.length) {
        result = mime[1];
    }

    return result;
};

// POST /bfhl
router.post('/', (req, res) => {
    const { data, file_b64 } = req.body;
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid data format' });
    }

    const { numbers, alphabets, highestLowercase } = classifyData(data);

    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKb = null;

    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            fileMimeType = base64MimeType(file_b64);  // Extract MIME type

            if (fileMimeType) {
                fileSizeKb = (buffer.length / 1024).toFixed(2); // Size in KB
                fileValid = true;
            }
        } catch (error) {
            fileValid = false;
        }
    }


    res.json({
        is_success: true,
        user_id: user.user_id,
        email: user.email,
        roll_number: user.roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET /bfhl
router.get('/', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

module.exports = router;
