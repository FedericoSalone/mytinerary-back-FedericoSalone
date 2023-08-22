import mongoose from "mongoose";



mongoose.connect('mongodb+srv://fedesalone:fedesalone1@cluster0.v2aysw0.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch(error => console.error('Error de conexión:', error));