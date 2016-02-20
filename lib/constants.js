/* global module */

module.exports = {
    types: function(){
        return Object.keys(this.ranges);
    },
    ranges: {
        B: {
            min: 1,
            max: 18
        },
        I: {
            min: 19,
            max: 36
        },
        N: {
            min: 37,
            max: 54
        },
        G: {
            min: 55,
            max: 72
        },
        O: {
            min: 73,
            max: 90
        }
    },
    errors: {
        missing_argument: 'Missing Argument',
        wrong_type: 'Wrong Column Type Passed'
    }
};