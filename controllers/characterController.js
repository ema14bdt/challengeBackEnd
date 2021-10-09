const db = require('../database/models');
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
            ...req.body,
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
                const response = {
                    status: 500,
                    msg: 'Error creating character.',
                    error: err.message
                };
                res.status(500).json(response);
            });
    },

    update: (req, res) => {
        db.Character.findByPk(req.params.id)
            .then((character) => {
                db.Character.update(
                    {
                        image: req.body.image ? req.body.image : character.image,
                        name: req.body.name ? req.body.name : character.name,
                        age: +req.body.age ? +req.body.age : character.age,
                        weight: +req.body.weight ? +req.body.weight : character.weight,
                        history: req.body.history ? req.body.history : character.history,
                    },
                    {
                        where: {
                            id: character.id,
                        },
                    }
                )
                    .then((result) => {
                        const response = {
                            status: 200,
                            msg: 'Successfully updated character!',
                            url: getURLBase(req) + `/characters/detail/${character.id}`,
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
                    msg: 'The character does not exist.',
                };
                res.status(400).json(response);
            });
    },

    remove: (req, res) => {
        db.Character.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then((result) => {
                const response = {
                    status: 200,
                    msg: `Character successfully removed.`,
                };
                res.status(200).json(response);
            })
            .catch((err) => {
                const response = {
                    status: 500,
                    msg: `Error deleting the character.`,
                };
                res.status(500).json(response);
            });
    },

    detail: (req, res) => {
        db.Character.findByPk(req.params.id, {
            include: [{association: 'movie', attributes: ['id', 'image', 'title', 'rating']}],
        })
            .then((character) => {

                const response = {
                    meta: {
                        status: 200,
                        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
    
                    },
                    image: character.image ? `/images/characters/${character.image}` : null,
                    data: character,
                };
                res.status(200).json(response);
            })
            .catch((err) => res.send(err));
    },

    search: (req, res) => {
        db.Character.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.substring]: req.params.keywords,
                        },
                    },
                    {
                        age: {
                            [Op.substring]: req.params.keywords,
                        },
                    },
                ],
            },
            include: ['movie'],
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
