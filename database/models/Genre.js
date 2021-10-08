

module.exports = (sequelize,dataTypes) =>{

    const alias = "Genre";

    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        image : {
            type : dataTypes.STRING(100),
            defaultValue: null,
        }

    };

    const config = {
        timestamps : false,
    };

    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = (models) =>{
        Genre.hasMany(models.Movie,{
            as : "movie",
            foreignKey : "genreId"
        }) 
    }

    return Genre
}