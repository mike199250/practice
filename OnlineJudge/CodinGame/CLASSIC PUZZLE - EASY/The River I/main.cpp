#include <cstdio>
using namespace std;

int seq(int x){
	int val = x;
	while(x){
		val += x%10;
		x /=10;
	}
	return val;
}

int main()
{
	int r1,r2;

	scanf("%d%d",&r1,&r2);
	while(r1!=r2){
		if(r1<r2){
			r1 = seq(r1);
		}else{
			r2 = seq(r2);
		}
	}

	printf("%d\n",r1);
	return 0;
}
