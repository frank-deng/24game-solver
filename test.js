global.Calc = require('expression-calculator');
var solve24game = require('./24game-solver');

QUnit.test("Basic Test", function(assert) {
	assert.deepEqual(solve24game(8,3,8,3), ['8/(3-8/3)']);
	assert.deepEqual(solve24game(3,3,8,8,24), ['8/(3-8/3)']);
	assert.deepEqual(solve24game(13,3,10,3,97), ['10*(13-3)-3']);
	assert.deepEqual(solve24game(10,3,3,13,97), ['10*(13-3)-3']);
	assert.ok(function(){
		var expected = ['(9-3)*(13-9)', '(9-13)*(3-9)', '(3-9)*(9-13)', '(13-9)*(9-3)'];
		var got = solve24game(9,13,3,9,24);
		if (got.length != expected.length) {
			return false;
		}
		for (var i = 0; i < got.length; i++) {
			if (-1 == expected.indexOf(got[i])) {
				return false;
			}
		}
		return true;
	});
	assert.ok(function(){
		var expected = [
			'(13-1-12)*8', '(13-12-1)*8', '(13-1-12)/8',
			'(13-12-1)/8', '(1+12-13)*8', '(1+12-13)/8',
		];
		var got = solve24game(9,13,3,9,0);
		if (got.length != expected.length) {
			return false;
		}
		for (var i = 0; i < got.length; i++) {
			if (-1 == expected.indexOf(got[i])) {
				return false;
			}
		}
		return true;
	});
});
QUnit.test("Invalid Input Test", function(assert) {
	assert.throws(
		function(){
			solve24game(1,'a',2,3,24);
		},
		new Error('Number must between 1 and 13'),
		"String appeared as number"
	);
	assert.throws(
		function(){
			solve24game(1);
		},
		new Error('Number must between 1 and 13'),
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(1,3);
		},
		new Error('Number must between 1 and 13'),
		"Not enough numbers, aka. undefined appeared"
	);
	assert.throws(
		function(){
			solve24game(1,-1,2,3);
		},
		new Error('Number must between 1 and 13'),
		"Negative number provided"
	);
	assert.throws(
		function(){
			solve24game(14,1,2,3);
		},
		new Error('Number must between 1 and 13'),
		"Larger number provided"
	);
	assert.throws(
		function(){
			solve24game(1,2,3,4,-1);
		},
		new Error('Goal must between 0 and 99'),
		"Invalid goal."
	);
	assert.throws(
		function(){
			solve24game(1,2,3,4,100);
		},
		new Error('Goal must between 0 and 99'),
		"Invalid goal."
	);
	assert.throws(
		function(){
			solve24game(1,2,3,4,'as');
		},
		new Error('Goal must between 0 and 99'),
		"Invalid goal with a string."
	);
});

