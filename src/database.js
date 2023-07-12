const mongoose = require('mongoose')

const {GRADE_LIST_MONGODB_HOST, GRADE_LIST_MONGODB_DATABASE} = process.env;
const MONGO_URI = `mongodb://${GRADE_LIST_MONGODB_HOST}/${GRADE_LIST_MONGODB_DATABASE}` 

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

    //Recibir la cadena de conexión y mostrar un mensaje por consola
    .then(db => console.log('Database is online'))
    .catch(err => console.log(err))