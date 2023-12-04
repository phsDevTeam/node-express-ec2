const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin1:test123@newsletterdb.r1ggapr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).send('Subscribed successfully!');
    } catch (err) {
        res.status(500).send('Error subscribing');
    }
});

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})