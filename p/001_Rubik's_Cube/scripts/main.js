var rot_edg=[//	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
				[ 0, 4, 2, 3, 9, 1, 6, 7, 8, 5,10,11,12,16,14,15,21,13,18,19,20,17,22,23,24],[],[],	//L
				[ 0, 1, 2, 6, 4, 5,11, 3, 8, 9,10, 7,12,13,14,18,16,17,23,15,20,21,22,19,24],[],[],	//R
				[ 1, 2, 3, 0, 4, 5, 6, 7, 8, 9,10,11,13,14,15,12,16,17,18,19,20,21,22,23,24],[],[],	//U
				[ 0, 1, 2, 3, 4, 5, 6, 7,11, 8, 9,10,12,13,14,15,16,17,18,19,23,20,21,22,24],[],[],	//D
				[19, 1, 2, 3,12, 5, 6,20,16, 9,10,11, 7,13,14,15, 0,17,18, 8, 4,21,22,23,24],[],[],	//F
				[ 0, 1,17, 3, 4,22,14, 7, 8, 9,18,11,12,13, 5,15,16,10, 2,19,20,21, 6,23,24],[],[],	//B
];
var rot_cnr=[//	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
				[20, 8, 2, 3,13,17, 6, 7, 4,16,10,11,21, 1,14,15,12, 0,18,19, 5, 9,22,23,24],[],[],	//L
				[ 0, 1,22,10, 4, 5,15,19, 8, 9, 6,18,12,13,23, 3,16,17,14, 2,20,21, 7,11,24],[],[],	//R
				[ 1, 2, 3, 0, 4, 5, 6, 7, 9,10,11, 8,12,13,14,15,17,18,19,16,20,21,22,23,24],[],[],	//U
				[ 0, 1, 2, 3, 7, 4, 5, 6, 8, 9,10,11,15,12,13,14,16,17,18,19,23,20,21,22,24],[],[],	//D
				[11, 1, 2,23,16, 5, 6,12,19, 9,10, 7, 0,13,14,20, 3,17,18,15, 8,21,22, 4,24],[],[],	//F
				[ 0,21, 9, 3, 4,14,18, 7, 8, 5,17,11,12,22, 2,15,16,13, 1,19,20, 6,10,23,24],[],[],	//B
];
var rot_not=["L","L2","L'","R","R2","R'","U","U2","U'",
			 "D","D2","D'","F","F2","F'","B","B2","B'"];
var rot_opp=[2,1,0,5,4,3,8,7,6,11,10,9,14,13,12,17,16,15];

var dis_edg = [];
var dis_edg_stage1 = [];
var pos_edg = [];
var num_edg = 12;

var dis_cnr = [];
var dis_cnr_stage1 = [];
var pos_cnr = [];
var num_cnr = 8;

var limit;					// limit of IDA*
var limit_max = 13;			// maximum turns to search
var random_max = 25;
var random_input = [];
var ans = [];

var ROOFPIG_CONF_CROSS = "flags=showalg | colors=F:w B:y U:g D:b R:o L:r | colored=U*/e */m"
var ROOFPIG_CONF_CUBE = "flags=showalg | colors=F:w B:y U:g D:b R:o L:r"

function rot_cross(turn){
	for(var i=0;i<4;i++){
		pos_edg[i] = rot_edg[turn][ pos_edg[i] ];
	}
}
function rot(turn){
	for(var i=0;i<num_edg;i++){
		pos_edg[i] = rot_edg[turn][ pos_edg[i] ];
	}
	for(var i=0;i<num_cnr;i++){
		pos_cnr[i] = rot_cnr[turn][ pos_cnr[i] ];
	}
}


function h_cross(){
	var max = 0;
	for(var i=0;i<4;i++){
		if(dis_edg[ pos_edg[i] ][i] > max){
			max = dis_edg[ pos_edg[i] ][i];
		}
	}
	return max;
}
function h(){
	var max = 0;
	for(var i=0;i<num_edg;i++){
		if(dis_edg_stage1[ pos_edg[i] ][i] > max){
			max = dis_edg_stage1[ pos_edg[i] ][i];
		}
	}
	for(var i=0;i<num_cnr;i++){
		if(dis_cnr_stage1[ pos_cnr[i] ][i] > max){
			max = dis_cnr_stage1[ pos_cnr[i] ][i];
		}
	}
	return max;
}

