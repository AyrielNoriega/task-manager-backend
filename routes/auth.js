const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'auth'
    })
});

module.exports = router;