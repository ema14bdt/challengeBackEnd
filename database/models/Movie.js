module.exports = (sequelize, dataTypes) => {
    const alias = 'Movie';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING(100),
            defaultValue: null,
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        releaseDate: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        genreId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    const config = {
        timestamps: false,
    };

    const Movie = sequelize.define(alias, cols, config);

    Movie.associate = (models) => {
        Movie.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genreId',
        });

        Movie.belongsToMany(models.Character, {
            as: 'character',
            through: 'charactermovie',
            foreignKey: 'movieId',
            otherKey: 'characterId',
        });
    };

    return Movie;
};
