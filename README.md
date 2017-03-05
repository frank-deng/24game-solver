24 Game Solver
==============

Solve 24 game with less duplicated results.

Web based example can be launched from [https://frank-deng.github.io/24game-solver/index.html](https://frank-deng.github.io/24game-solver/index.html).

Usage
-----

Node

	var solve24game = require('24game-solver');

	/*
	The returned result contains all the expressions which calculation result equals the goal.
	Parameter a, b, c, d are numbers between 1 and 13
	Parameter goal is the expected calculation result, default is 24.
	*/
	var result = solve24game(a, b, c, d, goal);

Brwoser

	<script type='text/javascript' src='24game-solver.js'></script>
	<script type='text/javascript'>
		/*
		The returned result contains all the expressions which calculation result equals the goal.
		Parameter a, b, c, d are numbers between 1 and 13
		Parameter goal is the expected calculation result, default is 24.
		*/
		var result = solve24game(a, b, c, d, goal);
	</script>

Test Case
---------

Run `npm test` to run the test case.

The test will check if both `solve24game()` and ordinary method have or don't have answer, for each pairs of 4 numbers between 1 and 13, goals within 1 and 99.

After the test finished successfully, it will output how many pairs of 4 numbers out of 1820 pairs have answer for each goals.

The test will take about 12 minutes to finish.

