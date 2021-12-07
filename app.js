const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 3000;

const getScraperApiKey = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

//Welcome Route
app.get("/", (req, res) => {
    res.send("Welcome To Amazon Scraper API....!");
});

//Get Product Details
app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${getScraperApiKey(api_key)}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${getScraperApiKey(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Product offers
app.get("/products/:productId/offers", async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${getScraperApiKey(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Search results 
app.get("/search/:searchQuery", async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;

    try {
        const response = await request(`${getScraperApiKey(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));