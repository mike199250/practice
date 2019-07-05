var flip_adjacent = false;
var id_table = ["t0","t1","t2"];
var light_color =["#ffff99","#ffff99","#b3ffb3"];
var row,col;

function init(r,c){
	var i,j,k;
	var id =["beg_board","end_board","ans_board"];
	var s;
	
	row = r;
	col = c;
	
	for(k=0;k<3;k++){
		s = "<table id=\"t"+k+"\" width=400px height="+400*row/col+"px border=1 cellspacing=0>";
		for(i=0;i<row;i++){
			s += "<tr>";
			for(j=0;j<col;j++){
				s += "<td onclick=\"flip("+k+","+i+","+j+")\"></td>";
			}
			s += "</tr>"
		}
		s+= "</table>";
		document.getElementById(id[k]).innerHTML = s;
	}
	//console.log(s);
}
function change_flip_adjacent(){
	flip_adjacent = document.getElementById("flip_adjacent").checked;
	//console.log(flip_adjacent);
}
function flip_cell(k,i,j){
	//console.log(document.getElementById(id_table[k]));
	var t = document.getElementById(id_table[k]);
	//console.log(t.rows[i].cells[j].bgColor);
	if(t.rows[i].cells[j].bgColor == ""){
		t.rows[i].cells[j].bgColor = light_color[k];
	}else{
		t.rows[i].cells[j].bgColor = "";
	}
}
function flip(k,i,j){
	flip_cell(k,i,j);
	if(flip_adjacent){
		if(i>0)flip_cell(k,i-1,j);
		if(i<row-1)flip_cell(k,i+1,j);
		if(j>0)flip_cell(k,i,j-1);
		if(j<col-1)flip_cell(k,i,j+1);
	}
}
