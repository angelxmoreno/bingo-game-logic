/* global module */

module.exports = {
    types: function () {
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
    number2type: function (number) {
        var returnType = null;
        var ranges = this.ranges;
        number = parseInt(number);
        this.types().forEach(function (type) {
            if (number >= ranges[type].min && number <= ranges[type].max) {
                returnType = type;
            }
        });

        if (returnType === null) {
            throw(Error(this.errors.number_out_of_range));
        }

        return returnType;
    },
    errors: {
        missing_argument: 'Missing Argument',
        wrong_type: 'Wrong Column Type Passed',
        max_num_slots: 'Unique Number Out of Range',
        number_out_of_range: 'Number Out of Range'
    },
    winnings: [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13],
        [14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23],
        [0, 5, 10, 14, 19],
        [1, 6, 11, 15, 20],
        [2, 7, 16, 21],
        [3, 8, 12, 17, 22],
        [4, 9, 13, 18, 23],
        [0, 6, 17, 23],
        [4, 8, 15, 19]
    ]

};