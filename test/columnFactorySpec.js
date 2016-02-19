/* global require, Error */

var expect = require('chai').expect;
var CardColumn = require('../lib/card_column');
var CardSlot = require('../lib/card_slot');

var types;
var card_column;
var columns;
describe('The Column Factory', function () {
    describe('constructor', function () {
        it('should be instantiable', function () {
            expect(new CardColumn('B')).to.be.an.instanceof(CardColumn);
        });

        it('should throw an exception when no column type is passed', function () {
            expect(new CardColumn()).to.throw(Error);
        });
    });

    describe('when initializing', function () {
        before(function () {
            types = ['B', 'I', 'N', 'G', 'O'];
            columns = [];
            types.forEach(function (type, index) {
                columns[index] = new CardColumn(type);
            });
        });

        it('should have the type passed', function () {
            columns.forEach(function (column, index) {
                expect(column).to.have.ownProperty('type');
                expect(column.type).to.be(types[index]);
            });
        });

        it('should have the an array of card slots objects', function () {
            columns.forEach(function (column) {
                expect(column).to.have.ownProperty('card_slots');
                expect(column.card_slots).to.be.an('array');
                column.card_slots.forEach(function (card_slot) {
                    expect(card_slot).to.be.an.instanceof(CardSlot);
                });
            });
        });

        it('should have 5 card slots if the type is B,I,G or O', function () {
            columns.forEach(function (column) {
                if (['B', 'I', 'G', 'O'].indexOf(column.type) !== -1) {
                    expect(column.card_slots).to.have.length(5);
                }
            });
        });

        it('should have 4 card slots if the type is N', function () {
            columns.forEach(function (column) {
                if (column.type === 'N') {
                    expect(column.card_slots).to.have.length(4);
                }
            });
        });
    });
});