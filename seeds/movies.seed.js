

  const mongoose = require('mongoose');

// Imporatmos el modelo Pet en este nuevo archivo.
const Movie = require('../models/Movie.js');

const movies = [
  {
    title: 'The Matrix',
    director: 'Hermanas Wachowski',
    year: 1999,
    genre: 'Acción',
  },
  {
    title: 'The Matrix Reloaded',
    director: 'Hermanas Wachowski',
    year: 2003,
    genre: 'Acción',
  },
  {
    title: 'Buscando a Nemo',
    director: 'Andrew Stanton',
    year: 2003,
    genre: 'Animación',
  },
  {
    title: 'Buscando a Dory',
    director: 'Andrew Stanton',
    year: 2016,
    genre: 'Animación',
  },
  {
    title: 'Interestelar',
    director: 'Christopher Nolan',
    year: 2014,
    genre: 'Ciencia ficción'
  },
  {
    title: '50 primeras citas',
    director: 'Peter Segal',
    year: 2004,
    genre: 'Comedia romántica',
  },
];

const characterDocuments = movies.map(movie => new Movie(movie));

mongoose
    .connect('mongodb+srv://jaelespinosa:66846684Ant@cluster0.cjzw5.mongodb.net/movies?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        // Utilizando Character.find() obtendremos un array con todos los personajes de la db
        const allCharacters = await Movie.find();

        // Si existen personajes previamente, dropearemos la colección
        if (allCharacters.length) {
            await Movie.collection.drop(); //La función drop borra la colección
        }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        // Una vez vaciada la db de los personajes, usaremos el array characterDocuments
        // para llenar nuestra base de datos con todas los personajes.
        await Movie.insertMany(characterDocuments);
    })
    .catch((err) => console.log(`Error creating data: ${err}`))
    // Por último nos desconectaremos de la DB.
    .finally(() => mongoose.disconnect());
