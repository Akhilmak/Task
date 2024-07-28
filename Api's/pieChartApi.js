const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

// Mapping of month names to their corresponding numbers
const monthMapping = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12
};

// API endpoint for pie chart
app.get('/pie-chart/:month', async (req, res) => {
    try {
        let { month } = req.params;
        month = month.toLowerCase();

        // Convert month name to number if necessary
        if (isNaN(month)) {
            month = monthMapping[month];
        } else {
            month = parseInt(month);
        }

        if (!month || month < 1 || month > 12) {
            return res.status(400).json({ message: 'Invalid month' });
        }

        // Fetch data from third-party API
        const response = await axios.get(API_URL);

        // Filter products sold in the specified month
        const products = response.data.filter((product) => {
            const saleMonth = new Date(product.dateOfSale).getMonth() + 1;
            return saleMonth === month;
        });

        // Count products in each category
        const categories = {};
        products.forEach((product) => {
            const { category } = product;
            categories[category] = categories[category] ? categories[category] + 1 : 1;
        });

        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));