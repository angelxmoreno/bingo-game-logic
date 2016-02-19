/* global require */

var expect = require('chai').expect;
var CardSlot = require('../lib/card_slot');

var card_slot;

describe('The Card Slot', function () {
    describe('constructor', function () {
        before(function () {
            card_slot = new CardSlot();
        });

        it('should be instantiable', function () {
            expect(card_slot).to.be.an.instanceof(CardSlot);
        });

        it('should have valid Column name', function () {
            expect(card_slot).to.have.ownProperty('column_name');
            expect(card_slot.column_name).to.contain.any.keys(['B', 'I', 'N', 'G', 'O']);
        });

    });

    describe('when initializing', function () {

    });
});