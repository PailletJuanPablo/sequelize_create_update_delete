const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {

        
        db.Genre.findAll(
            {
                include: [
                    { model: db.Movie, as: 'movies', attributes: ['title'] }
                  ]
            }
        )
            // Salio bien la promesa
            .then(genres => {
                return res.json(genres)
                res.render('genresList.ejs', {genres})
            })
            // Salio mal
            .catch(error => {
                console.log(error)
                return res.send('Ocurrió un error')
            })
            
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id, {
            include: ['movies']
        })
            .then(genre => {
                return res.json(genre)
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;