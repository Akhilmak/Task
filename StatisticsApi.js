//Run this code with url http://localhost:2005/statistics/:month
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 2005;
const axios = require('axios');

app.use(express.json());
app.use(cors()); // Use the cors middleware

// Endpoint to calculate statistics based on selected month
app.get('/statistics/:month', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const month = req.params.month.toLowerCase();
        const products = response.data;

        // Define a map of month names to their corresponding numbers
        const monthMap = {
            january: 0,
            february: 1,
            march: 2,
            april: 3,
            may: 4,
            june: 5,
            july: 6,
            august: 7,
            september: 8,
            october: 9,
            november: 10,
            december: 11
        };

        // Check if the provided month is valid
        if (!(month in monthMap)) {
            return res.status(400).send('Invalid month');
        }

        // Filter products based on selected month
        const filteredProducts = products.filter(product => {
            const date = new Date(product.dateOfSale);
            return date.getMonth() === monthMap[month];
        });

        // Calculate total sale amount of selected month
        const totalSaleAmount = filteredProducts.reduce((acc, product) => {
            if (product.sold) {
                return acc + product.price;
            }
            return acc;
        }, 0);

        // Calculate total number of sold items of selected month
        const totalSoldItems = filteredProducts.filter(product => product.sold).length;

        // Calculate total number of not sold items of selected month
        const totalNotSoldItems = filteredProducts.filter(product => !product.sold).length;

        res.json({
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

// Start the application
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});