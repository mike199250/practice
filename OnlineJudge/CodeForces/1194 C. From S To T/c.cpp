#include <cstdio>
#include <cstring>
using namespace std;
#define MAXLEN 133
int cnt[3][33];
char s[MAXLEN],t[MAXLEN],p[MAXLEN];
int len_s,len_t,len_p;

bool if_pos()
{
	int i,j;
	for(i=0,j=0;i<len_s && j<len_t;j++){
		if(s[i]==t[j])i++;
	}
	if(i!=len_s)return false;
	for(i='a'-'a';i<='z'-'a';i++){
		if(cnt[0][i] + cnt[2][i] < cnt[1][i])return false;
	}
	return true;
}
int main()
{
	int q;
	int i;

	scanf("%d",&q);
	while(q--){
		memset(cnt,0,sizeof(cnt));
		scanf("%s%s%s",s,t,p);
		len_s = strlen(s);
		len_t = strlen(t);
		len_p = strlen(p);

		for(i=0;i<len_s;i++){
			cnt[0][ s[i]-'a' ]++;
		}
		for(i=0;i<len_t;i++){
			cnt[1][ t[i]-'a' ]++;
		}
		for(i=0;i<len_p;i++){
			cnt[2][ p[i]-'a' ]++;
		}
		if(if_pos()){
			puts("YES");
		}else{
			puts("NO");
		}
		//printf("%s %s %s\n",s,t,p);
		//printf("%d %d %d\n",cnt[0][0],cnt[1][0],cnt[2][0]);
	}

	return 0;
}
