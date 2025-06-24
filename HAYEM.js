
// Language texts

const texts = {
    english: {
       
        buttonCalculate: "Calculate Semester Average",
        resultTitle: "Final Grades:",
        semesterAverage: "Semester Average: ",
        babay: "proud of yo ass 🩷😎 ",
        courseLabel: "Course:",
        examGradeLabel: "Exam Grade (60%):",
        caGradeLabel: "CA Grade (40%):"
    },
    arabic: {
      
        buttonCalculate: "احسب المعدل الفصلي",
        resultTitle: "الدرجات النهائية:",
        semesterAverage: "المعدل الفصلي: ",
        courseLabel: "المادة:",
        examGradeLabel: "درجة الامتحان (60%):",
        caGradeLabel: "درجة الأعمال (40%):"
    },
    french: {
        buttonCalculate: "Calculer la Moyenne Semestrielle",
        resultTitle: "Notes Finales:",
        semesterAverage: "Moyenne Semestrielle: ",
        courseLabel: "Cours:",
        examGradeLabel: "Note d'examen (60%):",
        caGradeLabel: "Note de CA (40%):"
    }
};

// Function to create input fields for each course
function createCourseInputs() {
    const coursesDiv = document.getElementById('courses');
    const coefficients = {
         "MECANIQUE DES FLUIDES ": 3,
        "ANALYSE NUMERIQUE 1": 3,
        "ANALYSE 3": 3,
        "MECANIQUE RATIONELLE 1 ":2,
        "ONDES ET VIBRATIONS": 3,
        "DESSIN ASSITE PAR ORDINATEUR ": 1,
        "INFORMAIQUE 3":2,
        "ANGLAIS TECHNIQUE": 1,
    };

    // Clear previous inputs
    coursesDiv.innerHTML = '';

    for (const course in coefficients) {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.innerHTML = `
            <label>${texts.english.courseLabel} ${course}:</label>
            <div class="input-group">
                <input type="number" id="exam-${course}" placeholder="${texts.english.examGradeLabel}" step="0.01">
                <input type="number" id="ca-${course}" placeholder="${texts.english.caGradeLabel}" step="0.01">
            </div>
        `;
        coursesDiv.appendChild(courseDiv);
    }
}

// Call the function to create input fields when the page loads
window.onload = createCourseInputs;

// Function to calculate the semester average
function calculateAverage() {
    let totalWeightedGrades = 0;
    let totalCoefficients = 0;
    const results = {};

    const coefficients = {
        "MECANIQUE DES FLUIDES ": 3,
        "ANALYSE NUMERIQUE 1": 3,
        "ANALYSE 3": 3,
        "MECANIQUE RATIONELLE 1 ":2,
        "ONDES ET VIBRATIONS": 3,
        "DESSIN ASSITE PAR ORDINATEUR ": 1,
        "INFORMAIQUE 3":2,
        "ANGLAIS TECHNIQUE": 1,
    };

    for (const course in coefficients) {
        const examGrade = parseFloat(document.getElementById(`exam-${course}`).value) || null;
        const caGrade = parseFloat(document.getElementById(`ca-${course}`).value) || null;

        let finalGrade = 0;

        if (examGrade !== null && caGrade !== null) {
            finalGrade = (examGrade * 0.6) + (caGrade * 0.4);
        } else if (examGrade !== null) {
            finalGrade = examGrade; // Only Exam grade
        } else if (caGrade !== null) {
            finalGrade = caGrade; // Only CA grade
        }

        results[course] = finalGrade;
        totalWeightedGrades += finalGrade * coefficients[course];
        totalCoefficients += coefficients[course];
    }

    const semesterAverage = totalWeightedGrades / totalCoefficients;

    // Display results in a table
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>${texts.english.resultTitle}</h2>`;

    // Create a table for results
    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse'; // Remove space between borders
    table.innerHTML = `
        <thead>
            <tr>
                <th>${texts.english.courseLabel}</th>
                <th>Final Grade</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');
    for (const course in results) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course}</td>
            <td>${results[course].toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    }

    resultDiv.appendChild(table);
    resultDiv.innerHTML += `<h2>${texts.english.semesterAverage} ${semesterAverage.toFixed(2)}</h2>`;
     resultDiv.innerHTML += `<p>${texts.english.babay} </p>`
}

// Language switcher functionality
document.getElementById("arabicBtn").addEventListener("click", () => {
    document.getElementById("title").textContent = texts.arabic.title;
    document.querySelector("button[onclick='calculateAverage()']").textContent = texts.arabic.buttonCalculate;
    createCourseInputs(); // Recreate inputs with Arabic labels
});

document.getElementById("frenchBtn").addEventListener("click", () => {
    document.getElementById("title").textContent = texts.french.title;
    document.querySelector("button[onclick='calculateAverage()']").textContent = texts.french.buttonCalculate;
    createCourseInputs(); // Recreate inputs with French labels
});
document.getElementById("englishBtn").addEventListener("click", () => {
    document.getElementById("title").textContent = texts.english.title;
    document.querySelector("button[onclick='calculateAverage()']").textContent = texts.english.buttonCalculate;
    createCourseInputs(); // Recreate inputs with english labels
});
