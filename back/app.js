import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
//Para acceder al directorio actual
import path from 'path';

const app = express()

//Conexion a DB
const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/ashappy";

//Conexion en la Nube
//const mongoose = require('mongoose');
//const uri = "mongodb+srv://user_asshappy:sHxlodPc7LilB2R9@cluster0.hzbei.mongodb.net/asshappy?retryWrites=true&w=majority";



const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
    
} 
mongoose.connect(uri, options).then(
    () => { 
        console.log('conectado a mongoDB')
     },
    err => {  err }
  );

mongoose.set('useCreateIndex', true);

app.use(morgan('tiny'));
app.use(cors())
app.use(express.json());
//Aplicaciones / x-www-form-unLencoded
app.use(express.urlencoded({extended: true}));

//rutas
//app.get('/', (req, res) => {
//    res.send('Hello World!');
//  })

app.use('/api', require('./routes/tareas'));
app.use('/api', require('./routes/user'));
app.use('/api/login', require('./routes/login'))


//Middelware para vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));


app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function() {
    console.log('Escuchando en el puerto', app.get('puerto'));
})