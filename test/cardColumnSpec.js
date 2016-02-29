/* global require, Error */

var expect = require('chai').expect;
var BingoGame = require('../index')();
var shared = BingoGame.Shared;
var CardColumn = BingoGame.CardColumn;
var CardSlot = BingoGame.CardSlot;

var types;
var cardColumn;
var columns;

describe('The Column', function () {
    describe('constructor', function () {
        it('should throw an exception when no column type is passed', function () {
            expect(CardColumn).to.throw(shared.errors.missing_argument);
        });

        [
            ['Boolean', new Boolean()],
            ['Number', new Number()],
            ['Array', new Array()],
            ['Object', new Object()]
        ].forEach(function (test) {
            it('should throw a "' + shared.errors.missing_argument + '" exception when a ' + test[0] + ' is passed', function () {
                expect(function () {
                    return new CardColumn(test[1]);
                }).to.throw(shared.errors.missing_argument);
            });
        });
    });

    describe('Type', function () {
        it('should throw a "' + shared.errors.wrong_type + '" exception when a when a sting not [BINGO] is passed', function () {
            'acdefhjklmpqrstuvwxyz'.split('').forEach(function (str) {
                expect(function () {
                    CardColumn(str);
                }).to.throw(shared.errors.wrong_type);
            });
        });

        'BINGObingo'.split('').forEach(function (str) {
            it('should be of type ' + str.toUpperCase() + ' when ' + str + ' is passed', function () {
                cardColumn = new CardColumn(str);
                expect(cardColumn.getType()).to.be.equal(str.toUpperCase());
            });
        });
    });

    describe('Slots Array', function () {
        before(function () {
            columns = [];
            shared.types().forEach(function (type, index) {
                columns[index] = new CardColumn(type);
            });
        });
        it('should have an array of card slots objects', function () {
            columns.forEach(function (column) {
                expect(column.getCardSlots()).to.be.an('array');
                column.getCardSlots().forEach(function (card_slot) {
                    expect(card_slot).to.be.an.instanceof(CardSlot);
                });
            });
        });

        it('should have the 4 or 5 card slots depending on the type', function () {
            expect(columns).to.have.length(5);
            columns.forEach(function (column) {
                if ('BIGO'.indexOf(column.getType()) !== -1) {
                    expect(column.getCardSlots()).to.have.length(5);
                } else if (column.getType() === 'N') {
                    expect(column.getCardSlots()).to.have.length(4);
                } else {
                    throw(Error('Unkown column type'));
                }
            });
        });
    });

    describe('Numbers', function () {
        before(function () {
            columns = [];
            shared.types().forEach(function (type, index) {
                columns[index] = new CardColumn(type);
            });
        });
        it('should return an array of numbers', function () {
            expect(columns).to.have.length(5);
            var numbers = [];
            columns.forEach(function (column) {
                var column_numbers = [];
                column.getNumbers().forEach(function (number) {
                    expect(column.getType()).to.be.equal(shared.number2type(number));
                    column_numbers.push(number);
                });
                if (column.getType() === 'N') {
                    expect(column_numbers).to.have.length(4);
                } else {
                    expect(column_numbers).to.have.length(5);
                }
            });
        });

        it('should return true when activating an existing number', function () {
            expect(columns).to.have.length(5);
            columns.forEach(function (column) {
                column.getNumbers().forEach(function (number) {
                    expect(column.activateNumber(number)).to.be.true;
                });
            });
        });

        it('should return false when activating a non-existing number', function () {
            expect(columns).to.have.length(5);
            columns.forEach(function (column) {
                [0, -1, 100, 200].forEach(function (bad_number) {
                    expect(column.activateNumber(bad_number)).to.be.false;
                });
            });
        });
    });
});