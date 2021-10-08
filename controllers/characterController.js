const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const {Op} = require('sequelize');
const getURL = (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = (req) => `${req.protocol}://${req.get('host')}`;

module.exports = {
    list: (req, res) => {
        db.Character.findAll()
            .then((characters) => {
                let response = {
                    status: 200,
                    meta: {
                        length: characters.length,
                        url: getURL(req),
                    },
                    data: characters,
                };
                res.json(response);
            })
            .catch((error) => res.send(error));
    },

    create: (req, res) => {
        db.Character.create({
            ...req.body
        })
            .then((characterCreated) => {
                const response = {
                    status: 201,
                    msg: 'Successfully created character!',
                    url: getURLBase(req) + `/characters/detail/${characterCreated.id}`,
                };
                res.status(201).json(response);
            })
            .catch((err) => {
                req.file ? fs.unlinkSync(path.join(__dirname, '..', 'uploads', 'characters', req.file.filename)) : null;

                const response = {
                    status: 500,
                    msg: 'internal server error',
                };

                console.log(err);
                res.status(500).json(response);
            });
    },

    detail: (req, res) => {
        db.Character.findByPk(req.params.id, {
            include: [{association: 'movie', attributes: ['id', 'image', 'title', 'rating']}],
        })
            .then((character) => {
                /*character.movie.forEach((mov) => (mov.image = `${req.protocol}://${req.get('host')}/movies/${movie.image}`));
                character.dataValues.movie.forEach((mov) => {
                    mov.dataValues.characterMovie = undefined;
                    mov.dataValues.url = `${req.protocol}://${req.get('host')}/movies/${movie.id}`;
                    mov.dataValues.id = undefined;
                }); */

                const response = {
                    meta: {
                        status: 200,
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
                        moviesQuantity: character.movie.length,
                    },
                    image: character.image ? `${req.protocol}://${req.get('host')}/characters/${character.image}` : null,
                    character: character,
                };
                res.status(200).json(response);
            })
            .catch((err) => res.send(err));
    },
};
