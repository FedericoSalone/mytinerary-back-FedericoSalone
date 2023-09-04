import Itinerary from '../Models/Itineraries.js';

const itinerariesController = {
    getAllItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find();
            res.status(200).json(itineraries);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los itinerarios' });
        }
    },

    getItinerariesByCity: async (req, res) => {
        const cityId = req.params.cityId;
        try {
            const itineraries = await Itinerary.find({ city_id: cityId });
            res.status(200).json(itineraries);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los itinerarios' });
        }
    },

    getItineraryById: async (req, res) => {
        const itineraryId = req.params.itineraryId;
        try {
            const itinerary = await Itinerary.findById(itineraryId);
            if (!itinerary) {
                return res.status(404).json({ error: 'Itinerario no encontrado' });
            }
            res.status(200).json(itinerary);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el itinerario' });
        }
    },

    createItinerary: async (req, res) => {
        const newItinerary = req.body;
        try {
            const itinerary = await Itinerary.create(newItinerary);
            res.status(201).json(itinerary);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el itinerario' });
        }
    },

    updateItinerary: async (req, res) => {
        const itineraryId = req.params.itineraryId;
        const updatedData = req.body;
        try {
            const itinerary = await Itinerary.findByIdAndUpdate(itineraryId, updatedData, { new: true });
            if (!itinerary) {
                return res.status(404).json({ error: 'Itinerario no encontrado' });
            }
            res.status(200).json(itinerary);
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el itinerario' });
        }
    },

    deleteItinerary: async (req, res) => {
        const itineraryId = req.params.itineraryId;
        try {
            const itinerary = await Itinerary.findByIdAndDelete(itineraryId);
            if (!itinerary) {
                return res.status(404).json({ error: 'Itinerario no encontrado' });
            }
            res.status(200).json({ message: 'Itinerario eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el itinerario' });
        }
    }
};

export default itinerariesController;

