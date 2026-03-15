// Quiz functionality with multiple course quizzes

// Global variables
let currentQuestions = [];
let userAnswers = [];
let currentCourseId = null;

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('quiz.html') || document.getElementById('quizContent')) {
        // Show course selection
        showCourseSelection();
        setupEventListeners();
    }
});

// Set up event listeners
function setupEventListeners() {
    const submitBtn = document.getElementById('submitQuiz');
    const resetBtn = document.getElementById('resetQuiz');
    
    if (submitBtn) {
        // Remove any existing listeners and add new one
        submitBtn.replaceWith(submitBtn.cloneNode(true));
        document.getElementById('submitQuiz').addEventListener('click', submitQuiz);
    }
    
    if (resetBtn) {
        resetBtn.replaceWith(resetBtn.cloneNode(true));
        document.getElementById('resetQuiz').addEventListener('click', resetQuiz);
    }
}

// Show course selection
function showCourseSelection() {
    const courseSelection = document.getElementById('courseSelection');
    const selectedCourseInfo = document.getElementById('selectedCourseInfo');
    const quizProgressContainer = document.getElementById('quizProgressContainer');
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const quizLoader = document.getElementById('quizLoader');
    
    if (courseSelection) courseSelection.style.display = 'flex';
    if (selectedCourseInfo) selectedCourseInfo.style.display = 'none';
    if (quizProgressContainer) quizProgressContainer.style.display = 'none';
    if (quizContent) quizContent.style.display = 'none';
    if (quizResults) quizResults.style.display = 'none';
    if (quizLoader) quizLoader.style.display = 'none';
}

// Select course for quiz
function selectCourse(courseId) {
    currentCourseId = courseId;
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
        showToast('Course not found', 'error');
        return;
    }
    
    // Hide course selection
    const courseSelection = document.getElementById('courseSelection');
    if (courseSelection) courseSelection.style.display = 'none';
    
    // Show selected course info
    const selectedCourseInfo = document.getElementById('selectedCourseInfo');
    const selectedCourseName = document.getElementById('selectedCourseName');
    if (selectedCourseName) {
        selectedCourseName.innerHTML = `<strong>${course.name}</strong> - 15 Questions Quiz`;
    }
    if (selectedCourseInfo) selectedCourseInfo.style.display = 'block';
    
    // Load quiz for selected course
    loadCourseQuiz(courseId);
}

// Reset course selection
function resetCourseSelection() {
    currentCourseId = null;
    currentQuestions = [];
    userAnswers = [];
    
    // Hide quiz content and results
    const quizContent = document.getElementById('quizContent');
    const quizResults = document.getElementById('quizResults');
    const quizProgressContainer = document.getElementById('quizProgressContainer');
    
    if (quizContent) quizContent.style.display = 'none';
    if (quizResults) quizResults.style.display = 'none';
    if (quizProgressContainer) quizProgressContainer.style.display = 'none';
    
    showCourseSelection();
}

// Load quiz for specific course
async function loadCourseQuiz(courseId) {
    showLoader();
    
    try {
        const questions = await fetchCourseQuiz(courseId);
        currentQuestions = questions;
        userAnswers = new Array(questions.length).fill(null);
        
        // Update quiz title
        const course = courses.find(c => c.id === courseId);
        const quizTitle = document.getElementById('quizTitle');
        if (quizTitle) {
            quizTitle.textContent = `${course.name} Quiz`;
        }
        
        displayQuiz(questions);
        hideLoader();
        
        // Show progress container
        const quizProgressContainer = document.getElementById('quizProgressContainer');
        if (quizProgressContainer) quizProgressContainer.style.display = 'block';
        
        updateProgress();
        setupEventListeners(); // Re-attach event listeners
    } catch (error) {
        console.error('Quiz loading failed:', error);
        showError('Failed to load quiz. Please try again.');
    }
}

// Fetch quiz for specific course
function fetchCourseQuiz(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const quiz = courseQuizzes[courseId];
            if (quiz && quiz.length === 15) {
                // Shuffle questions slightly for variety
                const shuffled = [...quiz].sort(() => Math.random() - 0.3);
                resolve(shuffled);
            } else {
                reject(new Error('Quiz not found'));
            }
        }, 1500);
    });
}