function IDA_cross(pre,deep){
	var h_val = h_cross();
	var side_pre = Math.floor(pre/3);
	var side=-1;

	if(h_val==0){
		return true;
	}
	if(deep + h_val >limit){
		return false;
	}

	for(var i=0;i<18;i++){
		if(i%3==0)side++;
		if(side==side_pre)continue;
		
		//console.log( side_pre+ "   " + side);
		
		ans[deep] = i;
		rot_cross(i);
		
		if(IDA_cross(i,deep+1)){
			//rot_cross( rot_opp[i] );
			return true;
		}else{
			rot_cross( rot_opp[i] );
		}
	}
}

function IDA(pre,deep){
	var h_val = h();
	var side_pre = Math.floor(pre/3);
	var side=-1;

	if(h_val==0){
		return true;
	}
	if(deep + h_val >limit){
		return false;
	}

	for(var i=0;i<18;i++){
		if(i%3==0)side++;
		if(side==side_pre)continue;
		
		//console.log( side_pre+ "   " + side);
		
		ans[deep] = i;
		rot(i);
		
		if(IDA(i,deep+1)){
			rot( rot_opp[i] );
			return true;
		}else{
			rot( rot_opp[i] );
		}
	}
}

function input(){
	for(var i=0;i<num_edg;i++){
		pos_edg[i] = document.getElementById("edg_"+i).value;
	}
	for(var i=0;i<num_cnr;i++){
		pos_cnr[i] = document.getElementById("cnr_"+i).value;
	}
}
function input_random(){
	var pre = -1;
	var pre_side = -1;
	var nxt;
	var nxt_side;
	var alg = "";
	
	for(var i=0;i<num_edg;i++){
		pos_edg[i] = i;
	}
	for(var i=0;i<num_cnr;i++){
		pos_cnr[i] = i;
	}
	
	for(var i=0;i<random_max;i++){
		nxt = Math.floor((Math.random() * 18));
		nxt_side = Math.floor(nxt/3);
		if(nxt_side == pre_side){
			i--;
			continue;
		}else{
			random_input[i] = nxt;
			pre = nxt;
			pre_side = nxt_side;
			rot(nxt);
		}
	}
	for(var i=0;i<num_edg;i++){
		document.getElementById("edg_"+i).value = pos_edg[i];
	}
	for(var i=0;i<num_cnr;i++){
		document.getElementById("cnr_"+i).value = pos_cnr[i];
	}
	
	
	for(var i=0;i<random_max;i++){
		if(i)alg += " ";
		alg+=rot_not[ random_input[i] ];
	}
	var cube = document.getElementById('cube');
	cube.innerHTML="";
	
	//CubeAnimation.create_in_dom(cube, "base=CUBE|alg="+alg+"|setupmoves="+alg, "class='roofpig'");
	CubeAnimation.create_in_dom(cube, "base=CUBE|setupmoves="+alg, "class='roofpig'");
}

