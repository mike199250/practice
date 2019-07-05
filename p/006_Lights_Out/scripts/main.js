var flip_adjacent = false;
var id_table = ["t0","t1","t2"];
var light_color =["#ffff99","#ffff99","#b3ffb3"];
var row,col;
var map_beg,map_end,map_cur,map_ans;


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
	for(i=0;i<row;i++){
		for(j=0;j<col;j++){
			flip_cell(0,i,j);
		}
	}

	document.getElementById("status").innerHTML = "result:";
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

function search(){
	var t=[];
	var i,j,k;
	
	t[0] = document.getElementById(id_table[0]);
	t[1] = document.getElementById(id_table[1]);
	t[2] = document.getElementById(id_table[2]);
	
	map_beg=[];
	map_end=[];
	map_cur=[];
	map_ans=[];
	for(i=0;i<row;i++){
		map_beg[i]=[];
		map_end[i]=[];
		map_cur[i]=[];
		map_ans[i]=[];
		for(j=0;j<col;j++){
			if(t[0].rows[i].cells[j].bgColor==""){
				map_beg[i][j] = 0;
			}else{
				map_beg[i][j] = 1;
			}
			if(t[1].rows[i].cells[j].bgColor==""){
				map_end[i][j] = 0;
			}else{
				map_end[i][j] = 1;
			}
			if(t[2].rows[i].cells[j].bgColor!=""){
				t[2].rows[i].cells[j].bgColor="";
			}
			map_ans[i][j]=0;
		}
	}

	if(enumerate(0)){
		document.getElementById("status").innerHTML="solution found";
		for(i=0;i<row;i++){
			for(j=0;j<col;j++){
				if(map_ans[i][j]){
					flip_cell(2,i,j);
				}
			}
		}
	}else{
		document.getElementById("status").innerHTML="no solution found";
	}
	
}
function invert_cell(i,j){
	map_cur[i][j]^=1;
}
function invert(i,j){
	invert_cell(i,j);
	if(i>0)invert_cell(i-1,j);
	if(i<row-1)invert_cell(i+1,j);
	if(j>0)invert_cell(i,j-1);
	if(j<col-1)invert_cell(i,j+1);
}
function enumerate(deep){
	if(deep==col){
		//console.log(map_ans[0]);
		var i,j;
		for(i=0;i<row;i++){
			for(j=0;j<col;j++){
				map_cur[i][j] = map_beg[i][j];
			}
		}
		for(j=0;j<col;j++){
			if(map_ans[0][j]==1)invert(0,j);
		}
		for(i=1;i<row;i++){
			for(j=0;j<col;j++){
				if(map_cur[i-1][j] != map_end[i-1][j]){
					invert(i,j);
					map_ans[i][j]=1;
				}else{
					map_ans[i][j]=0;
				}
			}
		}
		for(j=0;j<col;j++){
			if(map_cur[row-1][j] != map_end[row-1][j]){
				return false;
			}
		}
		//console.log(map_ans);
		return true;
	}else{
		map_ans[0][deep] = 0;
		if(enumerate(deep+1))
			return true;
		map_ans[0][deep] = 1;
		if(enumerate(deep+1))
			return true;
		return false;
	}
}