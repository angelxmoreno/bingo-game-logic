/* global require */

var shared = require('../lib/shared');
var expect = require('chai').expect;
var NumberPicker = require('../lib/number_picker');
var numberPicker;

describe('The Number Picker', function () {
    beforeEach(function () {
        numberPicker = new NumberPicker();
    });
    describe('constructor', function () {

        it('should be instantiable', function () {
            expect(numberPicker).to.be.an.instanceof(NumberPicker);
        });

        it('should have no picked objects at start', function () {
            expect(numberPicker.getPicked()).to.have.length(0);
        });
    });

    describe('picking', function () {
        describe('getPicked()', function () {
            it('should return all picked objects', function () {
                for (var i = 0; i < 90; i++) {
                    expect(numberPicker.getPicked()).to.have.length(i);
                    numberPicker.pick();
                }
                expect(numberPicker.getPicked()).to.have.length(90);
            });
        });

        describe('getPickedNumbers()', function () {
            it('should return all picked numbers', function () {
                for (var i = 0; i < 90; i++) {
                    numberPicker.pick();
                }
                expect(numberPicker.getPickedNumbers()).to.have.members(Array(90).fill(0).map((e, i) => i + 1));
            });
        });

        describe('pick()', function () {
            it('should return a picked object', function () {
                for (var i = 0; i < 90; i++) {
                    var picked = numberPicker.pick();

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
                    before = numberPicker.getPickedNumbers();
                    picked = numberPicker.pick().number;
                    after = numberPicker.getPickedNumbers();

                    expect(before)
                    .to.have.length(i - 1)
                    .and.not.include(picked);

                    expect(after)
                    .to.have.length(i)
                    .and.include(picked);

                }
                expect(numberPicker).to.be.an.instanceof(NumberPicker);
            });

        });
    });
});