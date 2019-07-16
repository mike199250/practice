#include <cstdio>
using namespace std;

bool check(int n,int k)
{
	if(k%3!=0){
		return n%3!=0;
	}else{
		return  (n%(k+1)) == k || (n%(k+1))%3!=0;
	}
}
int main()
{
	int t,n,k;
	scanf("%d",&t);
	while(t--){
		scanf("%d%d",&n,&k);
		if(check(n,k)){
			puts("Alice");
		}else{
			puts("Bob");
		}
	}
	return 0;
}