function search_cross(){
	var ret;
	var alg ="";
	
	for(var i=0;i<4;i++){
		pos_edg[i] = document.getElementById("edg_"+i).value;
		//console.log(pos_edg[i]);
	}

	for(limit=h_cross();limit < limit_max;limit++){
		if(IDA_cross(-1,0)){
			break;
		}
	}
	
	//console.log("limit "+limit);
	for(var i=0;i<limit;i++){
		//console.log(rot_not[ ans[i] ]);
		if(i)alg+=" ";
		alg+=rot_not[ ans[i] ];
	}
	
	//console.log(alg);
    var cube = document.getElementById('cube');
	cube.innerHTML="";
	CubeAnimation.create_in_dom(cube, "base=CROSS|alg="+alg, "class='roofpig'");
}
function search(){
	var ret;
	var alg ="";

	for(limit=h();limit < limit_max;limit++){
		if(IDA(-1,0)){
			break;
		}
	}
	
	//console.log("limit "+limit);
	for(var i=0;i<limit;i++){
		//console.log(rot_not[ ans[i] ]);
		if(i)alg+=" ";
		alg+=rot_not[ ans[i] ];
	}
	//console.log(alg);
    var cube = document.getElementById('cube');
	cube.innerHTML="";
	CubeAnimation.create_in_dom(cube, "base=CUBE|alg="+alg, "class='roofpig'");
}
/*
function f(){
	var alg = document.getElementById('alg').value;
    var cube = document.getElementById('cube');
	cube.innerHTML="";
	CubeAnimation.create_in_dom(cube, "alg="+alg, "class='roofpig'");
}
*/
function init(){
	//console.dir(rot_edg);
	for(var i=0;i<18;i+=3){
		for(var j=0;j<=24;j++){
			rot_edg[i+1][j] = rot_edg[i][ rot_edg[i][j] ];
			rot_cnr[i+1][j] = rot_cnr[i][ rot_cnr[i][j] ];
		}
		for(var j=0;j<=24;j++){
			rot_edg[i+2][j] = rot_edg[i][ rot_edg[i+1][j] ];
			rot_cnr[i+2][j] = rot_cnr[i][ rot_cnr[i+1][j] ];
		}
	}
	for(var i=0;i<=24;i++){
		dis_edg[i] = [];
		dis_cnr[i] = [];
		for(var j=0;j<=24;j++){
			dis_edg[i][j] = 20;				// god's number is 20
			dis_cnr[i][j] = 20;
		}
		dis_edg[i][i]=0;
		dis_cnr[i][i]=0;
	}
	for(var i=0;i<18;i++){
		for(var j=0;j<24;j++){
			if(dis_edg[j][ rot_edg[i][j] ]>1){
				dis_edg[j][ rot_edg[i][j] ]=1;
			}
			if(dis_cnr[j][ rot_cnr[i][j] ]>1){
				dis_cnr[j][ rot_cnr[i][j] ]=1;
			}
		}
	}
	// Floyd-Warshall
	for(var k=0;k<24;k++){
		for(var i=0;i<24;i++){
			for(var j=0;j<24;j++){
				if(dis_edg[i][j] > dis_edg[i][k] + dis_edg[k][j]){
					dis_edg[i][j] = dis_edg[i][k] + dis_edg[k][j];
				}
				if(dis_cnr[i][j] > dis_cnr[i][k] + dis_cnr[k][j]){
					dis_cnr[i][j] = dis_cnr[i][k] + dis_cnr[k][j];
				}
			}
		}
	}
	
	for(var i=0;i<24;i++){
		dis_edg[24][i]=0;
		dis_cnr[24][i]=0;
	}
	
	// pre calculate for stage 1
	for(var i=0;i<=24;i++){
		dis_edg_stage1[i] = [];
		for(var j=0;j<=24;j++){
			dis_edg_stage1[i][j] = dis_edg[i][j];
		}
	}
	for(var i=0;i<=24;i++){
		dis_cnr_stage1[i] = [];
		for(var j=0;j<=24;j++){
			dis_cnr_stage1[i][j] = dis_cnr[i][j];
		}
	}
	
	for(var i=0;i<num_edg;i++){
		if(i>=4 && i<=7)continue;
		for(var j=0;j<num_edg;j++){
			if(j>=4 && j<=7)continue;
			dis_edg_stage1[i][j]=0;
		}
	}
	for(var i=4;i<8;i++){
		for(var j=4;j<8;j++){
			dis_edg_stage1[i][j]=0;
		}
	}
	for(var i=0;i<num_cnr;i++){
		for(var j=0;j<num_cnr;j++){
			dis_cnr_stage1[i][j]=0;
		}
	}	
	
	//console.dir(dis_edg);
	//console.dir(dis_cnr);
}

init();
