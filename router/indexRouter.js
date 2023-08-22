import { Router } from "express";
import cityController from '../controllers/citiesController.js';

const indexRouter = Router();

// Ruta de bienvenida
indexRouter.get('/', (request, response) => {
    response.send('Bienvenidos al 3000 en /api');
});

// Rutas  ciudades
indexRouter.get('/cities', cityController.getAllCities);
indexRouter.get('/cities/:id', cityController.getCityById);
indexRouter.post('/cities', cityController.createCity);
indexRouter.put('/cities/:id', cityController.updateCity);
indexRouter.delete('/cities/:id', cityController.deleteCity);



export default indexRouter;
