// Web Storage management using SessionStorage

// Initialize storage with default data if empty
function initializeStorage() {
    try {
        // Check if quiz results exist, if not create empty array
        if (!sessionStorage.getItem('quizResults')) {
            sessionStorage.setItem('quizResults', JSON.stringify([]));
        }
        
        // Check if completed courses exist, if not create empty array
        if (!sessionStorage.getItem('completedCourses')) {
            sessionStorage.setItem('completedCourses', JSON.stringify([]));
        }
        
        // Check if user profile exists, if not create default
        if (!sessionStorage.getItem('userProfile')) {
            const defaultProfile = {
                name: "Jaya Prakash",
                email: "jayaprakash@gmail.com",
                joinDate: "2024-01-15"
            };
            sessionStorage.setItem('userProfile', JSON.stringify(defaultProfile));
        }
        
        // Check if current session info exists
        if (!sessionStorage.getItem('sessionInfo')) {
            const sessionInfo = {
                sessionId: Date.now(),
                startTime: new Date().toISOString(),
                pageViews: 1
            };
            sessionStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
        } else {
            // Update page views
            const sessionInfo = JSON.parse(sessionStorage.getItem('sessionInfo'));
            sessionInfo.pageViews = (sessionInfo.pageViews || 0) + 1;
            sessionStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
        }
        
        console.log('Session storage initialized successfully');
    } catch (error) {
        console.error('Error initializing session storage:', error);
    }
}

// Call initialization immediately
initializeStorage();

// Save quiz result to sessionStorage
function saveQuizResult(score, totalQuestions, grade, courseName) {
    try {
        // Get existing results or initialize empty array
        let quizResults = [];
        const storedResults = sessionStorage.getItem('quizResults');
        
        if (storedResults) {
            quizResults = JSON.parse(storedResults);
        }
        
        // Ensure quizResults is an array
        if (!Array.isArray(quizResults)) {
            quizResults = [];
        }
        
        const result = {
            id: Date.now(),
            date: new Date().toISOString(),
            courseId: currentCourseId,
            courseName: courseName,
            score: score,
            totalQuestions: totalQuestions,
            percentage: (score / totalQuestions) * 100,
            grade: grade,
            passed: (score / totalQuestions) * 100 >= 60
        };
        
        quizResults.push(result);
        sessionStorage.setItem('quizResults', JSON.stringify(quizResults));
        
        // If score is passing (>=60%), mark course as completed
        if (result.passed && currentCourseId) {
            markCourseCompleted(currentCourseId);
        }
        
        console.log('Quiz result saved to session:', result);
        return result;
    } catch (error) {
        console.error('Error saving quiz result:', error);
        return null;
    }
}

// Get all quiz results
function getQuizResults() {
    try {
        const results = sessionStorage.getItem('quizResults');
        if (!results) return [];
        
        const parsedResults = JSON.parse(results);
        return Array.isArray(parsedResults) ? parsedResults : [];
    } catch (error) {
        console.error('Error getting quiz results:', error);
        return [];
    }
}

// Get quiz results for specific course
function getCourseQuizResults(courseId) {
    const results = getQuizResults();
    return results.filter(result => result.courseId === courseId);
}

// Get best score for a course
function getBestCourseScore(courseId) {
    const results = getCourseQuizResults(courseId);
    if (results.length === 0) return null;
    
    const bestResult = results.reduce((best, current) => 
        current.percentage > best.percentage ? current : best
    );
    
    return bestResult;
}

