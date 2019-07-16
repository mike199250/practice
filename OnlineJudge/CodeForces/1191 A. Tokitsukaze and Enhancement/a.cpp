#include <cstdio>
using namespace std;

char Cat(int x)
{
	switch(x%4){
		case 1:return 'A';
		case 3:return 'B';
		case 2:return 'C';
		case 0:return 'D';
	}
}

int main()
{
	int in;
	scanf("%d",&in);
	switch(Cat(in)){
		case 'A':puts("0 A");break;
		case 'B':puts("2 A");break;
		case 'C':puts("1 B");break;
		case 'D':puts("1 A");break;
	}
	return 0;
}
