/* global require */

var expect = require('chai').expect;
var Bingo = require('../index');
var Player = require('../lib/player');
var Card = require('../lib/card');

var bingo;
var game_config;
describe('The Bingo', function () {
    describe('constructor', function () {
        before(function () {
            bingo = new Bingo();
        });

        it('should be instantiable', function () {
            expect(bingo).to.be.an.instanceof(Bingo);
        });

        it('should default to 2 player objects', function () {
            expect(bingo.players.length).to.be.equal.to(2);
        });
        
        it('should have an array of player objects', function () {
            bingo.players.forEach(function (player) {
                expect(player).to.be.an.instanceof(Player);
            });
        });
        
    });

    describe('initializing', function () {
        before(function () {
            game_config = [
                {
                    cards: 2
                },
                {
                    name: 'John Johnson',
                    cards: 3
                },
                ,
                {
                    name: 'Jane Doe',
                    cards: 8
                }
            ];

            bingo = new Bingo(game_config);
        });

        it('should have the same number of players passed', function () {
            expect(bingo.players.length).to.be.equal.to(game_config.length);
        }); 
    });
});