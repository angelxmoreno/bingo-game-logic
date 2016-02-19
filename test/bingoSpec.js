/* global require */

var expect = require('chai').expect;
var Bingo = require('../lib/bingo.js');

describe('Bingo', function () {
    it('should be instantiable', function () {
        var bingo = new Bingo();
        expect(bingo).to.be.an('object');
    });
});