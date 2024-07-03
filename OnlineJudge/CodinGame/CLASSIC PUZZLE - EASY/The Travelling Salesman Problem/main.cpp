#include <cstdio>
#include <cmath>

using namespace std;
#define MAXN 15

int x[MAXN],y[MAXN];

int dis(int to,int now)
{
	return (x[now]-x[to])*(x[now]-x[to]) + (y[now]-y[to])*(y[now]-y[to]);
}

int main()
{
	int N;
	int cnt;
	int i,now,near;
	int len_near,len_tmp;
	double len;

	bool vis[MAXN];

	scanf("%d",&N);
	for(i=0;i<N;i++){
		scanf("%d%d",&x[i],&y[i]);
		vis[i] = false;
	}

	now = 0;
	vis[now] = true;
	for(cnt=1;cnt<N;cnt++){
		//printf("now %d\n",now);

		near = -1;
		for(i=0;i<N;i++){
			if(i==now)continue;
			if(vis[i])continue;
			//printf("now %d      %d\n",now,i);
			len_tmp = dis(now,i);
			if(near==-1 || len_tmp < len_near){
				len_near = len_tmp;
				near = i;
			}
		}

		vis[near] = true;
		len += (double)sqrt(len_near);
		now = near;
	}
	len += (double)sqrt( dis(now,0) );

	printf("%.0lf\n",len);

	return 0;
}
