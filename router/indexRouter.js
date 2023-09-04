import { Router } from "express";
import cityController from '../controllers/citiesController.js';
import itineraryController from '../controllers/itinerariesController.js'; 

const indexRouter = Router();


indexRouter.get('/', (request, response) => {
    response.send('Bienvenidos al 3000 en /api');
});


indexRouter.get('/cities', cityController.getAllCities);
indexRouter.get('/cities/:id', cityController.getCityById);
indexRouter.post('/cities', cityController.createCity);
indexRouter.put('/cities/:id', cityController.updateCity);
indexRouter.delete('/cities/:id', cityController.deleteCity);


indexRouter.get('/itineraries', itineraryController.getAllItineraries);
indexRouter.get('/itineraries/:cityId', itineraryController.getItinerariesByCity);
indexRouter.get('/itineraries/:itineraryId', itineraryController.getItineraryById);
indexRouter.post('/itineraries', itineraryController.createItinerary);
indexRouter.put('/itineraries/:itineraryId', itineraryController.updateItinerary);
indexRouter.delete('/itineraries/:itineraryId', itineraryController.deleteItinerary);

export default indexRouter;

