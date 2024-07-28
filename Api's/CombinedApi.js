//run in browser as http://localhost:3000/combined-data/:month
//check console for results
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
const app = express();

// Use the cors middleware
app.use(cors());

// API endpoints for statistics, bar chart, and pie chart
const statisticsAPI = 'http://localhost:2005/statistics';
const barChartAPI = 'http://127.0.0.1:4000/bar-chart';
const pieChartAPI = 'http://127.0.0.1:5000/pie-chart';
const transactionsAPI = 'http://127.0.0.1:2006/products';


// Endpoint for combined data
app.get('/combined-data/:month', async (req, res) => {
    const month = req.params.month;

    try {
        // Fetch data from statistics API
        const statisticsResponse = await axios.get(`${statisticsAPI}/${month}`);
        console.log('Statistics Response:', statisticsResponse.data);

        // Fetch data from bar chart API
        const barChartResponse = await axios.get(`${barChartAPI}/${month}`);
        console.log('Bar Chart Response:', barChartResponse.data);

        // Fetch data from pie chart API
        const pieChartResponse = await axios.get(`${pieChartAPI}/${month}`);
        console.log('Pie Chart Response:', pieChartResponse.data);
        const transactionsResponse = await axios.get(transactionsAPI);
        console.log('Transactions Response:', transactionsResponse.data);

        // Combine the data
        const combinedData = {
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data,
            transactions: transactionsResponse.data
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            response: error.response ? error.response.data : null
        });
    }
});

// Start server
app.listen(3000, () => console.log('Server running on port 3000'));