module.exports = (sequelize, dataTypes) => {
    let alias = 'Genre';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        ranking: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'genres',
        timestamps: false
    };
    const Genre = sequelize.define(alias, cols, config);

    Genre.associate = function (models) {

        Genre.hasMany(models.Movie,
            {
                foreignKey: 'genre_id',
                as: 'movies'
            }
        );

        // genre.movies() == array con todas las movies asociadas al genero

    }

    return Genre
}