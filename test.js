var solve24game = require('./24game-solver.min');

var enumNumbers = function(count, min, max, func){
	var nums = new Array();
	var result = new Array();
	for (var i = 0; i < count; i++) {
		nums[i] = min;
	}
	while (nums[count-1] <= max) {
		if (typeof(func) == 'function') {	
			func.apply(func, nums);
		}
		nums[0]++;
		for (var i = 0; i < count-1 && nums[i] > max; i++) {
			nums[i] = min;
			nums[i+1]++;
		}
		for (var i = 0; i < count-1; i++) {
			if (nums[i] < nums[i+1]) {
				for (var j = 0; j <= i; j++) {
					nums[j] = nums[i+1];
				}
			}
		}
	}
}
var simpleSolver = function(a,b,c,d,goal){
	var templates = [
		'%d%s%d%s%d%s%d',
		'(%d%s%d)%s%d%s%d',
		'%d%s(%d%s%d)%s%d',
		'%d%s%d%s(%d%s%d)',
		'(%d%s%d%s%d)%s%d',
		'%d%s(%d%s%d%s%d)',
		'(%d%s%d)%s(%d%s%d)',
	];
	var n = [a,b,c,d];
}
for (var goal = 1; goal <= 99; goal++) {
	var count = 0;
	enumNumbers(4, 1, 13, function(a,b,c,d){
		var result = solve24game(a,b,c,d,goal);
		if (result.length > 0) {
			count++;
		}
	});
	console.log(goal+'\t'+count);
}

    