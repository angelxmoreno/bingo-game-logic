/* global require */

var expect = require('chai').expect;
var Player = require('../lib/player');
var Card = require('../lib/card');

var player;
var players;
var player_config;

describe('Player', function () {
    describe('constructor', function () {
        before(function () {
            player = new Player();
        });

        it('should be instantiable', function () {
            expect(player).to.be.an.instanceof(Player);
        });

        it('should default to 1 card object', function () {
            expect(player.cards.length).to.be.equal.to(1);
        });

        it('should have an array of card objects', function () {
            player.cards.forEach(function (card) {
                expect(card).to.be.an.instanceof(Card);
            });
        });

    });

    describe('initializing', function () {
        before(function () {
            player_config = [
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
            players = [];
            player_config.forEach(function (config, index) {
                players[index] = new Player(config);
            });
        });

        it('should have the same number of cards passed', function () {
            player_config.forEach(function (config, index) {
                expect(player.cards.length).to.be.equal.to(config.cards);
            });
        });
    });
});