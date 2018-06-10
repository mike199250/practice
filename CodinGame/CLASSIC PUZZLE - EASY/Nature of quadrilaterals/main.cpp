#include <cstdio>

using namespace std;

int main()
{
	int co[4][2];
	int n;
	char in[4][33];

	bool if_same_length;
	bool if_rectangle;
	bool if_parallel;
	int i;
	int tmp_length,tl2,scale;

	scanf("%d",&n);
	while(n--){
		for(i=0;i<4;i++){
			scanf("%s%d%d",in[i],&co[i][0],&co[i][1]);
		}
		if_same_length = false;
		if_rectangle = false;
		if_parallel = false;

		tmp_length = (co[0][0] - co[3][0])*(co[0][0] - co[3][0]) + (co[0][1] - co[3][1])*(co[0][1] - co[3][1]);
		for(i=1;i<4;i++){
			tl2 = (co[i][0] - co[i-1][0])*(co[i][0] - co[i-1][0]) + (co[i][1] - co[i-1][1])*(co[i][1] - co[i-1][1]);
			if(tl2 != tmp_length)break;
		}
		if(i==4)if_same_length = true;

		for(i=0;i<4;i++){
			scale = (co[i][0] - co[(i+1)%4][0]) * (co[(i+1)%4][0] - co[(i+2)%4][0]) + (co[i][1] - co[(i+1)%4][1]) * (co[(i+1)%4][1] - co[(i+2)%4][1]);
			if(scale != 0)break;
		}
		if(i==4)if_rectangle = true;

		for(i=0;i<2;i++){
			if( (co[i][0] - co[(i+1)%4][0]) != (co[(i+3)%4][0] - co[(i+2)%4][0]) )break;
			if( (co[i][1] - co[(i+1)%4][1]) != (co[(i+3)%4][1] - co[(i+2)%4][1]) )break;
		}
		if(i==2)if_parallel = true;

		// output answer
		for(i=0;i<4;i++){
			printf("%s",in[i]);
		}
		if(if_same_length && if_rectangle){
			puts(" is a square.");
		}else if(if_same_length){
			puts(" is a rhombus.");
		}else if(if_rectangle){
			puts(" is a rectangle.");
		}else if(if_parallel){
			puts(" is a parallelogram.");
		}else{
			puts(" is a quadrilateral.");
		}
	}
	return 0;
}
