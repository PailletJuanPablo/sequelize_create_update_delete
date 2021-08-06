const db = require('../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': (req, res) => {

        Modelo
        db.Genre.findAll()
            // Salio bien la promesa
            .then(genres => {
                res.render('genresList.ejs', {genres})
            })
            // Salio mal
            .catch(error => {
                return res.send('Ocurrió un error')
            })
            
    },
    'detail': (req, res) => {
        db.Genre.findByPk(req.params.id)
            .then(genre => {
                res.render('genresDetail.ejs', {genre});
            });
    }

}

module.exports = genresController;