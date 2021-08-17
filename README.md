24 Game Solver
==============

Solve 24 game with less duplicated results.

[Demo page](https://frank-deng.github.io/24game-solver/index.html)

Usage
-----

Node

	const solve24game = require('24game-solver');
	const result = solve24game([a, b, c, d], goal);

Brwoser

	<script type='text/javascript' src='dist/24game-solver.js'></script>
	<script type='text/javascript'>
		var result = solve24game([a, b, c, d], goal);
	</script>

API
---

`solve24game(nums,goal)`

* `nums` - An array of numbers between 1 and 13, array length must between 3 and 6.
* `goal` - A number between 0 and 99.

Test Case
---------

Run `npm test` to run the test cases.
