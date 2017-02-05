(function(root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD support.
		define([], factory);
	} else if (typeof exports === 'object') {
		// NodeJS support.
		module.exports = factory();
	} else {
		// Browser global support.
		root.solve24game = factory();
	}
}(this, function() {
	'use strict';
	var _swap = function($array, $a, $b) {
		if ($a == $b) {
			return;
		}
		var $temp = $array[$a];
		$array[$a] = $array[$b];
		$array[$b] = $temp;
	}
	var sort_abcd = function(n) {
		n.sort(function(a,b){return (a > b ? 1 : -1)});
	}
	var sort_abc = function(n) {
		if (n[0] > n[1]) { _swap(n, 0, 1); }
		if (n[1] > n[2]) { _swap(n, 1, 2); }
		if (n[0] > n[1]) { _swap(n, 0, 1); }
	}
	var sort_bcd = function(n) {
		if (n[1] > n[2]) { _swap(n, 1, 2); }
		if (n[2] > n[3]) { _swap(n, 2, 3); }
		if (n[1] > n[2]) { _swap(n, 1, 2); }
	}
	var sort_ab = function(n) {
		if (n[0] > n[1]) { _swap(n, 0, 1); }
	}
	var sort_bc = function(n) {
		if (n[1] > n[2]) { _swap(n, 1, 2); }
	}
	var sort_cd = function(n) {
		if (n[2] > n[3]) { _swap(n, 2, 3); }
	}
	var sort_ab_cd = function(n) {
		if (n[0] > n[1]) { _swap(n, 0, 1); }
		if (n[2] > n[3]) { _swap(n, 2, 3); }
	}

	var TEMPLATES_ALL = [
		{expr:"%d+%d+%d+%d", sort:sort_abcd},
		{expr:"%d+%d+%d-%d", sort:sort_abc},
		{expr:"%d+%d-%d-%d", sort:sort_ab},
		{expr:"%d-%d-%d-%d", sort:null},

		{expr:"%d*%d*%d*%d", sort:sort_abcd},
		{expr:"%d*%d*%d/%d", sort:sort_abc},
		{expr:"%d*%d/%d/%d", sort:sort_ab},
		{expr:"%d/%d/%d/%d", sort:null},

		{expr:"%d+%d+%d*%d", sort:sort_ab_cd},
		{expr:"(%d+%d+%d)*%d", sort:sort_abc},
		{expr:"%d+(%d+%d)*%d", sort:sort_bc},
		{expr:"(%d+%d)*(%d+%d)", sort:sort_ab_cd},

		{expr:"%d+%d*%d*%d", sort:sort_bcd},
		{expr:"(%d+%d)*%d*%d", sort:sort_ab_cd},
		{expr:"%d*%d+%d*%d", sort:sort_ab_cd},
		{expr:"(%d+%d*%d)*%d", sort:sort_bc},

		{expr:"%d+%d+%d/%d", sort:sort_ab},
		{expr:"%d+(%d+%d)/%d", sort:sort_bc},
		{expr:"%d+%d/(%d+%d)", sort:sort_cd},
		{expr:"(%d+%d+%d)/%d", sort:sort_abc},
		{expr:"%d/(%d+%d+%d)", sort:sort_bcd},
		{expr:"(%d+%d)/(%d+%d)", sort:sort_ab_cd},

		{expr:"%d+%d/%d/%d", sort:null},
		{expr:"(%d+%d)/%d/%d", sort:sort_ab},
		{expr:"%d/(%d+%d)/%d", sort:sort_bc},
		{expr:"%d/%d/(%d+%d)", sort:sort_cd},
		{expr:"(%d+%d/%d)/%d", sort:null},
		{expr:"%d/(%d+%d/%d)", sort:null},
		{expr:"%d/%d+%d/%d", sort:null},

		{expr:"%d-%d-%d*%d", sort:sort_cd},
		{expr:"%d-%d*%d-%d", sort:sort_bc},
		{expr:"%d*%d-%d-%d", sort:sort_ab},
		{expr:"%d-(%d-%d)*%d", sort:null},
		{expr:"(%d-%d)*%d-%d", sort:null},
		{expr:"(%d-%d-%d)*%d", sort:null},
		{expr:"(%d-%d)*(%d-%d)", sort:null},

		{expr:"%d-%d*%d*%d", sort:sort_bcd},
		{expr:"%d*%d*%d-%d", sort:sort_abc},
		{expr:"(%d-%d)*%d*%d", sort:sort_cd},
		{expr:"(%d-%d*%d)*%d", sort:sort_bc},
		{expr:"(%d*%d-%d)*%d", sort:sort_ab},
		{expr:"%d*%d-%d*%d", sort:sort_ab_cd},

		{expr:"%d-%d-%d/%d", sort:null},
		{expr:"%d-%d/%d-%d", sort:null},
		{expr:"%d/%d-%d-%d", sort:null},
		{expr:"%d-(%d-%d)/%d", sort:null},
		{expr:"%d-%d/(%d-%d)", sort:null},
		{expr:"(%d-%d)/%d-%d", sort:null},
		{expr:"%d/(%d-%d)-%d", sort:null},
		{expr:"(%d-%d-%d)/%d", sort:null},
		{expr:"%d/(%d-%d-%d)", sort:null},
		{expr:"(%d-%d)/(%d-%d)", sort:null},

		{expr:"%d-%d/%d/%d", sort:null},
		{expr:"%d/%d/%d-%d", sort:null},
		{expr:"%d/%d-%d/%d", sort:null},
		{expr:"(%d-%d)/%d/%d", sort:null},
		{expr:"%d/(%d-%d)/%d", sort:null},
		{expr:"%d/%d/(%d-%d)", sort:null},
		{expr:"(%d-%d/%d)/%d", sort:null},
		{expr:"(%d/%d-%d)/%d", sort:null},
		{expr:"%d/(%d-%d/%d)", sort:null},
		{expr:"%d/(%d/%d-%d)", sort:null},

		{expr:"%d+%d-%d*%d", sort:sort_ab_cd},
		{expr:"%d+%d*%d-%d", sort:sort_bc},
		{expr:"%d+(%d-%d)*%d", sort:null},
		{expr:"%d-(%d+%d)*%d", sort:sort_bc},
		{expr:"(%d+%d)*%d-%d", sort:sort_ab},
		{expr:"(%d+%d-%d)*%d", sort:sort_ab},
		{expr:"(%d+%d)*(%d-%d)", sort:sort_ab},

		{expr:"%d+%d-%d/%d", sort:sort_ab},
		{expr:"%d+%d/%d-%d", sort:null},
		{expr:"%d+(%d-%d)/%d", sort:null},
		{expr:"%d+%d/(%d-%d)", sort:null},
		{expr:"%d-(%d+%d)/%d", sort:sort_bc},
		{expr:"%d-%d/(%d+%d)", sort:sort_cd},
		{expr:"(%d+%d)/%d-%d", sort:sort_ab},
		{expr:"%d/(%d+%d)-%d", sort:sort_bc},
		{expr:"(%d+%d-%d)/%d", sort:sort_ab},
		{expr:"%d/(%d+%d-%d)", sort:sort_bc},
		{expr:"(%d+%d)/(%d-%d)", sort:sort_ab},
		{expr:"(%d-%d)/(%d+%d)", sort:sort_cd},

		{expr:"%d+%d*%d/%d", sort:sort_bc},
		{expr:"(%d+%d)*%d/%d", sort:sort_ab},
		{expr:"%d/(%d+%d)*%d", sort:sort_bc},
		{expr:"%d*%d+%d/%d", sort:sort_ab},
		{expr:"(%d+%d*%d)/%d", sort:sort_bc},
		{expr:"%d/(%d+%d*%d)", sort:sort_cd},
		{expr:"(%d+%d/%d)*%d", sort:null},

		{expr:"%d-%d*%d/%d", sort:sort_bc},
		{expr:"%d*%d/%d-%d", sort:sort_ab},
		{expr:"(%d-%d)*%d/%d", sort:null},
		{expr:"%d/(%d-%d)*%d", sort:null},
		{expr:"%d*%d-%d/%d", sort:sort_ab},
		{expr:"%d/%d-%d*%d", sort:sort_cd},
		{expr:"(%d-%d*%d)/%d", sort:sort_bc},
		{expr:"%d/(%d-%d*%d)", sort:sort_cd},
		{expr:"(%d*%d-%d)/%d", sort:sort_ab},
		{expr:"%d/(%d*%d-%d)", sort:sort_bc},
		{expr:"(%d-%d/%d)*%d", sort:null},
		{expr:"(%d/%d-%d)*%d", sort:null},
	];

	/* Init Template */
	for (var i = 0; i < TEMPLATES_ALL.length; i++) {
		TEMPLATES_ALL[i].calc = Function('n',('return '+TEMPLATES_ALL[i].expr+';').replace('%d','n[0]').replace('%d','n[1]').replace('%d','n[2]').replace('%d','n[3]'));
	}
	/* Init Template End */

	return function(num1, num2, num3, num4, goal) {
		var answer_all = [];
		var array = [num1, num2, num3, num4], result;
		var t, template, sort_param;
		var i, j, k, a = [0, 0, 0, 0];

		for (i = 0; i < 4; i++) {
			if (isNaN(array[i]) || array[i] < 1 || array[i] > 13) {
				throw 'Number must between 1 and 13.';
			}
		}

		if (undefined === goal) {
			goal = 24;
		} else if (isNaN(goal) || goal < 0 || goal > 99) {
			throw 'Goal must between 0 and 99.';
		}

		for (t = 0; t < TEMPLATES_ALL.length; t++) {
			var sort_func = TEMPLATES_ALL[t].sort;
			var calc_func = TEMPLATES_ALL[t].calc;
			for (i = 0; i < 4; i++) {
				for (j = 0; j < 4; j++) {
					if (j == i) {
						continue;
					}
					for (k = 0; k < 4; k++) {
						if (k == i || k == j) {
							continue;
						}
						a[0] = array[i]; a[1] = array[j];
						a[2] = array[k]; a[3] = array[6 - i - j - k];
						if (typeof(sort_func) == 'function') {	
							sort_func(a);
						}
						result = calc_func(a);
						var expr = TEMPLATES_ALL[t].expr.replace('%d', a[0]).replace('%d', a[1]).replace('%d', a[2]).replace('%d', a[3]);
						if (Math.abs(result - goal) < 0.0000001 && -1 == answer_all.indexOf(expr)) {
							answer_all.push(expr);
						}
					}
				}
			}
		}
		return answer_all;
	}
}));

