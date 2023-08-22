import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const citiesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: String,
    country: {
        type: String,
        required: true
    },
    description: String,
    divisa: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Cities = mongoose.model('City', citiesSchema);

export default Cities;


