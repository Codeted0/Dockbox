#include <iostream>
#include <algorithm>
using namespace std;

int binarySearch(int arr[], int size, int key) {
    int low = 0, high = size - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            low = mid + 1;
        else
            high = mid - 1;
    }

    return -1;
}

int main() {
    int arr[] = {34, 7, 23, 32, 5, 62};
    int n = sizeof(arr) / sizeof(arr[0]);
    int key = 23;

    sort(arr, arr + n);

    int index = binarySearch(arr, n, key);

    if (index != -1)
        cout << "Element " << key << " found at index " << index << endl;
    else
        cout << "Element " << key << " not found in array." << endl;

    return 0;
}
