const db = require('../database/models');
const {Op} = require('sequelize');
const getURL = (req) => `${req.protocol}://${req.get('host')}${req.originalUrl}`;
const getURLBase = (req) => `${req.protocol}://${req.get('host')}`;

module.exports = {
    list: (req, res) => {
        db.Movie.findAll({
            attributes: ['id', 'image', 'title', 'releaseDate'],
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

    create: (req, res) => {
        db.Movie.create({
            ...req.body,
        })
            .then((movieCreated) => {
                const response = {
                    status: 201,
                    meta: {
                        url: getURLBase(req) + `/characters/detail/${movieCreated.id}`,
                    },
                    message: 'Successfully created movie',
                    data: movieCreated,
                };
                res.status(201).json(response);
            })
            .catch((err) => {
                const response = {
                    status: 500,
                    msg: 'Error creating movie.',
                    error: err.message
                };
                res.status(500).json(response);
            });
    },

    update: (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                db.Movie.update(
                    {
                        image: req.body.image ? req.body.image : movie.image,
                        title: req.body.title ? req.body.title : movie.title,
                        releseDate: req.body.releseDate ? req.body.releseDate : movie.releseDate,
                        rating: +req.body.rating ? +req.body.rating : movie.rating,
                        genreId: +req.body.genreId ? +req.body.genreId : movie.genreId,
                    },
                    {
                        where: {
                            id: movie.id,
                        },
                    }
                )
                    .then((result) => {
                        const response = {
                            status: 200,
                            msg: 'Successfully updated movie!',
                            url: getURLBase(req) + `/characters/detail/${movie.id}`,
                        };

                        res.status(200).json(response);
                    })
                    .catch((err) => {
                        const response = {
                            status: 500,
                            msg: 'Error updating character.',
                            error: err.message
                        };
                        res.status(500).json(response);
                    });
            })
            .catch((err) => {
                const response = {
                    status: 400,
                    msg: 'The movie does not exist.',
                };
                res.status(400).json(response);
            });
    },

    remove: (req, res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then((result) => {
                const response = {
                    status: 200,
                    msg: `Movie successfully removed.`,
                };
                res.status(200).json(response);
            })
            .catch((err) => {
                const response = {
                    status: 500,
                    msg: `Error deleting the movie.`,
                };
                res.status(500).json(response);
            });
    },

    detail: (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [{association: 'genre'}, {association: 'character', attributes: ['id', 'name', 'age']}],
        })
            .then((movie) => {
                let response = {
                    status: 200,
                    meta: {
                        total: movie.length,
                        url: getURL(req),
                    },
                    image: movie.image ? `/images/movies/${movie.image}` : null,
                    data: movie,
                };
                res.json(response);
            })
            .catch((error) => res.send(error));
    },

    search: (req, res) => {
        db.Movie.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.substring]: req.params.keywords,
                        },
                    },
                    {
                        genreId: {
                            [Op.substring]: req.params.keywords,
                        },
                    },
                ],
            },
            include: ['genre'],
        })
            .then((result) => {
                let response = {
                    status: 200,
                    meta: {
                        total: result.length,
                        url: getURL(req),
                    },
                    data: result.length === 0 ? 'There is no result for your search' : result,
                };
                return res.status(200).json(response);
            })
            .catch((err) => res.send(err));
    },
};
