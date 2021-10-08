const db = require('../database/models');
const fs = require('fs');
const path = require('path');
const {Op} = require('sequelize');
const getURL = (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = (req) => `${req.protocol}://${req.get('host')}`;

module.exports = {
    list: (req, res) => {
        db.Movie.findAll({
            include: ['genre'],
        })
            .then((movies) => {
                let response = {
                    status: 200,
                    meta: {
                        length: movies.length,
                        url: getURL(req),
                    },
                    data: movies,
                };
                res.json(response);
            })
            .catch((error) => res.send(error));
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [{association: 'genre'}, {association: 'character'}],
        })
            .then((movie) => {
                let response = {
                    status: 200,
                    meta: {
                        total: movie.length,
                        url: getURL(req),
                    },
                    data: movie,
                };
                res.json(response);
            })
            .catch((error) => res.send(error));
    },
    create: (req, res) => {
        db.Movie.create({
            image: req.body.image,
            title: req.body.title,
            releaseDate: req.body.releaseDate,
            rating: +req.body.rating,
            genreId: +req.body.genreId,
        })
            .then((movie) => {
                const response = {
                    status: 200,
                    meta: {
                        url: getURLBase(req) + '/movies' + movie.id,
                    },
                    message : 'Successfully created movie',
                    data: movie,
                };
                res.json(response);
            })
            .catch((error) => res.send(error));
    },
};
