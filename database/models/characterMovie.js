module.exports = (sequelize, dataTypes) => {
    const alias = 'charactermovie';

    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        characterId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        movieId: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
    };

    const config = {
        timestamps: false,
        tableName: 'charactermovie',
    };

    const charactermovie = sequelize.define(alias, cols, config);

    return charactermovie;
};
