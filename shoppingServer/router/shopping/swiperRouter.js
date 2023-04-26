const express = require('express');

const { port } = require('../../config/app.config');

const router = express.Router();

router.get('', (req, res)=>{
    res.redirect(`http://127.0.0.1:${port}/good`);
});

module.exports = router;