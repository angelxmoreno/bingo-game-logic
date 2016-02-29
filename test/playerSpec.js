/* global require */

var expect = require('chai').expect;
var BingoGame = require('../index')();
var shared = BingoGame.Shared;
var Player = BingoGame.Player;
var Card = BingoGame.Card;

var player_name = 'John Doe';
var player_alias = 'Doe John Alias';
var namedPlayer;
var unNamedPlayer;

describe('A Player', function () {
    beforeEach(function () {
        unNamedPlayer = new Player();
        namedPlayer = new Player(player_name);
        aliasedPlayer = new Player(player_name, player_alias);
    });
    describe('constructor', function () {
        it('should have a name property if passed', function () {
            [
                [unNamedPlayer, null, null],
                [namedPlayer, player_name, null],
                [aliasedPlayer, player_name, player_alias],
            ].forEach(function (details) {
                expect(details[0].getName()).to.equals(details[1]);
                expect(details[0].getAlias()).to.equals(details[2]);
            });


//            expect(namedPlayer)
//            .to.have.property('name')
//            .that.is.a('string')
//            .and.to.equal(player_name)
//            .and.have.property('alias')
//            .that.is.null;
//            
//            expect(namedPlayer)
//            .to.have.property('name')
//            .that.is.a('string')
//            .and.to.equal(player_name)
//            .and.have.property('alias')
//            .to.equal(player_alias)
        });

        it('should start a player no bingo card', function () {
            expect(unNamedPlayer.getCards()).to.have.length(0);
            expect(namedPlayer.getCards()).to.have.length(0);
        });
    });

    describe('picking cards', function () {
        it('should allow a player to pick a bingo card', function () {
            namedPlayer.pickCard();
            expect(namedPlayer.getCards()).to.have.length(1);
            expect(namedPlayer.getCards()[0]).to.be.an.instanceof(Card);
        });

        it('should limit the number of cards to 10', function () {
            for (var i = 0; i < 100; i++) {
                if (i < 10) {
                    expect(namedPlayer.getCards()).to.have.length(i);
                    expect(namedPlayer.pickCard()).to.be.an.instanceof(Card);
                } else {
                    expect(namedPlayer.getCards()).to.have.length(10);
                    expect(function () {
                        namedPlayer.pickCard();
                    }).to.throw(shared.errors.max_cards_player);
                }
            }
        });

        it('should allow the user trash his cards', function () {
            for (var i = 0; i < 10; i++) {
                expect(namedPlayer.getCards()).to.have.length(i);
                namedPlayer.pickCard();
            }
            namedPlayer.trashCards();
            expect(namedPlayer.getCards()).to.have.length(0);
        });

        it('should allow the user reset his cards', function () {
            //get 10 cards
            for (var i = 0; i < 10; i++) {
                namedPlayer.pickCard();
            }

            //every slot in every card should have a state of inactivate
            namedPlayer.getCards().forEach(function (card) {
                card.getCardSlots().forEach(function (cardSlot) {
                    expect(cardSlot.getState()).to.be.false;
                });
            });

            //foreach card, activate all numbers
            namedPlayer.getCards().forEach(function (card) {
                card.getNumbers().forEach(function (number) {
                    namedPlayer.activateNumber(number);
                });
            });

            //now, every slot in every card should have a state of active
            namedPlayer.getCards().forEach(function (card) {
                card.getCardSlots().forEach(function (cardSlot) {
                    expect(cardSlot.getState()).to.be.true;
                });
            });

            namedPlayer.resetCards();

            //finally, every slot in every card should once again have a state
            // of inactive
            namedPlayer.getCards().forEach(function (card) {
                card.getCardSlots().forEach(function (cardSlot) {
                    expect(cardSlot.getState()).to.be.false;
                });
            });
        });
    });

    describe('playing the game', function () {
        it('should allow the activation of numbers across all cards', function () {
            var dict = {};
            var sum = 0;
            var actives = 0;
            for (var i = 0; i < 10; i++) {
                namedPlayer.pickCard().getNumbers().forEach(function (number) {
                    dict = (dict[number] === undefined) ? 0 : dict[number] + 1;
                });
            }

            Object.keys(dict).forEach(function (number) {
                namedPlayer.activateNumber(number);
                sum += dict[number];
                actives = 0;
                namedPlayer.getCards().forEach(function (card) {
                    card.getCardSlots().forEach(function (slot) {
                        actives = (slot.getState()) ? actives + 1 : actives;
                    });
                });
                expect(sum).to.equal(actives);
            });
        });

        it('should know when a player won', function () {
            shared.winnings.forEach(function (pattern) {
                namedPlayer.trashCards();
                var card = namedPlayer.pickCard();
                var numbers = card.getNumbers();
                pattern.forEach(function (target_index) {
                    //activate spesific slots
                    expect(namedPlayer.didWin()).to.be.false;
                    card.activateNumber(numbers[target_index]);
                });
                expect(namedPlayer.didWin()).to.be.true;
            });
        });

    });
});