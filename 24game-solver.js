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
	var calc = new Calc();
	var tempRPN = [
		[
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_OPER},
		],
		[
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_OPER},
		],
		[
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
		],
		[
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_OPER},
		],
		[
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
			{type:Calc.TOKEN_VAR},
			{type:Calc.TOKEN_OPER},
		],
	];
	var tempExpr = [];
	var enumTemplates = function(n0,op0){
		for(var i=0; i<tempRPN.length; i++){
			var rpn=tempRPN[i], n=n0.slice(0), op=op0.slice(0);
			for (var j=0; j<rpn.length; j++){
				switch(rpn[j].type){
					case Calc.TOKEN_VAR:
						rpn[j].value=n.pop();
					break;
					case Calc.TOKEN_OPER:
						rpn[j].value=op.pop();
					break;
				}
			}
			var expr = calc.setRPN(rpn).getSimplifiedExpr();
			if (-1 == tempExpr.indexOf(expr)){
				tempExpr.push(expr);
			}
		}
	}
	var enumOpers = function(a,b,c,d){
		var op = ['+', '-', '*', '/'], i,j,k;
		for (i = 0; i < op.length; i++) {
			for (j = 0; j < op.length; j++) {
				for (k = 0; k < op.length; k++) {
					enumTemplates([d,c,b,a],[op[k],op[j],op[i]]);
				}
			}
		}
	}
	var enumNums = function(){
		var n = ['a','b','c','d'], i, j, k;
		for (i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				if (j == i) {
					continue;
				}
				for (k = 0; k < 4; k++) {
					if (k == i || k == j) {
						continue;
					}
					enumOpers(n[i], n[j], n[k], n[6-i-j-k]);
				}
			}
		}
	}
	enumNums();
	var TEMPLATES_ALL = [];
	for (var i = 0; i < tempExpr.length; i++) {
		TEMPLATES_ALL.push({
			calc: Function('n',('return '+tempExpr[i]+';').replace('a','n[0]').replace('b','n[1]').replace('c','n[2]').replace('d','n[3]')),
			expr: tempExpr[i],
		});
	}
	
	return function(a, b, c, d, goal) {
		var n = [a,b,c,d];
		for (i = 0; i < 4; i++) {
			if (isNaN(n[i]) || n[i] < 1 || n[i] > 13) {
				throw new Error('Number must between 1 and 13');
			}
		}
		if (undefined === goal) {
			goal = 24;
		} else if (isNaN(goal) || goal < 0 || goal > 99) {
			throw new Error('Goal must between 0 and 99');
		}
		var result = [];
		for (var i=0; i<TEMPLATES_ALL.length; i++){
			if (Math.abs(TEMPLATES_ALL[i].calc(n)-goal)<0.00001){
				var expr = TEMPLATES_ALL[i].expr.replace('a', n[0]).replace('b', n[1]).replace('c', n[2]).replace('d', n[3]);
				if (-1 == result.indexOf(expr)){
					result.push(expr);
				}
			}
		}
		return result;
	}
}));

