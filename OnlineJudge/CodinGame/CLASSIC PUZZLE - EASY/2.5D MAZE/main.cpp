#include <cstdio>
#include <queue>
using namespace std;
#define MAX_HW 17
#define MAX_z 2
#define inf 10033

typedef struct COOD{

	int x,y,z;
	COOD(int in_x=0,int in_y=0,int in_z=0){
		x = in_x;
		y = in_y;
		z = in_z;
	}
}COOD;

int main()
{
	int h,w;
	int x_start,y_start,x_end,y_end;
	char maze[MAX_HW][MAX_HW];
	int dis[MAX_HW][MAX_HW][MAX_z];
	queue<COOD>q;

	int i,j;
	int dir_x[4]={ 0,1,0,-1};	// ¡ô¡÷¡õ¡ö
	int dir_y[4]={-1,0,1, 0};
	int x_nxt,y_nxt;
	int z_beg,z_end;
	int add_len;
	COOD u,v;

	scanf("%d%d",&y_start,&x_start);
	scanf("%d%d",&y_end,&x_end);
	scanf("%d%d",&h,&w);
	for(i=0;i<h;i++){
		scanf("%s",maze[i]);
		for(j=0;j<w;j++){
			dis[i][j][0] = dis[i][j][1] = inf;
		}
	}

	/* test maze beg * /
	for(i=0;i<h;i++){
		for(j=0;j<w;j++){
			printf("%c",maze[i][j]);
		}
		puts("");
	}
	/* test end */

	dis[y_start][x_start][0] = 0;
    u = COOD(x_start,y_start,0);
    while(!q.empty())q.pop();
    q.push(u);

    while(!q.empty()){
        u = q.front();
        q.pop();
        //printf("queue %d %d %d\n",u.x,u.y,u.z);

        if(u.x == x_end && u.y == y_end && u.z == 0){
			//puts("end");
			break;
        }

        for(i=0;i<4;i++){
			x_nxt = u.x + dir_x[i];
			y_nxt = u.y + dir_y[i];

			if(x_nxt>=w || x_nxt<0 || y_nxt>=h || y_nxt<0)continue;
			if(maze[y_nxt][x_nxt]=='#')continue;
			if(u.z == 0 && maze[y_nxt][x_nxt]=='+')continue;		// down	can not walk
			if(u.z == 1 && maze[y_nxt][x_nxt]=='.')continue;		// up	can not walk
			if( (i==0||i==2 ) && maze[y_nxt][x_nxt]=='-')continue;	// ¡ô¡õ	can not walk
			if( (i==1||i==3 ) && maze[y_nxt][x_nxt]=='|')continue;	// ¡÷¡ö	can not walk

			if(maze[y_nxt][x_nxt]=='-' || maze[y_nxt][x_nxt]=='|'){
				y_nxt += dir_y[i];
				x_nxt += dir_x[i];
				add_len = 2;
				z_beg = 0;
				z_end = 1;

				if(maze[y_nxt][x_nxt]=='.' || maze[y_nxt][x_nxt]=='O')z_end = 0;
				if(maze[y_nxt][x_nxt]=='+')z_beg = 1;
			}else{
				z_beg = z_end = u.z;
				add_len = 1;
			}
			for(j=z_beg;j<=z_end;j++){
				if(dis[y_nxt][x_nxt][j]!=inf)continue;			// already searched
				dis[y_nxt][x_nxt][j] = dis[u.y][u.x][u.z]+add_len;
				v = COOD(x_nxt,y_nxt,j);
				q.push(v);
			}
        }
    }
	printf("%d\n",dis[y_end][x_end][0]);

	/* test dis beg * /
	for(i=0;i<h;i++){
		for(j=0;j<w;j++){
			if(dis[i][j][0]==inf){
				printf("XX ");
			}else{
				printf("%2d ",dis[i][j][0]);
			}
		}
		puts("");
	}
	/* test dis end */

	return 0;
}
