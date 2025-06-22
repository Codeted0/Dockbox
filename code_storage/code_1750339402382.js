function findMedian(numbers) {
    numbers.sort((a, b) => a - b);  // Sort in ascending order
    const mid = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        // Even number of elements → average of two middle
        return (numbers[mid - 1] + numbers[mid]) / 2;
    } else {
        // Odd number of elements → middle element
        return numbers[mid];
    }
}

// Example usage:
const nums = [7, 2, 10, 4, 5];
const median = findMedian(nums);
console.log("Median:", median);
