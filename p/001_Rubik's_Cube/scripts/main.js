function f() {
	var alg = document.getElementById('alg').value;
    var cube = document.getElementById('cube');
	cube.innerHTML="";
	CubeAnimation.create_in_dom(cube, alg, "class='roofpig'");
}