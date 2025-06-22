class Student {
    constructor(name, score) {
        this.name = name;
        this.score = score;
    }
}

class StudentManager {
    constructor() {
        this.students = [];
    }

    addStudent(name, score) {
        this.students.push(new Student(name, score));
    }

    sortStudents() {
        this.students.sort((a, b) => a.score - b.score);
    }

    binarySearch(score) {
        let low = 0, high = this.students.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (this.students[mid].score === score) return this.students[mid];
            else if (this.students[mid].score < score) low = mid + 1;
            else high = mid - 1;
        }
        return null;
    }

    printStudents() {
        console.log("Student List:");
        this.students.forEach(s => console.log(`${s.name} - ${s.score}`));
    }
}

// Example usage
const manager = new StudentManager();

manager.addStudent("Alice", 88);
manager.addStudent("Bob", 75);
manager.addStudent("Charlie", 92);
manager.addStudent("Diana", 83);

manager.sortStudents();
manager.printStudents();

let searchScore = 83;
let result = manager.binarySearch(searchScore);

if (result)
    console.log(`\nStudent with score ${searchScore} found: ${result.name}`);
else
    console.log(`\nNo student found with score ${searchScore}`);
