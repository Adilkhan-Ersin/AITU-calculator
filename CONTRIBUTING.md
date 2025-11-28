<!-- # 🤝 Contributing to AITU Grade Calculator

Thank you for considering contributing to the AITU Grade Calculator! This open-source project thrives on community feedback and contributions. Whether you're fixing bugs, adding new university grading rules, or suggesting a new feature, your help is welcome.

## Code of Conduct

Please note that this project is governed by our **Code of Conduct**. By participating, you are expected to uphold this code.

## How to Contribute

We encourage contributions through **GitHub Pull Requests (PRs)**. The general workflow is as follows:

### 1. Get Set Up

* **Fork** the repository to your own GitHub account.
* **Clone** the forked repository to your local machine:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/](https://github.com/YOUR_USERNAME/)[PROJECT_NAME].git
    ```
* **Create a new branch** for your work. Use a descriptive name like `feature/add-gpa-support` or `fix/rounding-error`:
    ```bash
    git checkout -b your-descriptive-branch-name
    ```

### 2. Make Your Changes

* Make your changes, fixes, or additions to the code.
* **Keep your code clean and well-commented.** This is especially important for complex grading logic!
* If you're adding a new feature, consider how it will be used and how it affects existing functionality.

### 3. Test Your Changes

* Ensure that all existing features of the calculator still work after your changes.
* If you introduced new functionality, please include **tests** (if the project has a test suite) or manually verify the calculations are correct.

### 4. Commit and Push

* Commit your changes using a clear, descriptive commit message. A good commit message uses the imperative mood:
    ```bash
    # Bad: Fixed a bug with rounding
    # Good: Fix: Correct weighted grade rounding error
    git commit -m "Feat: Add support for letter grade conversion"
    ```
* Push your changes to your fork:
    ```bash
    git push origin your-descriptive-branch-name
    ```

### 5. Submit a Pull Request (PR)

* Go to the original repository on GitHub.
* Click the **"Compare & pull request"** button for your newly pushed branch.
* Fill out the Pull Request template:
    * **Title:** Summarize the changes (e.g., "Fix: Grade table display on mobile").
    * **Description:** Explain the problem you solved or the feature you added. Reference any related issues (e.g., "Closes #15").

## Reporting Bugs and Suggesting Enhancements

If you find a bug or have an idea for a new feature, but aren't ready to contribute code, please use the **GitHub Issues** tracker.

### 🐛 Bug Reports

When reporting a bug, please include:

1.  A **clear and concise title**.
2.  The **steps to reproduce** the bug.
3.  The **expected outcome** and the **actual outcome**.
4.  Any screenshots or code snippets that might help.

### ✨ Feature Suggestions

When suggesting a new feature or enhancement:

1.  Explain what the feature is and **why** it would be useful (e.g., "It would help students at X university because...").
2.  Describe the **high-level implementation idea** if you have one. -->

# 🤝 Contributing to AITU Grade Calculator

Thank you for considering contributing to the AITU Grade Calculator! This open-source project thrives on community feedback and contributions. Whether you're fixing bugs, adding new university grading rules, or suggesting a new feature, your help is welcome.

## Code of Conduct

Please note that this project is governed by our **Code of Conduct**. By participating, you are expected to uphold this code.

## 🌳 The Workflow Strategy

To keep the project stable, we use a specific workflow:
* **`main`**: This branch is for production (the live website). We generally do not touch this directly.
* **`develop`**: This is our "beta" branch. **All Pull Requests should be directed here.**
* **`feature/...`**: This is where you work. You create a branch off `develop`, do your work, and merge it back.

---

## 🚀 How to Contribute

We encourage contributions through **GitHub Pull Requests (PRs)**. Please follow these steps to avoid conflicts and keep the history clean.

### 1. Get Set Up (One Time Only)

1.  **Fork** the repository to your own GitHub account (click the "Fork" button at the top right of this page).
2.  **Clone** your forked repository to your local machine:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/AITU-calculator.git](https://github.com/YOUR_USERNAME/AITU-calculator.git)
    cd AITU-calculator
    ```
3.  **Add the Upstream Remote**: This connects your local folder to the original repository so you can get updates.
    ```bash
    git remote add upstream [https://github.com/Adlkhy/AITU-calculator.git](https://github.com/Adlkhy/AITU-calculator.git)
    ```

### 2. Start a New Task (Daily Workflow)

Before you start coding, **always sync** to make sure you aren't working on old code. This prevents conflicts!

1.  **Switch to develop and pull the latest changes:**
    ```bash
    git checkout develop
    git pull upstream develop
    ```
2.  **Create a new branch** for your specific task. Use a descriptive name like `feature/add-gpa-support` or `fix/rounding-error`:
    ```bash
    git checkout -b feature/your-feature-name
    ```

### 3. Make Your Changes

* Make your changes, fixes, or additions to the code.
* **Keep your code clean and well-commented.** This is especially important for complex grading logic!
* If you're adding a new feature, consider how it will be used and how it affects existing functionality.

### 4. Test Your Changes

* Ensure that all existing features of the calculator still work after your changes.
* If you introduced new functionality, please manually verify the calculations are correct.

### 5. Commit and Push

1.  **Stage your changes:**
    ```bash
    git add .
    ```
2.  **Commit** using a clear message. We use the imperative mood (like you are giving an order):
    ```bash
    # Good examples:
    git commit -m "Feat: Add support for letter grade conversion"
    git commit -m "Fix: Correct rounding error in final calculation"
    git commit -m "Style: Update dark mode colors"
    ```
3.  **Push** your branch to *your* fork (origin):
    ```bash
    git push origin feature/your-feature-name
    ```

### 6. Submit a Pull Request (PR)

1.  Go to the **original repository** on GitHub.
2.  You should see a prompt to "Compare & pull request".
3.  **Important:** Change the "base" branch to **`develop`** (not `main`).
4.  Fill out the Pull Request template:
    * **Title:** Summarize the changes.
    * **Description:** Explain the problem you solved. Reference any related issues (e.g., "Closes #15").

---

## Reporting Bugs and Suggesting Enhancements

If you find a bug or have an idea for a new feature, but aren't ready to contribute code, please use the **GitHub Issues** tracker.

### 🐛 Bug Reports
When reporting a bug, please include:
1.  A **clear and concise title**.
2.  The **steps to reproduce** the bug.
3.  The **expected outcome** and the **actual outcome**.

### ✨ Feature Suggestions
1.  Explain what the feature is and **why** it would be useful.
2.  Describe the **high-level implementation idea** if you have one.