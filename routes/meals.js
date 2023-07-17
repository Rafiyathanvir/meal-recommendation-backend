
const express = require('express');
const router = express.Router();
// const mealsController = require('../controllers/mealsController');
const {generateRecommendations,getRecommendedMeals,getOrderHistory}=require('../controllers/mealsController')

router.get('/recommendations', getRecommendedMeals);
router.post('/recommendations',generateRecommendations);
router.get('/getOrderHistory',getOrderHistory);


 module.exports = router;

