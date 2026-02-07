const express = require('express');
const { Sequelize } = require('sequelize');
const createUserModel = require('./models/users');
const cors = require('cors');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cors());

// variables de entorno
const DB_HOST = process.env.DB_HOST || 'localhost'; // depende del nombre del container
const DB_NAME = process.env.DB_NAME || 'demo_db'; // nombre de la db
const DB_USER = process.env.DB_USER || 'demo_user'; // usuario de la db
const DB_PASSWORD = process.env.DB_PASSWORD || 'demo_pass'; // contraseña de la db
const DB_PORT = process.env.DB_PORT || 3306; // puerto por defecto de MySQL


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const User = createUserModel(sequelize);

async function startApi() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1);
    }


    // rutas del api

    // listar todos los usuarios
    app.get('/users', async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({
                error: error.message
            })
        }
    });


    // iniciar el server

    app.listen(PORT, () => {
        console.log(`API escuchando en el puerto ${PORT}`);
    });
}

startApi();