// Display quiz questions
function displayQuiz(questions) {
    const container = document.getElementById('questionsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.dataset.questionIndex = index;
        
        const optionsHtml = q.options.map((option, optIndex) => `
            <label class="option-label ${userAnswers[index] === optIndex ? 'selected' : ''}">
                <input type="radio" 
                       name="q${index}" 
                       value="${optIndex}"
                       ${userAnswers[index] === optIndex ? 'checked' : ''}
                       onchange="handleAnswerChange(${index}, ${optIndex})">
                <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                ${option}
            </label>
        `).join('');
        
        questionDiv.innerHTML = `
            <div class="question-header">
                <span class="question-number">Question ${index + 1} of ${questions.length}</span>
            </div>
            <h5 class="mb-3">${q.question}</h5>
            <div class="options-container">
                ${optionsHtml}
            </div>
        `;
        
        container.appendChild(questionDiv);
    });
    
    // Show quiz content
    const quizContent = document.getElementById('quizContent');
    if (quizContent) quizContent.style.display = 'block';
}

// Handle answer selection
function handleAnswerChange(questionIndex, answerIndex) {
    userAnswers[questionIndex] = answerIndex;
    
    // Update UI
    const questionDiv = document.querySelector(`[data-question-index="${questionIndex}"]`);
    if (questionDiv) {
        const labels = questionDiv.querySelectorAll('.option-label');
        labels.forEach((label, idx) => {
            if (idx === answerIndex) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }
    
    updateProgress();
}

// Update quiz progress
function updateProgress() {
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const progress = (answeredCount / currentQuestions.length) * 100;
    
    const progressBar = document.getElementById('quizProgress');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
    
    if (progressText) {
        progressText.textContent = `${answeredCount}/${currentQuestions.length} Questions Answered`;
    }
}

// Submit quiz
function submitQuiz() {
    console.log('Submit quiz called'); // Debug log
    
    if (!currentQuestions || currentQuestions.length === 0) {
        showToast('No quiz loaded', 'error');
        return;
    }
    
    // Check if all questions are answered
    const unanswered = userAnswers.filter(a => a === null).length;
    
    if (unanswered > 0) {
        showToast(`Please answer all questions. ${unanswered} question(s) remaining.`, 'warning');
        // Scroll to first unanswered question
        const firstUnanswered = userAnswers.findIndex(a => a === null);
        if (firstUnanswered !== -1) {
            const questionDiv = document.querySelector(`[data-question-index="${firstUnanswered}"]`);
            if (questionDiv) {
                questionDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                questionDiv.style.border = '2px solid #ffc107';
                setTimeout(() => {
                    questionDiv.style.border = 'none';
                }, 2000);
            }
        }
        return;
    }
    
    // Calculate score
    const score = calculateScore();
    const percentage = (score / currentQuestions.length) * 100;
    const grade = calculateGrade(percentage);
    
    // Save results with course info
    const course = courses.find(c => c.id === currentCourseId);
    const result = saveQuizResult(score, currentQuestions.length, grade, course.name);
    
    // Display results
    displayResults(score, percentage, grade);
    
    // Show results section
    const quizResults = document.getElementById('quizResults');
    if (quizResults) quizResults.style.display = 'block';
    
    // Scroll to results
    quizResults.scrollIntoView({ behavior: 'smooth' });
    
    showToast('Quiz submitted successfully!', 'success');
    
    // Update dashboard stats if on dashboard page
    if (typeof updateDashboardStats === 'function') {
        updateDashboardStats();
    }
}

// Calculate score
function calculateScore() {
    let score = 0;
    currentQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    return score;
}

// Calculate grade using if-else
function calculateGrade(percentage) {
    if (percentage >= 90) {
        return 'A';
    } else if (percentage >= 80) {
        return 'B';
    } else if (percentage >= 70) {
        return 'C';
    } else if (percentage >= 60) {
        return 'D';
    } else {
        return 'F';
    }
}

// Get feedback message using switch
function getFeedbackMessage(grade) {
    switch(grade) {
        case 'A':
            return 'Excellent work! You have mastered this topic!';
        case 'B':
            return 'Good job! You have a strong understanding.';
        case 'C':
            return 'Fair effort. Consider reviewing some concepts.';
        case 'D':
            return 'You passed, but more practice is recommended.';
        case 'F':
            return 'Keep studying and try again!';
        default:
            return 'Keep learning!';
    }
}

// Display results with detailed review
function displayResults(score, percentage, grade) {
    const scoreDisplay = document.getElementById('scoreDisplay');
    const gradeDisplay = document.getElementById('gradeDisplay');
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    const questionReview = document.getElementById('questionReview');
    
    if (scoreDisplay) {
        scoreDisplay.innerHTML = `
            <div class="score-circle">
                <svg viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#667eea"/>
                            <stop offset="100%" stop-color="#764ba2"/>
                        </linearGradient>
                    </defs>
                    <circle class="bg-circle" cx="50" cy="50" r="40"/>
                    <circle class="progress-circle" cx="50" cy="50" r="40" 
                            style="stroke-dashoffset: ${440 - (440 * percentage / 100)};"/>
                </svg>
                <span class="score-text">${Math.round(percentage)}%</span>
            </div>
            <h3 class="mt-3">Score: ${score}/${currentQuestions.length}</h3>
        `;
    }
    
    if (gradeDisplay) {
        gradeDisplay.innerHTML = `<h4>Grade: ${grade} - ${getFeedbackMessage(grade)}</h4>`;
    }
    
    // Generate question review
    let reviewHtml = '<h5 class="mb-3">Question Review:</h5><div class="review-grid">';
    currentQuestions.forEach((q, index) => {
        const isCorrect = userAnswers[index] === q.correct;
        reviewHtml += `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-question">
                    <span class="review-number">Q${index + 1}</span>
                    <span class="review-indicator">
                        <i class="fas fa-${isCorrect ? 'check-circle text-success' : 'times-circle text-danger'}"></i>
                    </span>
                </div>
                <div class="review-answer">
                    <small>Your answer: ${q.options[userAnswers[index]]}</small>
                    ${!isCorrect ? `<br><small class="text-success">Correct: ${q.options[q.correct]}</small>` : ''}
                </div>
            </div>
        `;
    });
    reviewHtml += '</div>';
    
    if (questionReview) {
        questionReview.innerHTML = reviewHtml;
    }
}

// Reset quiz
function resetQuiz() {
    if (!currentQuestions || !currentQuestions.length) {
        showToast('No quiz to reset', 'warning');
        return;
    }
    
    userAnswers = new Array(currentQuestions.length).fill(null);
    
    // Reset UI
    const labels = document.querySelectorAll('.option-label');
    labels.forEach(label => {
        label.classList.remove('selected');
        const radio = label.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
    });
    
    // Hide results
    const quizResults = document.getElementById('quizResults');
    if (quizResults) quizResults.style.display = 'none';
    
    // Update progress
    updateProgress();
    
    showToast('Quiz reset. You can try again!', 'info');
}

// Helper functions
function showLoader() {
    const loader = document.getElementById('quizLoader');
    const content = document.getElementById('quizContent');
    
    if (loader) loader.style.display = 'block';
    if (content) content.style.display = 'none';
}

function hideLoader() {
    const loader = document.getElementById('quizLoader');
    const content = document.getElementById('quizContent');
    
    if (loader) loader.style.display = 'none';
    if (content) content.style.display = 'block';
}

function showError(message) {
    const loader = document.getElementById('quizLoader');
    if (loader) {
        loader.innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-circle me-2"></i>
                ${message}
                <button class="btn btn-outline-danger btn-sm ms-3" onclick="resetCourseSelection()">
                    Try Again
                </button>
            </div>
        `;
    }
}

function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast
    const toastId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-success' : type === 'warning' ? 'bg-warning' : type === 'error' ? 'bg-danger' : 'bg-info';
    const icon = type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${icon} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    if (toastElement && typeof bootstrap !== 'undefined') {
        const toast = new bootstrap.Toast(toastElement, { autohide: true, delay: 3000 });
        toast.show();
        
        // Remove toast after hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    }
}

// Make functions globally available
window.selectCourse = selectCourse;
window.resetCourseSelection = resetCourseSelection;
window.handleAnswerChange = handleAnswerChange;
window.submitQuiz = submitQuiz;
window.resetQuiz = resetQuiz;