#include <cstdio>

using namespace std;
#define MAXN 4
#define MAXN_sqrt 2
int pzl[MAXN][MAXN];
int ans[MAXN][MAXN];
char in[MAXN+3];
bool if_row[MAXN][MAXN+1];	// row_id / no
bool if_col[MAXN][MAXN+1];	// col_id / no
bool if_cor[MAXN][MAXN+1];	// cor_id / no
bool if_ans;
int to_x[MAXN*MAXN];
int to_y[MAXN*MAXN];
int to_cnt;

int xy_to_id(int x,int y)
{
	return (y/MAXN_sqrt) * MAXN_sqrt + (x/MAXN_sqrt);
}

void bt(int depth)
{
	int i,j,k;

	if(depth >= to_cnt){	//	all tried
		if_ans = true;
		for(i=0;i<to_cnt;i++){
			ans[ to_y[i] ][ to_x[i] ] = pzl[ to_y[i] ][ to_x[i] ];
		}
		return;
	}else{
		k = xy_to_id(to_x[depth],to_y[depth]);
		for(i=1;i<=MAXN;i++){	// try different number
			if(if_row[ to_y[depth] ][ i ])continue;
			if(if_col[ to_x[depth] ][ i ])continue;
			if(if_cor[ k ][ i ])continue;

			// number i can be written in the box
			pzl[ to_y[depth] ][ to_x[depth] ] = i;
			if_row[ to_y[depth] ][ i ] = true;
			if_col[ to_x[depth] ][ i ] = true;
			if_cor[ k ][ i ] = true;

			bt(depth+1);

			pzl[ to_y[depth] ][ to_x[depth] ] = 0;
			if_row[ to_y[depth] ][ i ] = false;
			if_col[ to_x[depth] ][ i ] = false;
			if_cor[ k ][ i ] = false;
			if(if_ans)return;
		}
	}
}

int main()
{
	int i,j,k;

	if_ans = false;
	to_cnt = 0;
	for(i=0;i<MAXN;i++){
		for(j=1;j<=MAXN;j++){
			if_row[i][j] = if_col[i][j] = if_cor[i][j] = false;
		}
	}

	for(i=0;i<MAXN;i++){
		scanf("%s",in);
		for(j=0;j<MAXN;j++){
			pzl[i][j] = in[j]-'0';
			ans[i][j] = pzl[i][j];

			if(pzl[i][j]!=0){
				k = xy_to_id(j,i);
				if_row[i][ pzl[i][j] ] = true;
				if_col[j][ pzl[i][j] ] = true;
				if_cor[k][ pzl[i][j] ] = true;
			}else{
				to_x[to_cnt] = j;
				to_y[to_cnt] = i;
				++to_cnt;
			}
		}
	}

	bt(0);

	for(i=0;i<MAXN;i++){
		for(j=0;j<MAXN;j++){
			printf("%d",ans[i][j]);
		}
		putchar('\n');
	}

	return 0;
}
