/* global require */

var expect = require('chai').expect;
var BingoGame = require('../index')();
var shared = BingoGame.Shared;
var Bingo = BingoGame.Bingo;
var Player = BingoGame.Player;

var bingo;
var config = [
    {
        name: 'John Jones',
        cards: 1
    },
    {
        name: 'Clark Kent'
    },
    {
        cards: 3
    }
];
describe('The Bingo Game', function () {
    describe('constructor', function () {
        beforeEach(function () {
            bingo = new Bingo();
        });

        it('should be instantiable', function () {
            expect(bingo).to.be.an.instanceof(Bingo);
        });

        it('should default to 2 player objects', function () {
            expect(bingo.getPlayers()).to.have.length(2);
        });
    });

    describe('players', function () {
        beforeEach(function () {
            bingo = new Bingo(config);
        });

        it('should have the same number of players passed', function () {
            expect(bingo.getPlayers()).to.have.length(config.length);
        });

        it('should have aliases for each player', function () {
            for (var i = 0; i < bingo.getPlayers().length; i++) {
                var player = bingo.getPlayer(i);
                expect(player).to.be.an.instanceof(Player);
                expect(player.getAlias()).to.equal('Player #' + (i + 1));
            }
        });

        it('should know the names of players when given', function () {
            bingo.getPlayers().forEach(function (player2, index) {
                var player1 = bingo.getPlayer(index);
                var expected_name = (config[index].name) ? config[index].name : 'Player #' + (index + 1);

                expect(player1).to.be.an.instanceof(Player);
                expect(player2).to.be.an.instanceof(Player);
                expect(player1).to.equal(player2);

                expect(player1.getName())
                .to.be.a('string')
                .and.equal(expected_name);
            });
        });
    });
    describe('picking', function () {
        beforeEach(function () {
            bingo = new Bingo();
        });
        describe('getPicked()', function () {
            it('should return all picked objects', function () {
                for (var i = 0; i < 90; i++) {
                    expect(bingo.getPicked()).to.have.length(i);
                    bingo.pick();
                }
                expect(bingo.getPicked()).to.have.length(90);
            });
        });

        describe('getPickedNumbers()', function () {
            it('should return all picked numbers', function () {
                for (var i = 0; i < 90; i++) {
                    bingo.pick();
                }
                expect(bingo.getPickedNumbers()).to.have.members(Array(90).fill(0).map((e, i) => i + 1));
            });
        });

        describe('pick()', function () {
            it('should return a picked object', function () {
                for (var i = 0; i < 90; i++) {
                    var picked = bingo.pick();

                    expect(picked)
                    .to.have.property('number')
                    .that.is.a('number')
                    .and.to.be.within(1, 90);

                    expect(picked)
                    .to.have.property('type')
                    .that.is.a('string')
                    .and.to.be.oneOf('BINGO'.split(''));
                }
            });

            it('should pick a number not picked before', function () {
                var before, after, picked;
                for (var i = 1; i <= 90; i++) {
                    before = bingo.getPickedNumbers();
                    picked = bingo.pick().number;
                    after = bingo.getPickedNumbers();

                    expect(before)
                    .to.have.length(i - 1)
                    .and.not.include(picked);

                    expect(after)
                    .to.have.length(i)
                    .and.include(picked);
                }
            });
        });
    });
});