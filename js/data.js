// Course data stored as JavaScript objects
const courses = [
    {
        id: 1,
        name: "Web Development Fundamentals",
        instructor: "Sarah Johnson",
        duration: "8 weeks",
        level: "Beginner",
        lessons: ["HTML Basics", "CSS Styling", "JavaScript Introduction", "Responsive Design", "DOM Manipulation", "Events & Forms", "APIs & Fetch", "Project Building"],
        completed: false,
        icon: "code",
        description: "Learn HTML, CSS, and JavaScript from scratch. Build responsive websites and interactive web applications.",
        students: 2500,
        rating: 4.8
    },
    {
        id: 2,
        name: "Advanced JavaScript",
        instructor: "Michael Chen",
        duration: "10 weeks",
        level: "Advanced",
        lessons: ["Closures", "Promises", "Async/Await", "Design Patterns", "Prototypes", "ES6+ Features", "Modules", "Error Handling", "Performance", "Security"],
        completed: false,
        icon: "js",
        description: "Master closures, promises, async/await, and modern ES6+ features. Build complex applications with confidence.",
        students: 1800,
        rating: 4.9
    },
    {
        id: 3,
        name: "Python Programming",
        instructor: "Emily Brown",
        duration: "12 weeks",
        level: "Intermediate",
        lessons: ["Python Basics", "Data Structures", "File Handling", "OOP Concepts", "Modules & Packages", "Error Handling", "Regular Expressions", "Database Connection", "Web Scraping", "APIs"],
        completed: false,
        icon: "python",
        description: "From basics to advanced concepts. Learn data structures, OOP, file handling, and real-world applications.",
        students: 2100,
        rating: 4.7
    }
];

// Quiz questions for Web Development Fundamentals (15 questions)
const webDevQuiz = [
    {
        id: 1,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "Which tag is used to create a hyperlink in HTML?",
        options: ["<link>", "<a>", "<href>", "<nav>"],
        correct: 1
    },
    {
        id: 3,
        question: "What is the correct CSS syntax to change text color to red?",
        options: ["text-color: red;", "font-color: red;", "color: red;", "text: red;"],
        correct: 2
    },
    {
        id: 4,
        question: "Which JavaScript method adds an element at the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        id: 5,
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        id: 6,
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "style", "font", "styles"],
        correct: 1
    },
    {
        id: 7,
        question: "What is the correct way to comment in JavaScript?",
        options: ["<!-- comment -->", "// comment", "/* comment */", "Both B and C"],
        correct: 3
    },
    {
        id: 8,
        question: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "background-color", "color-background", "background"],
        correct: 1
    },
    {
        id: 9,
        question: "What is the correct HTML for creating a checkbox?",
        options: ["<input type='check'>", "<checkbox>", "<input type='checkbox'>", "<check>"],
        correct: 2
    },
    {
        id: 10,
        question: "Which JavaScript function is used to print content to the console?",
        options: ["print()", "console.log()", "log.console()", "write()"],
        correct: 1
    },
    {
        id: 11,
        question: "What is the default position property in CSS?",
        options: ["relative", "absolute", "fixed", "static"],
        correct: 3
    },
    {
        id: 12,
        question: "Which HTML tag is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<list>", "<li>"],
        correct: 1
    },
    {
        id: 13,
        question: "What does the 'typeof' operator do in JavaScript?",
        options: [
            "Returns the type of a variable",
            "Converts variable type",
            "Checks if variable exists",
            "Creates new type"
        ],
        correct: 0
    },
    {
        id: 14,
        question: "Which CSS property controls the text size?",
        options: ["text-size", "font-size", "size", "text-style"],
        correct: 1
    },
    {
        id: 15,
        question: "What is the correct HTML for creating a text input field?",
        options: ["<input type='text'>", "<textfield>", "<input type='textfield'>", "<text>"],
        correct: 0
    }
];

