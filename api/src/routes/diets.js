const { Router } = require('express');
const router = Router();
const { Diet } = require('../db');

router.get("/", async (req, res, next) => {
    try {

        let dietDB = await Diet.findAll();
        res.status(200).send(dietDB);
        
    } catch (error) {
        next(error);
    };
});

module.exports = router;
