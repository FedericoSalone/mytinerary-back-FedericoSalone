
import Activities from "../Models/Acitivies.js";

const activitiesControllers = {
    getActivitiesOfItineraryId: async (req, res) => {
        const id = req.params.id;
        try {
            const activities = await Activities.findOne({ itineraryRelated: id });
            res.json({ success: true, response: activities || [] });
        } catch (error) {
            res.json({ success: false, response: "Error obteniendo actividades" });
        }
    },
    postActivity: async (req, res) => {
        try {
            const activity = await new Activities(req.body).save();
            res.json({ success: true, response: activity });
        } catch (error) {
            res.json({ success: false, response: "Error al publicar actividades" });
        }
    },
    getAllActivities: async (req, res) => {
        try {
            const allActivities = await Activities.find();
            res.json({ success: true, response: allActivities });
        } catch (error) {
            res.json({ success: false, response: "Error obteniendo actividades" });
        }
    }
};

export default activitiesControllers;
