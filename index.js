/* global require, module */

var upperCamelCase = require('uppercamelcase');
module.exports = function (lib_path) {
    lib_path = lib_path || process.env.bingo_lib || './lib/';
    var exports = {};
    [
        'shared',
        'bingo',
        'card',
        'card_column',
        'card_slot',
        'number_picker',
        'player'
    ].forEach(function (module) {
        exports[upperCamelCase(module)] = require(lib_path + module);
    });
    return exports;
};