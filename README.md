24 Game Solver
==============

Solve 24 game with less duplicated results.

[Demo page](https://frank-deng.github.io/24game-solver/index.html).

Usage
-----

Node

	const solve24game = require('24game-solver');

	/*
	The returned result contains all the expressions which calculation result equals the goal.
	Array parameter [a, b, c, d] are numbers between 1 and 13
	Parameter goal is the expected calculation result, default is 24.
	*/
	const result = solve24game([a, b, c, d], goal);

Brwoser

	<script type='text/javascript' src='dist/24game-solver.js'></script>
	<script type='text/javascript'>
		/*
		The returned result contains all the expressions which calculation result equals the goal.
		Array parameter [a, b, c, d] are numbers between 1 and 13
		Parameter goal is the expected calculation result, default is 24.
		*/
		var result = solve24game([a, b, c, d], goal);
	</script>

Test Case
---------

Run `npm test` to run the test cases.
