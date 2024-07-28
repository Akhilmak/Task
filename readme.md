# NodeJS Assignment

This project sets up a Node.js server that connects to a MongoDB database, fetches product transaction data from an external source, and provides multiple APIs to retrieve and analyze the stored products.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Initialize Database](#initialize-database)
  - [Get Statistics](#get-statistics)
  - [Get Bar Chart Data](#get-bar-chart-data)
  - [Get Pie Chart Data](#get-pie-chart-data)
  - [Get Combined Data](#get-combined-data)
- [Database Schema](#database-schema)

## Installation

1. **Set up a Node.js project:**

   - Create a new directory for your project and navigate into it.
   - Initialize a new Node.js project using `npm init`.

2. **Install dependencies:**

   - Install Express.js for creating the server: `npm install express`.
   - Install Mongoose for interacting with MongoDB: `npm install mongoose`.
   - Install Axios for making HTTP requests: `npm install axios`.

3. **Ensure MongoDB is running:**

   - Make sure you have MongoDB installed and running on your local machine. The default connection string is `mongodb://127.0.0.1:27017/database`.

4. **Create the server file:**

   - Create a file named `index.js` and add the server code provided in the project.

5. **Start the server:**
   - Run the server using the command: `node index.js`.
   - The server will start on port 2007.

## Usage

1. **Initialize the database:**

   - When the server starts, it will fetch product transaction data from an external source and populate the MongoDB database.

2. **Access the APIs:**
   - You can access the various API endpoints to retrieve and analyze the data.

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

**Endpoint:** `GET /statistics?month=:month`

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
