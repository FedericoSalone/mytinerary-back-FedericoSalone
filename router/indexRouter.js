import { Router } from "express";
import cityController from '../controllers/citiesController.js';
import itineraryController from '../controllers/itinerariesController.js';
import activitiesControllers from '../controllers/activiesController.js';
import { signUp, signIn, signInToken, updateUser, deleteUser } from '../controllers/userController.js';
import passort from "../validators/passort.js";

const indexRouter = Router();

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

indexRouter.get('/activities', activitiesControllers.getAllActivities);
indexRouter.get('/activities/:id', activitiesControllers.getActivitiesOfItineraryId);
indexRouter.post('/activities', activitiesControllers.postActivity);

indexRouter.post("/signup", signUp); 
indexRouter.post("/signin", signIn);
indexRouter.get('/signin/token', passort.authenticate('jwt', { session: false }), signInToken);
indexRouter.put('/update', passort.authenticate('jwt', { session: false }), updateUser);
indexRouter.delete('/delete', passort.authenticate('jwt', { session: false }), deleteUser);

export default indexRouter;








