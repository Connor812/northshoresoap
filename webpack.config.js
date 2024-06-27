const path = require('path');

module.exports = {
    // Other configurations like entry, output, etc.
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // Inject CSS into the DOM
                    'css-loader',   // Interprets @import and url() like import/require() and resolves them
                ],
            },
            // Add more rules for other file types like images, fonts, etc. as needed
        ],
    },
};
