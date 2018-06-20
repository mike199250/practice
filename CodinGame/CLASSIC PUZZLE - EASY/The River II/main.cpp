#include <cstdio>

using namespace std;
#define MAXN 100003
bool vis[MAXN];

int main()
{
	int i,nxt,x;

	for(i=1;i<MAXN;i++){
		if(vis[i])continue;
		nxt = i;

		while(nxt<MAXN){
			x = nxt;
			while(x){
				nxt += x%10;
				x /= 10;
			}
			if(nxt>=MAXN || vis[nxt])break;
			vis[nxt] = true;
		}
	}

	scanf("%d",&x);
	if(vis[x])puts("YES");
	else puts("NO");

	return 0;
}
