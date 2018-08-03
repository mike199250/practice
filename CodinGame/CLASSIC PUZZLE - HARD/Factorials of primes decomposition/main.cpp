#include <cstdio>
#include <cstring>
using namespace std;
#define MAXN 2003
#define MAXCNT 305
#define MAXLEN 33

int idx[MAXN];
int prime[MAXCNT];
int p_cnt;

typedef struct DEC{
    int cnt[MAXCNT];
    int len;
	DEC& operator+=(DEC t){
		for(int i=0;i<t.len;i++){
			cnt[i]+=t.cnt[i];
		}
		if(t.len>len)len = t.len;
		return *this;
	}
	DEC& operator-=(DEC t){
		for(int i=0;i<t.len;i++){
			cnt[i]-=t.cnt[i];
		}
		for(int i=p_cnt-1;i>=0;i--){
			if(cnt[i]!=0){
				len = i+1;
				return *this;
			}
		}
	}
	DEC operator*(int k){
		DEC ret=*this;
		for(int i=0;i<ret.len;i++){
			ret.cnt[i] *=k;
		}
		return ret;
	}
	DEC(int x=0){
		len = x;
		memset(cnt,0,sizeof(cnt));
	}
}DEC;
DEC dec[MAXCNT];

void find_prime()
{
	int i,j;
	memset(idx,0,sizeof(idx));
	p_cnt = 0;
	for(i=2;i<MAXN;i++){
		if(idx[i]==-1)continue;
		idx[i] = p_cnt;
		prime[p_cnt++] = i;
		for(j=i+i;j<MAXN;j+=i){
			idx[j] = -1;
		}
	}
	return;
}
DEC find_com(int x)
{
	DEC ret(0);
	for(int i=0;i<p_cnt && prime[i]<=x;i++){
		if(x%prime[i]==0){
			if(ret.len<i+1)ret.len=i+1;
			while(x%prime[i]==0){
				x/=prime[i];
				ret.cnt[i]++;
			}
		}
	}
	return ret;
}

void cal_prime_fac()
{
	int i,j;
	dec[0] = find_com(2);
	for(i=1;i<p_cnt;i++){
		dec[i] = dec[i-1];
		for(j=prime[i-1]+1;j<=prime[i];j++){
			dec[i] += find_com(j);
		}
	}

	/* test * /
	for(i=0;i<7;i++){
		printf("%2d: ",prime[i]);
		for(j=0;j<dec[i].len;j++){
			if(dec[i].cnt[j]>0){
				printf(" %d^%d",prime[j],dec[i].cnt[j]);
			}
		}
		puts("");
	}
	/*  */
}

int main()
{
	int i,j;
	DEC tmp,total,num_dec[2];

	char input[MAXLEN];
	bool if_beg=false;
	int num[2]={0,0};

	find_prime();
	/* test * /
	tmp = find_com(1);
	printf("len %d\n",tmp.len);
	for(int i=0;i<tmp.len;i++){
		printf("%d %d\n",prime[i],tmp.cnt[i]);
	}
	/*  */

	cal_prime_fac();

	scanf("%s",input);
	for(i=0,j=0;input[i]!='\0';i++){
		if(input[i]=='/'){
			j++;
		}else{
			num[j]=num[j]*10 + (input[i]-'0');
		}
	}
	if(num[0]<=0)num[0]=1;
	if(num[1]<=0)num[1]=1;
	//printf("%d %d\n",num[0],num[1]);

	for(i=0;i<2;i++){
		num_dec[i] = find_com(num[i]);
	}
	num_dec[0] -= num_dec[1];


	/* test * /
	//num_dec[1] = num_dec[0]*num[1];
	for(j=0;j<2;j++){
		printf("%d : len %d\n",num[j],num_dec[j].len);
		for(int i=0;i<num_dec[j].len;i++){
			printf("%d %d\n",prime[i],num_dec[j].cnt[i]);
		}
	}
	/*  */

	for(i=num_dec[0].len-1;i>=0;i--){
		if(num_dec[0].cnt[i]!=0){
			if(if_beg){
				putchar(' ');
			}else{
				if_beg = true;
			}
			if(num_dec[0].cnt[i]>0){
				//printf("%d ^ %d\n",prime[i],num_dec[0].cnt[i]);
				printf("%d#%d",prime[i],num_dec[0].cnt[i]);
				num_dec[0] -= dec[i]*num_dec[0].cnt[i];
			}else{
				//printf("%d ^ %d\n",prime[i],num_dec[0].cnt[i]);
				printf("%d#%d",prime[i],num_dec[0].cnt[i]);
				num_dec[0] += dec[i]*(-num_dec[0].cnt[i]);
			}
		}else{
			// cnt = 0 no need to modify
		}
	}

	return 0;
}
