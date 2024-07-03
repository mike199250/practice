#include <cstdio>
using namespace std;
#define MAXLEN 2050
int main()
{
	char s[MAXLEN],in[MAXLEN];	// stack and input
	int i,top=0;
	bool if_wrong = false;

	scanf("%s",in);
	for(i=0;in[i]!='\0' && !if_wrong;++i){
		switch(in[i]){
			case '(':
				s[top++] = in[i];
				break;
			case '[':
				s[top++] = in[i];
				break;
			case '{':
				s[top++] = in[i];
				break;

			case ')':
				if(top>0 && s[top-1]=='('){
					--top;
				}else{
					if_wrong = true;
				}
				break;
			case ']':
				if(top>0 && s[top-1]=='['){
					--top;
				}else{
					if_wrong = true;
				}
				break;
			case '}':
				if(top>0 && s[top-1]=='{'){
					--top;
				}else{
					if_wrong = true;
				}
				break;
		}
	}

	if(if_wrong || top!=0){
		puts("false");
	}else{
		puts("true");
	}

	return 0;
}
