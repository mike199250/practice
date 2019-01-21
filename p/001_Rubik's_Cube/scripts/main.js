var rot_edg=[//	[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
				[ 0, 4, 2, 3, 9, 1, 6, 7, 8, 5,10,11,12,16,14,15,21,13,18,19,20,17,22,23,24],[],[],	//L
				[ 0, 1, 2, 6, 4, 5,11, 3, 8, 9,10, 7,12,13,14,18,16,17,23,15,20,21,22,19,24],[],[],	//R
				[ 1, 2, 3, 0, 4, 5, 6, 7, 8, 9,10,11,13,14,15,12,16,17,18,19,20,21,22,23,24],[],[],	//U
				[ 0, 1, 2, 3, 4, 5, 6, 7,11, 8, 9,10,12,13,14,15,16,17,18,19,23,20,21,22,24],[],[],	//D
				[19, 1, 2, 3,12, 5, 6,20,16, 9,10,11, 7,13,14,15, 0,17,18, 8, 4,21,22,23,24],[],[],	//F
				[ 0, 1,17, 3, 4,22,14, 7, 8, 9,18,11,12,13, 5,15,16,10, 2,19,20,21, 6,23,24],[],[],	//B
];
var rot_not=["L","L2","L'","R","R2","R'","U","U2","U'",
			 "D","D2","D'","F","F2","F'","B","B2","B'"];
var rot_opp=[2,1,0,5,4,3,8,7,6,11,10,9,14,13,12,17,16,15];

var dis_edg = [];
var pos_edg = [];
var num_edg = 4;
var limit;					// limit of IDA*
var limit_max = 10;			// maximum turns to search
var ans = [];

var ROOFPIG_CONF_CROSS = "flags=showalg | colors=F:w B:y U:g D:b R:o L:r | colored=U*/e */m"


function rot_cross(turn){
	for(var i=0;i<4;i++){
		pos_edg[i] = rot_edg[turn][ pos_edg[i] ];
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

function IDA_cross(pre,deep){
	var h_val = h_cross();
	var side_pre = Math.floor(pre/3);

	if(h_val==0){
		return true;
	}
	if(deep + h_val >limit){
		return false;
	}

	for(var i=0,side=-1;i<18;i++){
		if(i%3==0)side++;
		if(side==side_pre)continue;
		
		//console.log( side_pre+ "   " + side);
		
		ans[deep] = i;
		rot_cross(i);
		
		if(IDA_cross(i,deep+1)){
			return true;
		}else{
			rot_cross( rot_opp[i] );
		}
	}
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
		}
		for(var j=0;j<=24;j++){
			rot_edg[i+2][j] = rot_edg[i][ rot_edg[i+1][j] ];
		}
	}
	for(var i=0;i<=24;i++){
		dis_edg[i] = [];
		for(var j=0;j<=24;j++){
			dis_edg[i][j] = 20;				// god's number is 20
		}
		dis_edg[i][i]=0;
	}
	for(var i=0;i<18;i++){
		for(var j=0;j<24;j++){
			if(dis_edg[j][ rot_edg[i][j] ]>1){
				dis_edg[j][ rot_edg[i][j] ]=1;
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
			}
		}
	}
	for(var i=0;i<24;i++){
		dis_edg[24][i]=0;
	}
	
	//console.dir(dis_edg);
}

init();
