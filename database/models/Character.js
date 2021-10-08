module.exports = (sequelize, dataTypes) => {
    const alias = 'Character';

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
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: dataTypes.DECIMAL(5, 2),
            defaultValue: null,
        },
        history: {
            type: dataTypes.STRING(765),
            allowNull: false,
        },
    };

    const config = {
        timestamps: false,
    };

    const Character = sequelize.define(alias, cols, config);

    Character.associate = (models) => {
        Character.belongsToMany(models.Movie, {
            as: 'movie',
            through: 'charactermovie',
            foreignKey: 'characterId',
            otherKey: 'movieId',
        });
    };

    return Character;
};
