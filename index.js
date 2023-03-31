// підключаємо компілятор Babel
require('babel-register') ({
    presets: [ 'env' ]
})

// підключаємо серверну частину
module.exports = require("./server4.js")