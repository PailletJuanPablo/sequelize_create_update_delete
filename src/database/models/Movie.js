module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        awards: {
            type: dataTypes.INTEGER
        },
        release_date: {
            type: dataTypes.DATE
        },
        genre_id: {
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'movies',
        timestamps: false
    };
    const Movie = sequelize.define(alias, cols, config);

    // Relaciones de SQL == Asociaciones en sequelize

    Movie.associate = function(models) {

        Movie.belongsTo(
            models.Genre, 
            {
                foreignKey: 'genre_id',
                as: 'genre'
            }
        );

        // movie.genre() == datos del genero que tiene esa movie

        Movie.belongsToMany(
            models.Actor, 
            {
                through: 'actor_movie',
                otherKey: 'actor_id',
                foreignKey: 'movie_id',
                as: 'actors',
                timestamps: false
            }
        );

    }

    return Movie
}