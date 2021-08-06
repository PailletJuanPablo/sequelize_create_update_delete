const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movie = db.Movie;

const moviesController = {
    'list': async (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', { movies })
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', { movie });
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', { movies });
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: { [db.Sequelize.Op.gte]: 8 }
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {


                res.render('recommendedMovies.ejs', { movies });
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd.ejs');
    },
    create: async function (req, res) {
        // Recibo los datos del formulario completado en la petición
        // req.body == { name: valor, rating: valor }

        try {
            const peliculaCreada = await Movie.create(req.body)
            return res.send(peliculaCreada);
        } catch (error) {
            console.log(error);
            return res.send('Hubo un error')
        }

    },
    edit: async function (req, res) {
        // 1) Busco los datos de la movie
        // 2) Renderizo vista de edición con esos datos
        const movieToEdit = await Movie.findByPk(req.params.id);

        return res.render('moviesEdit', { Movie: movieToEdit })

    },
    update: async function (req, res) {

        const movieActualizada = await Movie.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );
        return res.send(movieActualizada)

    },
    delete: function (req, res) {
        // TODO
    },
    destroy: async function (req, res) {
       
        await Movie.destroy({where: {id: req.params.id}})
    }

}

module.exports = moviesController;