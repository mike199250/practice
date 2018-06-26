#include <cstdio>

using namespace std;
#define MAXLEN 17
#define MAXN 503

int main()
{
	char in[MAXN][MAXLEN];
	int N;
	int X=0;
	int check[MAXN];
	int i,j;

	scanf("%d",&N);
	for(i=0;i<N;i++){
		scanf("%s",in[i]);
		check[i] = 0;

		if(in[i][10]=='\0'){
			for(j=0;j<10;j++){
				if(in[i][j]=='X' && j==9){
					check[i] += 10 * (10-j);
				}else if(in[i][j]>='0' && in[i][j]<='9'){
					check[i] += (in[i][j]-'0') * (10-j);
				}else{
					check[i] = -1;
					break;
				}

			}
			check[i]%=11;
		}else if(in[i][13]=='\0'){
			for(j=0;j<13;j++){
				/*
				if(in[i][j]=='X' && j==12){
					if(j&1){
						check[i] += 10*3;
					}else{
						check[i] += 10;
					}
				}else */
				if(in[i][j]>='0' && in[i][j]<='9'){
					if(j&1){
						check[i] += (in[i][j]-'0')*3;
					}else{
						check[i] += (in[i][j]-'0');
					}
				}else{
					check[i]=-1;
					break;
				}

			}
			check[i]%=10;
		}else{
			check[i] = -1;
		}
		if(check[i]!=0){
			X++;
		}
	}
	printf("%d invalid:\n",X);
	for(i=0;i<N;i++){
		if(check[i]){
			puts(in[i]);
		}
	}

	return 0;
}
