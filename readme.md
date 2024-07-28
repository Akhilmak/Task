# NodeJS Assignment

This project sets up a Node.js server that connects to a MongoDB database, fetches product transaction data from an external source, and provides multiple APIs to retrieve and analyze the stored products.

## How to Run

Run all the js files using `node filename.js` and then open the `FinalIndex.html` file to get the desired output.

## Table of Contents

- [API Endpoints](#api-endpoints)
  - [Initialize Database](#initialize-database)
  - [Get Statistics](#get-statistics)
  - [Get Transactions](#get-transactions)
  - [Get Bar Chart Data](#get-bar-chart-data)
  - [Get Pie Chart Data](#get-pie-chart-data)
  - [Get Combined Data](#get-combined-data)
- [Database Schema](#database-schema)

## API Endpoints

### Initialize Database

**Endpoint:** `GET /initialize-db`

**Description:** Fetches JSON data from a third-party API and initializes the database with seed data.

**Steps:**

1. Set up a Node.js project with Express.js.
2. Install necessary packages: `axios` for making HTTP requests and `mongoose` for interacting with the database.
3. Define a route for the initialization API (`/initialize-db`) and a function to handle the request.
4. In the function, make a GET request to the third-party API using `axios` to fetch the JSON data.
5. Parse the JSON data and create a new collection/table in your database (`products`) using `mongoose`.
6. Insert each product as a new document into the `products` collection/table.
7. Send a response to the client indicating the success or failure of the database initialization.

### Get Statistics

**Endpoint:** `GET http://localhost:2005/statistics?month=:month`

**Description:** Fetches statistics for the selected month, including total sale amount, total number of sold items, and total number of not sold items.

**Parameters:**

- `month` (string): The month for which to fetch the statistics (e.g., "March").

**Response:**

```json
{
  "totalSaleAmount": 12345.67,
  "totalSoldItems": 100,
  "totalNotSoldItems": 50
}
```
