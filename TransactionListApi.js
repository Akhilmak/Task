const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const port = 2006;
const axios = require('axios');

app.use(cors()); // Use cors middleware
app.use(express.json()); // Correctly reference the json middleware
// Endpoint to get product transactions with search and pagination
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        // Get search, pagination, and month parameters
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const month = req.query.month ? req.query.month.toLowerCase() : '';

        // Filter products based on search parameters
        let filteredProducts = products.filter(product => {
            return product.title.toLowerCase().includes(search.toLowerCase()) ||
                   product.description.toLowerCase().includes(search.toLowerCase()) ||
                   product.price.toString().includes(search);
        });

        // Filter products based on selected month
        if (month) {
            filteredProducts = filteredProducts.filter(product => {
                const date = new Date(product.dateOfSale);
                return date.toLocaleString('default', { month: 'long' }).toLowerCase() === month;
            });
        }

        // Implement pagination
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        res.json({
            page,
            perPage,
            total: filteredProducts.length,
            products: paginatedProducts
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