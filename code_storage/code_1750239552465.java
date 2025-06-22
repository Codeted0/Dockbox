import java.util.Arrays;

public class main {
    public static void main(String[] args) {
        int[] arr = {34, 7, 23, 32, 5, 62};
        int key = 23;

        Arrays.sort(arr);  // Sort the array
        int index = Arrays.binarySearch(arr, key);  // Binary search

        if (index >= 0)
            System.out.println("Element " + key + " found at index " + index);
        else
            System.out.println("Element " + key + " not found");
    }
}
