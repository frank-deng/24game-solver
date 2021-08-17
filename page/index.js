var result_show = document.getElementById('calc24_result');
document.getElementById('form_24game_solver').onsubmit = function(e) {
	var num_elem = document.getElementsByName('num[]');
	var num1 = Number(num_elem[0].value);
	var num2 = Number(num_elem[1].value);
	var num3 = Number(num_elem[2].value);
	var num4 = Number(num_elem[3].value);
	var goal_elem = document.getElementsByName('goal')[0];
	var goal = goal_elem.value;
	result_show.innerHTML = '';

	if (isNaN(goal) || goal < 0 || goal > 99 || goal == '') {
		goal_elem.value = 24;
		result_show.innerHTML = '';
		window.alert('Goal must between 0 and 99.');
		return false;
	}
	try {
		var result = solve24game(num1, num2, num3, num4, Number(goal));
		if (result.length == 0) {
			result_show.innerHTML = 'No Answer.';
		} else {
			for (var i = 0; i < result.length; i++) {
				result_show.innerHTML += result[i] + ' = ' + Number(goal) + '<br/>';
			}
		}
	} catch(e) {
		result_show.innerHTML = '';
		alert(e);
	}
	return false;
}
