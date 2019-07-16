#include <cstdio>
#include <cstring>
using namespace std;
int cnt[3][10];
void add(char in[])
{
	switch(in[1]){
		case 'm':cnt[0][in[0]-'1']++;return;
		case 'p':cnt[1][in[0]-'1']++;return;
		case 's':cnt[2][in[0]-'1']++;return;
	}
}
int ans()
{
	int i,j;
	for(i=0;i<3;i++){
		for(j=0;j<10;j++){
			if(cnt[i][j]>=3)return 0;
		}
		for(j=0;j<10-2;j++){
			if(cnt[i][j]>0 && cnt[i][j+1]>0 && cnt[i][j+2]>0)return 0;
		}
	}
	for(i=0;i<3;i++){
		for(j=0;j<10;j++){
			if(cnt[i][j]>=2)return 1;
		}
		for(j=0;j<10-1;j++){
			if(cnt[i][j]>0 && cnt[i][j+1]>0)return 1;
		}
		for(j=0;j<10-2;j++){
			if(cnt[i][j]>0 && cnt[i][j+2]>0)return 1;
		}
	}
	return 2;
}
int main()
{
	int i;
	char in[3];
	memset(cnt,0,sizeof(cnt));
	for(i=0;i<3;i++){
		scanf("%s",in);
		add(in);
	}
	printf("%d\n",ans());
	/** /
	for(i=0;i<3;i++){
		for(int j=0;j<10;j++){
			printf("%d ",cnt[i][j]);
		}
		puts("");
	}
	/**/
	return 0;
}