// Quiz questions for Advanced JavaScript (15 questions)
const advancedJsQuiz = [
    {
        id: 1,
        question: "What is a closure in JavaScript?",
        options: [
            "A function with access to its outer scope",
            "A way to close the browser",
            "A type of loop",
            "An error handling method"
        ],
        correct: 0
    },
    {
        id: 2,
        question: "What does the 'this' keyword refer to in JavaScript?",
        options: [
            "The current function",
            "The global object",
            "The object that owns the function",
            "The parent element"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "Which method is used to handle promises in JavaScript?",
        options: [".then()", ".catch()", ".finally()", "All of the above"],
        correct: 3
    },
    {
        id: 4,
        question: "What is the purpose of async/await?",
        options: [
            "To write synchronous code",
            "To handle asynchronous operations",
            "To create loops",
            "To define variables"
        ],
        correct: 1
    },
    {
        id: 5,
        question: "What is a Promise in JavaScript?",
        options: [
            "A guarantee to execute code",
            "An object representing eventual completion",
            "A type of callback",
            "A debugging tool"
        ],
        correct: 1
    },
    {
        id: 6,
        question: "Which operator is used for strict equality comparison?",
        options: ["==", "===", "=", "!="],
        correct: 1
    },
    {
        id: 7,
        question: "What is the spread operator syntax?",
        options: ["...", "..", "$$", "++"],
        correct: 0
    },
    {
        id: 8,
        question: "What is a pure function?",
        options: [
            "A function that returns the same output for same input",
            "A function that modifies global state",
            "A function with side effects",
            "A function that uses 'this'"
        ],
        correct: 0
    },
    {
        id: 9,
        question: "What is event delegation?",
        options: [
            "Assigning events to parent elements",
            "Creating new events",
            "Removing event listeners",
            "Stopping event propagation"
        ],
        correct: 0
    },
    {
        id: 10,
        question: "What is the purpose of Map in JavaScript?",
        options: [
            "To transform arrays",
            "To store key-value pairs",
            "To loop through objects",
            "To filter data"
        ],
        correct: 1
    },
    {
        id: 11,
        question: "What is hoisting in JavaScript?",
        options: [
            "Moving declarations to the top",
            "Lifting variables",
            "Raising errors",
            "Elevating functions"
        ],
        correct: 0
    },
    {
        id: 12,
        question: "What is the difference between null and undefined?",
        options: [
            "They are the same",
            "null is assigned, undefined means not assigned",
            "undefined is assigned, null means not assigned",
            "Both represent absence of value"
        ],
        correct: 1
    },
    {
        id: 13,
        question: "What is a callback function?",
        options: [
            "A function passed as an argument",
            "A function that calls back",
            "A recursive function",
            "An async function"
        ],
        correct: 0
    },
    {
        id: 14,
        question: "What is the event loop?",
        options: [
            "A loop for events",
            "Handles asynchronous callbacks",
            "DOM event handler",
            "Loop through arrays"
        ],
        correct: 1
    },
    {
        id: 15,
        question: "What is the purpose of 'use strict'?",
        options: [
            "Enforces stricter parsing",
            "Makes code faster",
            "Enables new features",
            "Disables warnings"
        ],
        correct: 0
    }
];

// Quiz questions for Python Programming (15 questions)
const pythonQuiz = [
    {
        id: 1,
        question: "What is Python?",
        options: [
            "A snake",
            "A programming language",
            "An IDE",
            "A database"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "How do you print in Python?",
        options: [
            "console.log()",
            "print()",
            "echo()",
            "System.out.println()"
        ],
        correct: 1
    },
    {
        id: 3,
        question: "What is a list in Python?",
        options: [
            "An ordered collection",
            "A function",
            "A loop",
            "A conditional"
        ],
        correct: 0
    },
    {
        id: 4,
        question: "How do you define a function in Python?",
        options: [
            "function myFunc():",
            "def myFunc():",
            "func myFunc():",
            "define myFunc():"
        ],
        correct: 1
    },
    {
        id: 5,
        question: "What is a dictionary in Python?",
        options: [
            "A book of words",
            "Key-value pairs",
            "A type of list",
            "A function"
        ],
        correct: 1
    },
    {
        id: 6,
        question: "What does len() do?",
        options: [
            "Returns length",
            "Makes strings longer",
            "Counts characters",
            "All of the above"
        ],
        correct: 0
    },
    {
        id: 7,
        question: "How do you handle exceptions in Python?",
        options: [
            "try-catch",
            "try-except",
            "catch-throw",
            "error-handle"
        ],
        correct: 1
    },
    {
        id: 8,
        question: "What is a class in Python?",
        options: [
            "A blueprint for objects",
            "A function",
            "A variable type",
            "A module"
        ],
        correct: 0
    },
    {
        id: 9,
        question: "What is pip?",
        options: [
            "Python package manager",
            "Python interpreter",
            "Python IDE",
            "Python debugger"
        ],
        correct: 0
    },
    {
        id: 10,
        question: "How do you comment in Python?",
        options: [
            "// comment",
            "/* comment */",
            "# comment",
            "<!-- comment -->"
        ],
        correct: 2
    },
    {
        id: 11,
        question: "What is a tuple?",
        options: [
            "Immutable list",
            "Mutable list",
            "A function",
            "A loop"
        ],
        correct: 0
    },
    {
        id: 12,
        question: "What does import do?",
        options: [
            "Imports modules",
            "Exports code",
            "Creates files",
            "Deletes code"
        ],
        correct: 0
    },
    {
        id: 13,
        question: "What is a virtual environment?",
        options: [
            "Isolated Python environment",
            "Virtual reality",
            "Cloud storage",
            "Online compiler"
        ],
        correct: 0
    },
    {
        id: 14,
        question: "What is a lambda function?",
        options: [
            "Anonymous function",
            "Named function",
            "Recursive function",
            "Built-in function"
        ],
        correct: 0
    },
    {
        id: 15,
        question: "What is a generator?",
        options: [
            "Creates sequences lazily",
            "Generates random numbers",
            "Creates lists",
            "Makes copies"
        ],
        correct: 0
    }
];

// Map quizzes to courses
const courseQuizzes = {
    1: webDevQuiz,  // Web Development Fundamentals
    2: advancedJsQuiz,  // Advanced JavaScript
    3: pythonQuiz  // Python Programming
};

// User data
const userProfile = {
    name: "Jaya Prakash",
    email: "jayaprakash@gmail.com",
    joinDate: "2026-12-17"
};