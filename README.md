Smart Job & Hiring Workflow System (Backend)

A production-oriented Node.js backend application that simulates a real-world hiring platform.
The system supports role-based access control, secure authentication, and a multi-stage job application workflow, ensuring data integrity and realistic hiring processes.

🔑 Key Features
JWT-based Authentication with secure password hashing
Role-Based Authorization (RBAC) for Admin, Employer, and Candidate
Job Management APIs (create, update, close jobs) restricted to employers
Application Workflow Engine with controlled status transitions
APPLIED → SHORTLISTED → INTERVIEW → HIRED / REJECTED
Duplicate Application Prevention using database-level constraints
Centralized Error Handling and clean service-based architecture

🛠 Tech Stack
Node.js, Express.js
MongoDB, Mongoose
JWT Authentication
bcrypt for password hashing

🧩 Architecture Highlights
Clean separation of routes, controllers, services, and models
Business rules enforced at the backend and database level
Designed with real-world hiring workflows in mind rather than simple CRUD

🎯 Purpose
This project was built to demonstrate backend system design, secure authentication, and business-driven workflow implementation, following industry best practices suitable for an entry-level backend developer role.
