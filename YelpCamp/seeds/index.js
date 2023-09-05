const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(() => console.log('Database Connected!'))
    .catch(err => {
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64dcb82f1c031082d816cf77',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dy0g6td7t/image/upload/v1692638255/YelpCamp/xlgamqyjdwhv8rwguti6.jpg',
                  filename: 'YelpCamp/xlgamqyjdwhv8rwguti6'
                },
                {
                  url: 'https://res.cloudinary.com/dy0g6td7t/image/upload/v1692638347/YelpCamp/t7kkf2isejfe4rc5kfxj.jpg',
                  filename: 'YelpCamp/t7kkf2isejfe4rc5kfxj'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})