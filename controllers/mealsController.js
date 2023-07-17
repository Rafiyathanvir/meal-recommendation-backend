const{MongoClient}=require('mongodb')

const uri = 'mongodb+srv://rafiyathanvir:Rafiya1997@cluster0.xmi1ban.mongodb.net/';
const dbName = 'test';
const collectionName = 'meals';


const client = new MongoClient(uri, { useUnifiedTopology: true });

const getRecommendedMeals = (req, res) => {4
    console.log("hello")
  client.connect()
    .then(() => {
      console.log('MongoDB connected successfully');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      collection
        .find()
        .limit(10)
        .toArray()
        .then((meals) => {
          res.json(meals);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch meal recommendations' });
        });
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      res.status(500).json({ error: 'Failed to fetch meal recommendations' });
    });
};

const generateRecommendations = (req, res) => {

 console.log("world")
  const preferences = req.body;

  console.log( "body",preferences)

  client.connect()
    .then(() => {
      console.log('MongoDB connected successfully');

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const query = {
        "meal.dietaryPreferences": preferences.dietaryPreferences,
        "meal.cuisineTypes": preferences.cuisineType,
        "meal.spicinessPreference": preferences.spicinessLevel,
        "meal.mealCategories": preferences.mealCategory,
      };

      console.log(query)

      
      
      collection
        .aggregate([
          { $unwind: "$meal" }, // Unwind the meal array
          { $match: query }, // Match the documents based on the query
          {
            $replaceRoot: {
              newRoot: "$meal"
            }
          }
        ])
        .limit(10)
        .toArray()
        .then((meals) => {
          res.json(meals);
        })

      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate meal recommendations' });
      })
      
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      res.status(500).json({ error: 'Failed to generate meal recommendations' });
    });
};const getOrderHistory = (req, res) => {
  client.connect()
    .then(() => {
      console.log('MongoDB connected successfully');

      const db = client.db(dbName);
      const collection = db.collection(orderHistoryCollectionName);

      collection
        .find()
        .toArray()
        .then((orders) => {
          res.json(orders);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch order history' });
        });
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      res.status(500).json({ error: 'Failed to fetch order history' });
    });
};


const orderHistoryData = [
  {
    customerId: '12345',
    meal: 'Spaghetti Bolognese',
    quantity: 2,
    totalAmount: 30.99,
    date: new Date(),
  },
  {
    customerId: '67890',
    meal: 'Veggie Stir-Fry',
    quantity: 1,
    totalAmount: 15.99,
    date: new Date(),
  },
  // Add more order history data objects as needed
];

const insertOrderHistory = () => {
  client.connect()
    .then(() => {
      console.log('MongoDB connected successfully');

      const db = client.db(dbName);
      const collection = db.collection(orderHistoryCollectionName);

      collection.insertMany(orderHistoryData)
        .then(() => {
          console.log('Order history inserted successfully');
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          client.close();
        });
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
    });
};

insertOrderHistory();


module.exports = {
  getRecommendedMeals,
  generateRecommendations,
  getOrderHistory,
};