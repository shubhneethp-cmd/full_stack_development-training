// Students Object
const students = {
    student1: {
        name: "Alice",
        marks: { math: 85, science: 90, english: 78 }
    },
    student2: {
        name: "Bob",
        marks: { math: 75, science: 80, english: 88 }
    },
    student3: {
        name: "Charlie",
        marks: { math: 95, science: 89, english: 92 }
    },
    student4: {
        name: "David",
        marks: null   // ❌ Intentionally incorrect to trigger error
    }
};

// Async function to process one student
async function processStudent(student) {

    return new Promise((resolve, reject) => {

        // Random delay between 500ms–1500ms
        const delay = Math.floor(Math.random() * 1000) + 500;

        setTimeout(() => {

            try {
                if (!student.marks) {
                    throw new Error("Marks data missing!");
                }

                const marks = student.marks;
                let total = 0;
                let count = 0;

                // Using for...in to loop through subjects
                for (let subject in marks) {
                    total += marks[subject];
                    count++;
                }

                const average = total / count;

                resolve({
                    name: student.name,
                    average: average.toFixed(2),
                    status: average >= 80 ? "Pass" : "Fail"
                });

            } catch (error) {
                reject(`Error processing ${student.name}: ${error.message}`);
            }

        }, delay);
    });
}

// Async function to process all students sequentially
async function processAllStudents() {

    const results = [];

    for (let key in students) {   // for...in loop

        const student = students[key];

        console.log(`Processing student: ${student.name}...`);

        try {
            const result = await processStudent(student);
            results.push(result);
        } catch (error) {
            console.log(error);
        }
    }

    console.log("\nFinal Results:\n");

    // Using for...of loop
    for (let result of results) {
        console.log(`■ ${result.name} has an average of ${result.average} → ${result.status}`);
    }
}

// Run the system
processAllStudents();