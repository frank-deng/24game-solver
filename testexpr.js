var solve24game = require('./24game-solver');

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
	var oper = ['+', '-', '*', '/'];
	for (var in1 = 0; in1 < 4; in1++) {
		for (var in2 = 0; in2 < 4; in2++) {
			if (in1 == in2) {
				continue;
			}
			for (var in3 = 0; in3 < 4; in3++) {
				if (in1 == in2 || in1 == in3 || in2 == in3) {
					continue;
				}
				in4 = 6-in1-in2-in3;
				for (var is1 = 0; is1 < 4; is1++) {
					for (var is2 = 0; is2 < 4; is2++) {
						for (var is3 = 0; is3 < 4; is3++) {
							for (var i = 0; i < templates.length; i++) {
								expr = templates[i]
									.replace('%d',n[in1]).replace('%d',n[in2]).replace('%d',n[in3]).replace('%d',n[in4])
									.replace('%s',oper[is1]).replace('%s',oper[is2]).replace('%s',oper[is3])
								result = eval('('+expr+')');
								if (Math.abs(result - goal) < 0.0000001) {
									return expr;
								}
							}
						}
					}
				}
			}
		}
	}
	return false;
}

console.log('Test for missing expressions.');
console.log('This test will last for 7.5 hours.');
console.log('Press Ctrl-C to cancel.');
console.log('');
for (var goal = 0; goal <= 99; goal++) {
	var count = 0;
	enumNumbers(4, 1, 13, function(a,b,c,d){
		var result = solve24game(a,b,c,d,goal);
		var result2 = simpleSolver(a,b,c,d,goal);
		if (result.length > 0 && result2 !== false) {
			count++;
		} else if (result.length == 0 && result2 === false) {
		} else {
			console.log('Missing expression: goal='+goal+' result='+result+' result_simple'+result2);
		}
	});
	console.log(goal+'\t'+count);
}

