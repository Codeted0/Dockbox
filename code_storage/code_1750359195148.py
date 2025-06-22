def binary_search(arr, key):
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2

        if arr[mid] == key:
            return mid  # Found
        elif arr[mid] < key:
            low = mid + 1
        else:
            high = mid - 1

    return -1  # Not found


# Example usage
arr = [34, 7, 23, 32, 5, 62]
arr.sort()  # Sorting is required before binary search

key = 23
index = binary_search(arr, key)

if index != -1:
    print(f"Element {key} found at index {index}")
else:
    print(f"Element {key} not found in the array.")

