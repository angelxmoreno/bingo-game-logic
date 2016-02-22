/* global require */

var shared = require('../lib/shared');
var expect = require('chai').expect;
var Card = require('../lib/card');
var CardColumn = require('../lib/card_column');

var card;

describe('The Card', function () {
    beforeEach(function () {
        card = new Card();
    });
    describe('constructor', function () {
        it('should be instantiable', function () {
            expect(card).to.be.an.instanceof(Card);
        });

        it('should have 24 slots', function () {
            expect(card.getCardSlots()).to.have.length(24);
        });

        it('should have 24 unique numbers', function () {
            var numbers = card.getNumbers();
            expect(numbers).to.have.length((new Set(numbers)).size);
        });

        it('should have 1 column object of each type', function () {
            expect(Object.keys(card.getCardColumns())).to.have.length(5);
            expect(card.getCardColumns()).to.have.all.keys('BINGO'.split(''));
        });

    });

    describe('Numbers', function () {
        it('should allow the activation of numbers and return true', function () {
            card.getNumbers().forEach(function (number) {
                expect(card.activateNumber(number)).to.be.true;
            });
        });

        it('should return false when activating a non-existing number', function () {
            var numbers = card.getNumbers();
            for (var i = 1; i >= 90; i++) {
                if (numbers.indexOf(i) === -1) {
                    expect(card.activateNumber(i)).to.be.true;
                } else {
                    expect(card.activateNumber(i)).to.be.false;
                }
            }
        });

        it('should throw an error activating a number less than 1 or higher than 90', function () {
            for (var i = 0; i > -999; i--) {
                expect(function () {
                    card.activateNumber(i);
                }).to.throw(shared.errors.number_out_of_range);
            }

            for (var i = 91; i < 999; i++) {
                expect(function () {
                    card.activateNumber(i);
                }).to.throw(shared.errors.number_out_of_range);
            }
        });
    });

    describe('Winning', function () {
        it('should know when a player has won', function () {
            shared.winnings.forEach(function (pattern) {
                //reset the card
                card = new Card();
                var numbers = card.getNumbers();
                pattern.forEach(function(target_index){
                    //activate spesific slots
                    expect(card.didWin()).to.be.false;
                    card.activateNumber(numbers[target_index]); 
                });
                expect(card.didWin()).to.be.true;
            });
        });
    });
});