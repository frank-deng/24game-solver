global.Calc = require('expression-calculator');
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
var oper = ['+', '-', '*', '/'];
var simpleSolvertemplates = [
	'n[0]%sn[1]%sn[2]%sn[3]',
	'(n[0]%sn[1])%sn[2]%sn[3]',
	'n[0]%s(n[1]%sn[2])%sn[3]',
	'n[0]%sn[1]%s(n[2]%sn[3])',
	'(n[0]%sn[1]%sn[2])%sn[3]',
	'n[0]%s(n[1]%sn[2]%sn[3])',
	'(n[0]%sn[1])%s(n[2]%sn[3])',
];
var simpleSolverExprs = new Array();
for (var is1 = 0; is1 < 4; is1++) {
	for (var is2 = 0; is2 < 4; is2++) {
		for (var is3 = 0; is3 < 4; is3++) {
			for (var i = 0; i < simpleSolvertemplates.length; i++) {
				var t = simpleSolvertemplates[i];
				simpleSolverExprs.push(new Function('n', 'return '+t.replace('%s',oper[is1]).replace('%s',oper[is2]).replace('%s',oper[is3])));
			}
		}
	}
}

var simpleSolver = function(a,b,c,d,goal){
	var n = [a,b,c,d], arr = new Array(4);
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
				for (var i = 0; i < simpleSolverExprs.length; i++) {
					var calc_func = simpleSolverExprs[i];
					arr[0] = n[in1]; arr[1] = n[in2]; arr[2] = n[in3]; arr[3] = n[in4];
					if (Math.abs(goal - calc_func(arr)) < 0.0000001) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

console.log('Test for missing expressions.');
console.log('This test will last for several hours.');
console.log('Press Ctrl-C to cancel.');
console.log('');
for (var goal = 0; goal <= 99; goal++) {
	var count = 0;
	enumNumbers(4, 1, 13, function(a,b,c,d){
		var result = solve24game(a,b,c,d,goal);
		try {
			var result2 = simpleSolver(a,b,c,d,goal);
		} catch(e) {
			result2 = e;
		}
		if (result.length > 0 && result2 !== false) {
			count++;
		} else if (result.length == 0 && result2 === false) {
		} else {
			console.log('Missing expression: goal='+goal+' nums='+a+','+b+','+c+','+d);
		}
	});
	console.log(goal+'\t'+count);
}

