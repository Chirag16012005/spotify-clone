#include <iostream>
#include<string>
#include<algorithm>
#include<vector>
using namespace std;

int main()
{
    vector<int>a={10,20,30,229,294};
    a.push_back(a[0]);
    a.erase(a.begin());

    for(auto it:a)
    cout<<it<<" ";
    
    cout << endl;
    return 0;
}