// Save completed course
function markCourseCompleted(courseId) {
    try {
        // Get existing completed courses
        let completedCourses = [];
        const stored = sessionStorage.getItem('completedCourses');
        
        if (stored) {
            completedCourses = JSON.parse(stored);
        }
        
        // Ensure it's an array
        if (!Array.isArray(completedCourses)) {
            completedCourses = [];
        }
        
        if (!completedCourses.includes(courseId)) {
            completedCourses.push(courseId);
            sessionStorage.setItem('completedCourses', JSON.stringify(completedCourses));
            
            // Update course completion in courses array
            const courseIndex = courses.findIndex(c => c.id === courseId);
            if (courseIndex !== -1) {
                courses[courseIndex].completed = true;
            }
            
            console.log('Course marked as completed in session:', courseId);
        }
        
        return completedCourses;
    } catch (error) {
        console.error('Error marking course as completed:', error);
        return [];
    }
}

// Get completed courses
function getCompletedCourses() {
    try {
        const stored = sessionStorage.getItem('completedCourses');
        if (!stored) return [];
        
        const completedIds = JSON.parse(stored);
        if (!Array.isArray(completedIds)) return [];
        
        return courses.filter(course => completedIds.includes(course.id));
    } catch (error) {
        console.error('Error getting completed courses:', error);
        return [];
    }
}

// Get completed course IDs
function getCompletedCourseIds() {
    try {
        const stored = sessionStorage.getItem('completedCourses');
        if (!stored) return [];
        
        const completedIds = JSON.parse(stored);
        return Array.isArray(completedIds) ? completedIds : [];
    } catch (error) {
        console.error('Error getting completed course IDs:', error);
        return [];
    }
}

// Calculate overall progress
function calculateOverallProgress() {
    const completedIds = getCompletedCourseIds();
    return courses.length > 0 ? (completedIds.length / courses.length) * 100 : 0;
}

// Clear all session storage (for testing only)
function clearAllSessionData() {
    if (confirm('Are you sure you want to clear all data in this session?')) {
        sessionStorage.removeItem('quizResults');
        sessionStorage.removeItem('completedCourses');
        sessionStorage.removeItem('userProfile');
        sessionStorage.removeItem('sessionInfo');
        initializeStorage(); // Re-initialize with defaults
        console.log('All session data cleared and reinitialized');
        location.reload(); // Reload to reflect changes
    }
}

// Get average quiz score
function getAverageQuizScore() {
    const results = getQuizResults();
    if (results.length === 0) return 0;
    
    const total = results.reduce((sum, result) => sum + (result.percentage || 0), 0);
    return Math.round(total / results.length);
}

// Get recent quiz results (last 5)
function getRecentQuizResults() {
    const results = getQuizResults();
    return results.slice(-5).reverse();
}

// Get user profile
function getUserProfile() {
    try {
        const profile = sessionStorage.getItem('userProfile');
        if (profile) {
            return JSON.parse(profile);
        }
    } catch (error) {
        console.error('Error getting user profile:', error);
    }
    
    // Return default if not found
    return {
        name: "Jaya Prakash",
        email: "jayaprakash@gmail.com",
        joinDate: "2024-01-15"
    };
}

// Save user profile
function saveUserProfile(profile) {
    try {
        sessionStorage.setItem('userProfile', JSON.stringify(profile));
        console.log('User profile saved to session:', profile);
    } catch (error) {
        console.error('Error saving user profile:', error);
    }
}

// Update user profile
function updateUserProfile(name, email) {
    const profile = getUserProfile();
    profile.name = name || profile.name;
    profile.email = email || profile.email;
    saveUserProfile(profile);
    return profile;
}

// Get session information
function getSessionInfo() {
    try {
        const info = sessionStorage.getItem('sessionInfo');
        if (info) {
            return JSON.parse(info);
        }
    } catch (error) {
        console.error('Error getting session info:', error);
    }
    
    return {
        sessionId: Date.now(),
        startTime: new Date().toISOString(),
        pageViews: 1
    };
}

// Check if this is a new session
function isNewSession() {
    const info = getSessionInfo();
    return info.pageViews === 1;
}

// Get session duration in seconds
function getSessionDuration() {
    const info = getSessionInfo();
    const startTime = new Date(info.startTime).getTime();
    const currentTime = new Date().getTime();
    return Math.floor((currentTime - startTime) / 1000);
}