import City from '../Models/Cities.js';

const cityController = {
    createCity: async (req, res) => {
        try {
            const newCity = new City(req.body);
            const savedCity = await newCity.save();
            res.status(201).json(savedCity);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while creating the city.' });
        }
    },

    getAllCities: async (req, res) => {
        try {
            const cities = await City.find();
            res.json(cities);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching cities.' });
        }
    },

    getCityById: async (req, res) => {
        try {
            const city = await City.findById(req.params.id);
            if (city) {
                res.json(city);
            } else {
                res.status(404).json({ error: 'City not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while fetching the city.' });
        }
    },

    updateCity: async (req, res) => {
        try {
            const updatedCity = await City.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (updatedCity) {
                res.json(updatedCity);
            } else {
                res.status(404).json({ error: 'City not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while updating the city.' });
        }
    },

    deleteCity: async (req, res) => {
        try {
            const deletedCity = await City.findByIdAndRemove(req.params.id);
            if (deletedCity) {
                res.json({ message: 'City deleted successfully.' });
            } else {
                res.status(404).json({ error: 'City not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the city.' });
        }
    },
};

export default cityController;


