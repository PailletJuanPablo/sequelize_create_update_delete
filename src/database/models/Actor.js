module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.INTEGER
        },
        rating: {
            type: dataTypes.DOUBLE
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER,
        }
    };
    let config = {
        tableName: 'actors',
        timestamps: false
    };
    const Actor = sequelize.define(alias, cols, config);

    // Relaciones de SQL == Asociaciones en sequelize

    Actor.associate = function(models) {

        Actor.belongsToMany(
            models.Movie, 
            {
                through: 'actor_movie',
                foreignKey: 'actor_id',
                otherKey: 'movie_id',
                as: 'movies',
                timestamps: false

            }
        );

        // movie.genre() == datos del genero que tiene esa movie

    }

    return Actor
}