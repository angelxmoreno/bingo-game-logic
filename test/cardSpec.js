/* global require */

var expect = require('chai').expect;
var Card = require('../lib/card');

var card;

describe('Card', function () {
    describe('constructor', function () {
        before(function () {
            card = new Card();
        });

        it('should be instantiable', function () {
            expect(card).to.be.an.instanceof(Card);
        });

    });

    describe('initializing', function () {
        
    });
});