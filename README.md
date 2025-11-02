🧩 Login & Signup System with To-Do List (JavaScript)

A simple yet powerful Login & Signup System connected with a personalized To-Do List, built using HTML, CSS, and JavaScript — all data stored in LocalStorage for each user.

🚀 Features

👤 Signup Page

Full validation for Name, Username, Email, and Password

Prevents duplicate emails or usernames

Redirects to login page after successful registration

🔐 Login Page

Checks user credentials from LocalStorage

Alerts user for wrong email or password

Redirects to personal To-Do List on success

📝 To-Do List

Each user has their own separate tasks

Tasks are saved automatically in LocalStorage

Previous tasks appear automatically on reload

Add, delete,edit and mark tasks as complete

Logout Functionality

Logs out the current user and redirects to login page

🧠 Tech Stack

HTML5

CSS3

JavaScript (ES6+)

LocalStorage API

💡 How It Works

User signs up — data (name, username, email, password) saved in LocalStorage.

On login, user’s credentials are verified.

Redirects to the To-Do list page tied to that user.

All tasks are stored under the logged-in user's key.

Tasks remain persistent even after page reload or logout.
