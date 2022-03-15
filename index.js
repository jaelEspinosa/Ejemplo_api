const express = require("express");
const {connect} = require('./utils/db')

connect();
PORT=5000;



const server = express();

server.use(express.json());

server.use(express.urlencoded({ extended: false }));

const Movie = require('./models/Movie');
const router = express.Router();





router.get('/movies', async (req,res)=>{
    try{
        const movies = await Movie.find();
        return res.status(200).json(movies)
    }catch{
        return res.status(500).json(err);
    }
});

router.post('/movies', async (req,res,next)=>{
    try{
        const newMovie = new Movie({
            title: req.body.title,
            director : req.body.director,
            year: req.body.year,
            genre: req.body.genre,
        });
        const createdMovie = await newMovie.save();
        return res.status(201).json(createdMovie)
    }catch (error){
        next(error)
    }
});

router.get('/movies/:id', async (req,res)=>{
    const id= req.params.id
    try{
        const movies = await Movie.findById(id);
        return res.status(200).json(movies)
    }catch{
        return res.status(500).json(err);
    }
});


router.get('/movies/:title', async (req,res)=>{
    const title = req.params.title
      
    try{
        const movies = await Movie.find({title});
        return res.status(200).json(movies)
    }catch{
        return res.status(500).json(err);
    }
});

router.get('/movies/genre:genre', async (req,res)=>{
    const genre = req.params.genre
      
    try{
        const movies = await Movie.find({genre});
        return res.status(200).json(movies)
    }catch{
        return res.status(500).json(err);
    }
});

router.get('/movies/year/:year', async (req,res)=>{
    const year = req.params.year
      
    try{
        const movies = await Movie.find({$gt:year});
        return res.status(200).json(movies)
    }catch{
        return res.status(500).json(err);
    }
});










server.use('/', router);



server.listen(PORT, ()=>{
    console.log (`Node server listening on http://localhost:${PORT}`)
})