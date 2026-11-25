const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('./pages/main.page.ejs', {

    });
});

module.exports = router;