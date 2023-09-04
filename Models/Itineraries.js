import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String
    }],
    photo: {
        type: String,
        required: true
    },
    comments: [{
        user: String, 
        text: String,
        timestamp: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

export default Itinerary;


