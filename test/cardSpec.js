/* global require */

var expect = require('chai').expect;
var Card = require('../lib/card');
var CardSlot = require('../lib/card_slot');

var card;

describe('The Card', function () {
    describe('constructor', function () {
        before(function () {
            card = new Card();
        });

        it('should be instantiable', function () {
            expect(card).to.be.an.instanceof(Card);
        });
        
        it('should have 24 slots', function () {
            expect(card.slots).to.have.length(24);
        });
        
        it('should have an array of card slot objects', function () {
            card.slots.forEach(function (slot) {
                expect(slot).to.be.an.instanceof(CardSlot);
            });
        });
    });

    describe('when initializing', function () {
        
    });
});