#include <iostream>
using namespace std;

int main() {
    int n, num, count = 0;

    cout << "Enter the size of the array: ";
    cin >> n;

    int arr[n];
    cout << "Enter " << n << " elements:\n";
    for (int i = 0; i < n; i++)
        cin >> arr[i];

    cout << "Enter the number to count: ";
    cin >> num;

    for (int i = 0; i < n; i++) {
        if (arr[i] == num)
            count++;
    }

    cout << "Number " << num << " appears " << count << " time(s)." << endl;

    return 0;
}
