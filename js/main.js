// Main JavaScript for dashboard, courses, and profile pages

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'dashboard.html':
            initDashboard();
            break;
        case 'courses.html':
            initCourses();
            break;
        case 'profile.html':
            initProfile();
            break;
        case 'index.html':
        case '':
            initHomePage();
            break;
    }
});

// Home page initialization
function initHomePage() {
    displayPopularCourses();
}

// Display popular courses on home page
function displayPopularCourses() {
    const container = document.getElementById('popularCourses');
    if (!container) return;
    
    // Show first 3 courses as popular
    const popularCourses = courses.slice(0, 3);
    
    container.innerHTML = popularCourses.map(course => `
        <div class="col-md-4">
            <div class="course-card">
                <div class="course-header">
                    <i class="fas fa-${course.icon}"></i>
                    <h3>${course.name}</h3>
                </div>
                <div class="course-body">
                    <div class="course-meta">
                        <span><i class="fas fa-user-tie"></i> ${course.instructor}</span>
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    </div>
                    <p class="course-description">${course.description}</p>
                    <div class="course-footer">
                        <span class="course-level-badge level-${course.level.toLowerCase()}">${course.level}</span>
                        <span class="course-price">Free</span>
                    </div>
                    <button onclick="location.href='courses.html'" class="enroll-btn mt-3">
                        <i class="fas fa-eye"></i> View Course
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Dashboard initialization
function initDashboard() {
    displayCourseTable();
    updateDashboardStats();
    displayRecentCourses();
}

// Display courses in table
function displayCourseTable() {
    const tableBody = document.getElementById('courseTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = courses.map(course => `
        <tr>
            <td>
                <div class="d-flex align-items-center">
                    <i class="fas fa-${course.icon} me-2 text-primary"></i>
                    ${course.name}
                </div>
            </td>
            <td>${course.duration}</td>
            <td>${course.lessons.length} lessons</td>
            <td>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar bg-primary" role="progressbar" 
                         style="width: ${course.completed ? '100' : '0'}%"></div>
                </div>
            </td>
        </tr>
    `).join('');
}

// Display recent courses on dashboard
function displayRecentCourses() {
    const container = document.getElementById('recentCourses');
    if (!container) return;
    
    const recentCourses = courses.slice(0, 2);
    
    container.innerHTML = recentCourses.map(course => `
        <div class="col-md-6">
            <div class="course-card mini">
                <div class="course-body">
                    <h5>${course.name}</h5>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="course-level-badge level-${course.level.toLowerCase()}">${course.level}</span>
                        <button onclick="enrollCourse(${course.id})" class="btn btn-sm btn-outline-primary">
                            ${course.completed ? 'Completed' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Update dashboard statistics
function updateDashboardStats() {
    const completedCourses = getCompletedCourses();
    const progressElement = document.getElementById('overallProgress');
    const progressText = document.getElementById('progressText');
    const completedCount = document.getElementById('completedCount');
    const avgScore = document.getElementById('avgScore');
    
    if (progressElement) {
        const progress = (completedCourses.length / courses.length) * 100;
        progressElement.value = progress;
        if (progressText) {
            progressText.textContent = `${Math.round(progress)}% Complete`;
        }
    }
    
    if (completedCount) {
        completedCount.textContent = completedCourses.length;
    }
    
    if (avgScore) {
        avgScore.textContent = getAverageQuizScore() + '%';
    }
}

// Courses page initialization
function initCourses() {
    displayCourseCards();
    displayCourseDetails();
}

// Display course cards with beautiful design
function displayCourseCards() {
    const courseCards = document.getElementById('courseCards');
    if (!courseCards) return;
    
    courseCards.innerHTML = courses.map(course => `
        <div class="course-card" data-course-id="${course.id}">
            <div class="course-header">
                <i class="fas fa-${course.icon}"></i>
                <h3>${course.name}</h3>
            </div>
            <div class="course-body">
                <div class="course-meta">
                    <span><i class="fas fa-user-tie"></i> ${course.instructor}</span>
                    <span><i class="fas fa-clock"></i> ${course.duration}</span>
                </div>
                
                <div class="course-info">
                    <p><i class="fas fa-book-open"></i> ${course.lessons.length} Interactive Lessons</p>
                    <p><i class="fas fa-users"></i> ${course.students}+ Students Enrolled</p>
                    <p><i class="fas fa-star text-warning"></i> ${course.rating} (500+ Reviews)</p>
                </div>
                
                <div class="course-footer">
                    <span class="course-level-badge level-${course.level.toLowerCase()}">
                        <i class="fas fa-signal me-1"></i>${course.level}
                    </span>
                    <span class="course-price">
                        <i class="fas fa-tag me-1"></i>Free
                    </span>
                </div>
                
                <button onclick="enrollCourse(${course.id})" 
                        class="enroll-btn mt-3 ${course.completed ? 'completed' : ''}">
                    <i class="fas ${course.completed ? 'fa-check-circle' : 'fa-graduation-cap'} me-2"></i>
                    ${course.completed ? 'Completed' : 'Enroll Now'}
                </button>
            </div>
        </div>
    `).join('');
}

// Display course details table
function displayCourseDetails() {
    const tableBody = document.getElementById('courseDetailsTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = courses.map(course => `
        <tr onclick="showCourseDetails(${course.id})" style="cursor: pointer;">
            <td>
                <div class="d-flex align-items-center">
                    <i class="fas fa-${course.icon} me-2 text-primary"></i>
                    <strong>${course.name}</strong>
                </div>
            </td>
            <td>${course.instructor}</td>
            <td>
                <span class="course-level-badge level-${course.level.toLowerCase()}">${course.level}</span>
            </td>
            <td>
                <ol class="lesson-preview-list" style="margin: 0; padding-left: 20px;">
                    ${course.lessons.slice(0, 2).map(lesson => `<li>${lesson}</li>`).join('')}
                    ${course.lessons.length > 2 ? '<li>...</li>' : ''}
                </ol>
            </td>
        </tr>
    `).join('');
}

// Show course details
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        alert(`Course: ${course.name}\nInstructor: ${course.instructor}\nLessons: ${course.lessons.join(', ')}`);
    }
}

// Enroll in course
function enrollCourse(courseId) {
    markCourseCompleted(courseId);
    displayCourseCards(); // Refresh cards
    displayCourseDetails(); // Refresh table
    
    // Show success message
    showEnrollSuccess();
}

// Show enrollment success message
function showEnrollSuccess() {
    const toast = document.createElement('div');
    toast.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    toast.style.zIndex = '9999';
    toast.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Successfully enrolled in course!
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Profile page initialization
function initProfile() {
    displayUserInfo();
    displayCompletedCourses();
    displayQuizHistory();
    displayUserStats();
}

// Display user info
function displayUserInfo() {
    const learnerName = document.getElementById('learnerName');
    const learnerEmail = document.getElementById('learnerEmail');
    
    if (learnerName) learnerName.textContent = userProfile.name;
    if (learnerEmail) learnerEmail.textContent = userProfile.email;
}

// Display completed courses in profile
function displayCompletedCourses() {
    const completedList = document.getElementById('completedCoursesList');
    if (!completedList) return;
    
    const completedCourses = getCompletedCourses();
    
    if (completedCourses.length === 0) {
        completedList.innerHTML = '<li class="list-group-item text-center py-4">No courses completed yet. Start learning today!</li>';
        return;
    }
    
    completedList.innerHTML = completedCourses.map(course => `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <i class="fas fa-${course.icon} me-2 text-primary"></i>
                ${course.name}
            </div>
            <span class="badge bg-success">Completed</span>
        </li>
    `).join('');
}

// Display user statistics
function displayUserStats() {
    const statsContainer = document.getElementById('userStats');
    if (!statsContainer) return;
    
    const completedCourses = getCompletedCourses();
    const quizResults = getQuizResults();
    const avgScore = getAverageQuizScore();
    
    statsContainer.innerHTML = `
        <div class="row g-3">
            <div class="col-6">
                <div class="stat-box">
                    <h4>${completedCourses.length}</h4>
                    <small>Courses Completed</small>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-box">
                    <h4>${quizResults.length}</h4>
                    <small>Quizzes Taken</small>
                </div>
            </div>
            <div class="col-12">
                <div class="stat-box">
                    <h4>${avgScore}%</h4>
                    <small>Average Quiz Score</small>
                </div>
            </div>
        </div>
    `;
}

// Display quiz history in profile
function displayQuizHistory() {
    const historyTable = document.getElementById('quizHistoryTable');
    if (!historyTable) return;
    
    const results = getRecentQuizResults();
    
    if (results.length === 0) {
        historyTable.innerHTML = '<tr><td colspan="4" class="text-center py-4">No quiz attempts yet. Take a quiz to test your knowledge!</td></tr>';
        return;
    }
    
    historyTable.innerHTML = results.map(result => `
        <tr>
            <td>${new Date(result.date).toLocaleDateString()}</td>
            <td>${result.courseName || 'General Quiz'}</td>
            <td>${result.score}/${result.totalQuestions} (${Math.round(result.percentage)}%)</td>
            <td>
                <span class="badge ${result.passed ? 'bg-success' : 'bg-danger'}">
                    ${result.grade}
                </span>
            </td>
        </tr>
    `).join('');
}








// Profile page initialization
function initProfile() {
    // Load user profile from localStorage
    const savedProfile = getUserProfile();
    
    // Update userProfile object
    userProfile.name = savedProfile.name;
    userProfile.email = savedProfile.email;
    
    displayUserInfo();
    displayCompletedCourses();
    displayQuizHistory();
    displayUserStats();
}

// Display user info
function displayUserInfo() {
    const learnerName = document.getElementById('learnerName');
    const learnerEmail = document.getElementById('learnerEmail');
    const joinDate = document.getElementById('joinDate');
    
    const profile = getUserProfile();
    
    if (learnerName) learnerName.textContent = profile.name;
    if (learnerEmail) learnerEmail.textContent = profile.email;
    if (joinDate) joinDate.textContent = `Joined ${profile.joinDate}`;
}

// Display quiz history in profile
function displayQuizHistory() {
    const historyTable = document.getElementById('quizHistoryTable');
    if (!historyTable) return;
    
    const results = getRecentQuizResults();
    
    if (results.length === 0) {
        historyTable.innerHTML = '<tr><td colspan="4" class="text-center py-4">No quiz attempts yet. Take a quiz to test your knowledge!</td></tr>';
        return;
    }
    
    historyTable.innerHTML = results.map(result => `
        <tr>
            <td>${new Date(result.date).toLocaleDateString()}</td>
            <td>${result.courseName || 'General Quiz'}</td>
            <td>${result.score}/${result.totalQuestions} (${Math.round(result.percentage)}%)</td>
            <td>
                <span class="badge ${result.passed ? 'bg-success' : 'bg-danger'}">
                    ${result.grade}
                </span>
            </td>
        </tr>
    `).join('');
}

// Display user statistics
function displayUserStats() {
    const statsContainer = document.getElementById('userStats');
    if (!statsContainer) return;
    
    const completedCourses = getCompletedCourses();
    const quizResults = getQuizResults();
    const avgScore = getAverageQuizScore();
    
    statsContainer.innerHTML = `
        <div class="row g-3">
            <div class="col-6">
                <div class="stat-box">
                    <h4>${completedCourses.length}</h4>
                    <small>Courses Completed</small>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-box">
                    <h4>${quizResults.length}</h4>
                    <small>Quizzes Taken</small>
                </div>
            </div>
            <div class="col-12">
                <div class="stat-box">
                    <h4>${avgScore}%</h4>
                    <small>Average Quiz Score</small>
                </div>
            </div>
        </div>
    `;
}







function debugSessionStorage() {
    console.log('=== Session Storage Contents ===');
    console.log('Quiz Results:', getQuizResults());
    console.log('Completed Courses:', getCompletedCourses());
    console.log('User Profile:', getUserProfile());
    console.log('Session Info:', getSessionInfo());
    
    // Show alert with summary
    const results = getQuizResults();
    const completed = getCompletedCourses();
    const info = getSessionInfo();
    
    alert(`Session Storage Summary:
    - Quiz Results: ${results.length} entries
    - Completed Courses: ${completed.length} courses
    - Session Duration: ${getSessionDuration()} seconds
    - Page Views: ${info.pageViews}`);
}











// Make functions globally available
window.enrollCourse = enrollCourse;
window.showCourseDetails = showCourseDetails;



