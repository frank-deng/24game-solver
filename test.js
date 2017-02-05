var solve24game = require('./24game-solver');

QUnit.test("Basic Test", function(assert) {
	assert.deepEqual(solve24game(8,3,8,3), ['8/(3-8/3)']);
	assert.deepEqual(solve24game(3,3,8,8,24), ['8/(3-8/3)']);
	assert.deepEqual(solve24game(13,3,10,3,97), ['(13-3)*10-3']);
	assert.deepEqual(solve24game(10,3,3,13,97), ['(13-3)*10-3']);
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
});
QUnit.test("Invalid Input Test", function(assert) {
	assert.throws(
		function(){
			solve24game(1,'a',2,3,24);
		},
		/Number must between 1 and 13./,
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(1);
		},
		/Number must between 1 and 13./,
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(1,3);
		},
		/Number must between 1 and 13./,
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(1,-1,2,3);
		},
		/Number must between 1 and 13./,
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(14,1,2,3);
		},
		/Number must between 1 and 13./,
		"Invalid number."
	);
	assert.throws(
		function(){
			solve24game(1,2,3,4,-1);
		},
		/Goal must between 1 and 99./,
		"Invalid goal."
	);
	assert.throws(
		function(){
			solve24game(1,2,3,4,'as');
		},
		/Goal must between 1 and 99./,
		"Invalid goal."
	);
});

