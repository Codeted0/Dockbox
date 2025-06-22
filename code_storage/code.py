function binarySearch(arr, key) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        if (arr[mid] === key) {
            return mid; // Found
        } else if (arr[mid] < key) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1; // Not found
}

// Example usage
let arr = [34, 7, 23, 32, 5, 62];
arr.sort((a, b) => a - b); // Sort ascending

let key = 23;
let index = binarySearch(arr, key);

if (index !== -1) {
    console.log(`Element ${key} found at index ${index}`);
} else {
    console.log(`Element ${key} not found in array`);
}
