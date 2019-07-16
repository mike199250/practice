#include <cstdio>
using namespace std;
#define MAXNM 50033
int main()
{
	int q,n,m;
	int i,j;
	char in[MAXNM];
	int max_paint,tar,tmp;

	scanf("%d",&q);
	while(q--){
		scanf("%d%d",&n,&m);
		bool pic[n][m];
		int sum_row[n],sum_col[m];

		// init
		tar = n+m-1;
		max_paint = 0;
		for(i=0;i<n;i++)sum_row[i]=0;
		for(j=0;j<m;j++)sum_col[j]=0;
		for(i=0;i<n;i++){
			for(j=0;j<m;j++){
				pic[i][j] = false;
			}
		}


		// input
		for(i=0;i<n;i++){
			scanf("%s",in);
			for(j=0;j<m;j++){
				if(in[j]=='*'){
					pic[i][j] = true;
					sum_row[i]++;
					sum_col[j]++;
				}
			}
		}
		// calculate
		for(i=0;i<n && max_paint<tar;i++){
			for(j=0;j<m && max_paint<tar;j++){
				tmp = sum_row[i]+sum_col[j]-pic[i][j];
				if(tmp > max_paint)max_paint=tmp;
			}
		}
		printf("%d\n",tar-max_paint);

		/* show the pic* /
		printf("   ");
		for(j=0;j<m;j++){
			printf("%2d ",sum_col[j]);
		}
		puts("");
		for(i=0;i<n;i++){
			printf("%2d ",sum_row[i]);
			for(j=0;j<m;j++){
				printf("%2d ",pic[i][j]);
			}
			puts("");
		}
		/**/
	}

	return 0;
}
