# E-Learn Platform 🎓

A modern, client-side e-learning platform built with HTML, CSS, Bootstrap, and JavaScript. This multi-page web application allows users to browse courses, take quizzes, track progress, and manage their profile - all without a backend server!

<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1QSCCX2NiaQ4SV5rAZjzx1GASHIO45SWC" alt="E-Learn Platform" width="400"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#license">License</a>
</p>

---

## ✨ Features

### 🎯 Core Functionality
| Feature | Description |
|---------|-------------|
| **📚 Course Management** | Browse courses with detailed information, lessons, and instructor details |
| **📝 Interactive Quizzes** | 3 course-specific quizzes with 15 questions each |
| **📊 Progress Tracking** | Visual progress bars and completion statistics |
| **👤 Profile Management** | View completed courses and quiz history |
| **💾 Session Storage** | Data persists within browser tab session |

### 🚀 Technical Features
- ✅ **Responsive Design** - Mobile-friendly using CSS Grid and Flexbox
- ✅ **Semantic HTML** - Proper structure with header, nav, main, footer
- ✅ **Breadcrumb Navigation** - Hierarchical navigation on all pages
- ✅ **Dynamic Content** - JavaScript-generated content
- ✅ **Async Operations** - Promises and async/await
- ✅ **Session Storage** - Multi-page state management

## 🛠️ Tech Stack

<div align="center">
  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Font Awesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

</div>

## 📁 Project Structure

```
ELearning-platform/
│
├── 📄 index.html              # Landing page
├── 📄 dashboard.html          # User dashboard
├── 📄 courses.html            # Course listing
├── 📄 quiz.html               # Interactive quiz
├── 📄 profile.html            # User profile
├── 📄 contact.html            # Contact form
│
├── 📁 css/
│   └── 📄 style.css           # Main stylesheet
│
├── 📁 js/
│   ├── 📄 data.js             # Course and quiz data
│   ├── 📄 storage.js          # Session storage management
│   ├── 📄 main.js             # Core functionality
│   └── 📄 quiz.js             # Quiz logic
│
└── 📄 README.md               # Project documentation
```

## 📄 Pages Overview

<div align="center">

| Page | Description | Key Features |
|------|-------------|--------------|
| **🏠 Home** | Landing page | Hero section, features, testimonials |
| **📊 Dashboard** | User overview | Progress tracking, stats, recent courses |
| **📚 Courses** | Course catalog | Course cards, details table, enrollment |
| **📝 Quiz** | Interactive tests | 3 quizzes, 15 questions each, detailed results |
| **👤 Profile** | User profile | Completed courses, quiz history, session info |
| **📞 Contact** | Contact form | Form validation, map, FAQ |

</div>

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/e-learning-platform.git

# Navigate to project directory
cd e-learning-platform

# Open with live server (using npx)
npx live-server

# OR using Python
python -m http.server 8000

# OR simply open index.html in your browser
```


## 📖 Usage Guide

### 1. **Browse Courses** 📚
```javascript
// Navigate to Courses page
// View course cards with details
// Click "Enroll Now" to mark as completed
// Check detailed information in table below
```

### 2. **Take

Quizzes** 📝
```javascript
// Go to Quiz page
// Select a course (Web Dev, Advanced JS, or Python)
// Answer all 15 questions
// Submit to see score and grade
// Review incorrect answers
```

### 3. **Track Progress** 📊
```javascript
// Visit Dashboard
// Check overall progress bar
// View completed courses count
// See average quiz score
```

### 4. **Manage Profile** 👤
```javascript
// Go to Profile page
// View personal information
// See completed courses list
// Review quiz history
// Check session statistics
```

## 🎯 Quiz System

### Course Quizzes
<div align="center">

| Course | Level | Questions | Passing Score |
|--------|-------|-----------|---------------|
| **Web Development Fundamentals** | 🟢 Beginner | 15 | 100% |
| **Advanced JavaScript** | 🔴 Advanced | 15 | 100% |
| **Python Programming** | 🟡 Intermediate | 15 | 100% |

</div>

### Grade Calculation
```javascript
Grade A: 90-100%  → "Excellent work!"
Grade B: 80-89%   → "Good job!"
Grade C: 70-79%   → "Fair effort"
Grade D: 60-69%   → "You passed"
Grade F: <60%     → "Keep studying"
```

## 💾 Storage System
The application uses **Session Storage** for data persistence:

```javascript
// Stored Data Structure
{
  quizResults: [
    {
      id: 123456789,
      date: "2024-01-15T10:30:00Z",
      courseName: "Web Development",
      score: 12,
      totalQuestions: 15,
      percentage: 80,
      grade: "B",
      passed: true
    }
  ],
  completedCourses: [1, 2],
  userProfile: {
    name: "Jaya Prakash",
    email: "jayaprakash@gmail.com",
    joinDate: "2024-01-15"
  },
  sessionInfo: {
    sessionId: 123456789,
    startTime: "2024-01-15T10:00:00Z",
    pageViews: 5
  }
}
```


## 📸 Screenshots

<div align="center">
  
### 🖥️ Desktop View

| Home Page | Dashboard | Courses |
|:---------:|:---------:|:-------:|
| <img src="https://drive.google.com/uc?export=view&id=18hrcF-EoPD49Fu5QWVCzUYsEgvNiq9Cd" width="300" alt="Home Page"> | <img src="https://drive.google.com/uc?export=view&id=1wjFJNO1DhNED8Go_lwZ83tTifrjoMjMR" width="300" alt="Dashboard"> | <img src="https://drive.google.com/uc?export=view&id=1xgbDjKoUN9Am6FR0wxYvnT0LT0SjBcBE" width="300" alt="Courses"> |

| Quiz Interface | Quiz Results | Profile Page |
|:--------------:|:------------:|:------------:|
| <img src="https://drive.google.com/uc?export=view&id=1MItO2K236MEsEMh8KxQxGslqrLMLvL35" width="300" alt="Quiz"> | <img src="https://drive.google.com/uc?export=view&id=1YO5wwGTDtlpFUPVuSWAvE_heGE6G4uY5" width="300" alt="Results"> | <img src="https://drive.google.com/uc?export=view&id=1i-BYUlxhzEfPOKi0FWsrhh74cCLKE40t" width="300" alt="Profile"> |

</div>

---


## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Jaya Prakash** - *Initial work* - [GitHub](https://github.com/prkshnarayan)


<div align="center">
  
### 📞 Contact

[![Email](https://img.shields.io/badge/Email-jayaprakashbommisetty2580%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:jayaprakashbommisetty2580@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-PrkshNarayan-blue?style=for-the-badge&logo=google-chrome)](https://prkshnarayan.github.io/Portfolio/)
[![GitHub](https://img.shields.io/badge/GitHub-ELearning--platform-black?style=for-the-badge&logo=github)](https://github.com/prkshnarayan/ELearning-platform)

</div>

---

<div align="center">
  
### ⭐ Star this repository if you find it helpful!

**Happy Learning!** 🚀

</div>
