const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

/**
 * 读取访问记录
 */
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../logging.txt');
    fs.readFile(filePath, 'utf-8', (error, data) => {
        if (error)
            throw error;
        res.send(data);
    })
})

module.exports = router;