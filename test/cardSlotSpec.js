/* global require */

var expect = require('chai').expect;
var constants = require('../lib/constants');
var CardSlot = require('../lib/card_slot');
var cardSlot;
var numIterations = 1000;
describe('The Card Slot', function () {
    describe('constructor', function () {
        it('should throw an exception when no column type is passed', function () {
            expect(CardSlot).to.throw(constants.errors.missing_argument);
        });

        [
            ['Boolean', new Boolean()],
            ['Number', new Number()],
            ['Array', new Array()],
            ['Object', new Object()]
        ].forEach(function (test) {
            it('should throw a "' + constants.errors.missing_argument + '" exception when a ' + test[0] + ' is passed', function () {
                expect(function () {
                    return new CardSlot(test[1]);
                }).to.throw(constants.errors.missing_argument);
            });
        });
    });

    describe('Type', function () {
        it('should throw a "' + constants.errors.wrong_type + '" exception when a when a sting not [BINGO] is passed', function () {
            'acdefhjklmpqrstuvwxyz'.split('').forEach(function (string) {
                expect(function () {
                    CardSlot(string);
                }).to.throw(constants.errors.wrong_type);
            });
        });

        'BINGObingo'.split('').forEach(function (str) {
            it('should be of type ' + str.toUpperCase() + ' when ' + str + ' is passed', function () {
                cardSlot = new CardSlot(str);
                expect(cardSlot.getType()).to.be.equal(str.toUpperCase());
            });
        });
    });

    describe('State', function () {
        cardSlot = new CardSlot('b');
        it('should have an initial state of false', function () {
            expect(cardSlot.getState()).to.be.false;
        });

        it('should set state to true when activated', function () {
            cardSlot.activate();
            expect(cardSlot.getState()).to.be.true;
        });

        it('should set state to false when deactivated', function () {
            cardSlot.deactivate();
            expect(cardSlot.getState()).to.be.false;
        });
    });

    describe('Number', function () {
        'bingo'.split('').forEach(function (str) {
            cardSlot = new CardSlot(str);
            var min = constants.ranges[cardSlot.getType()].min;
            var max = constants.ranges[cardSlot.getType()].max;

            it('should have a number within ' + min + ' and ' + max + ' when the type is ' + cardSlot.getType(), function () {
                for (var i = 0; i < numIterations; i++) {
                    var testSlot = new CardSlot(str);
                    expect(testSlot.getNumber()).to.be.within(min, max);
                }
            });
        });
    });
});