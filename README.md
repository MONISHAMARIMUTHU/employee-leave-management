# Employee Leave Management System

A full-stack web application developed as a college/company project built with **Java 21**, **Spring Boot 3**, **Spring Security (JWT)**, **MySQL**, and **React.js (Vite)**.

---

## 📌 1. Project Description
The **Employee Leave Management System** streamlines the process of submitting, tracking, and approving employee leave requests. It provides role-based portal access for **Employees** (to apply for leaves, view leave statuses, and manage profiles) and **Administrators** (to manage all employee details, filter leave requests, and approve/reject applications).

---

## ✨ 2. Features

### 👤 Employee Features
- **Registration & Authentication**: Secure registration and BCrypt hashed login with JWT token issuance.
- **Personal Dashboard**: View real-time statistic cards (Total Leaves, Pending, Approved, Rejected).
- **Leave Application**: Apply for Casual, Sick, or Earned leaves with date validation and reason.
- **My Leaves Tracker**: View list of submitted leave requests with visual status badges (`PENDING`, `APPROVED`, `REJECTED`).
- **Profile Management**: View and update personal information (Department, Designation, Phone).

### 🛠️ Admin Features
- **Admin Dashboard**: System-wide statistics for Total Employees, Total Leaves, and status counts.
- **Employee Directory**: Search employees by name or email, view employee details, and delete employee records.
- **Leave Application Management**: View all employee leave applications, filter by status, and Approve/Reject requests with one click.

---

## 🚀 3. Technologies Used

### Backend:
- **Java 21**
- **Spring Boot 3.2.5**
- **Spring Data JPA (Hibernate)**
- **Spring Security**
- **JSON Web Token (JWT - jjwt 0.11.5)**
- **Maven**
- **MySQL Database**

### Frontend:
- **React.js 18**
- **Vite**
- **JavaScript (ES6+)**
- **React Router DOM v6**
- **Axios**
- **Vanilla CSS (Custom responsive theme)**

---

## 📁 4. Project Structure

```
employee-leave-management/
│
├── database.sql                       # Database creation and sample seed script
├── README.md                          # Project documentation
│
├── backend/
│   └── employee-leave-backend/        # Spring Boot Maven Project
│       ├── pom.xml
│       └── src/
│           └── main/
│               ├── java/com/example/employeeleavemanagement/
│               │   ├── EmployeeLeaveManagementApplication.java
│               │   ├── config/        # DataInitializer, CorsConfig
│               │   ├── controller/    # AuthController, EmployeeController, LeaveController
│               │   ├── dto/           # RegisterRequest, LoginRequest, JwtResponse, etc.
│               │   ├── entity/        # Employee, LeaveRequest
│               │   ├── enums/         # Role, LeaveType, LeaveStatus
│               │   ├── repository/    # EmployeeRepository, LeaveRequestRepository
│               │   ├── security/      # JwtUtils, JwtFilter, UserDetailsServiceImpl, SecurityConfig
│               │   └── service/       # AuthService, EmployeeService, LeaveService
│               └── resources/
│                   └── application.properties
│
└── frontend/
    └── employee-leave-frontend/       # React + Vite Frontend Project
        ├── package.json
        ├── vite.config.js
        ├── index.html
        └── src/
            ├── main.jsx
            ├── App.jsx
            ├── index.css
            ├── components/            # Navbar, Sidebar, ProtectedRoute
            ├── pages/                 # Login, Register, Dashboard, Profile, ApplyLeave, MyLeaves, Employees, ManageLeaves
            └── services/              # api.js (Axios instance with Bearer token)
```

---

## 🗄️ 5. Database Setup

1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. Execute the `database.sql` script located in the root directory:
   ```sql
   SOURCE path/to/employee-leave-management/database.sql;
   ```
3. Update your database credentials in `backend/employee-leave-backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/employee_leave_management?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```

### Default Credentials:
- **Admin**: `admin@company.com` / `admin123`
- **Employee 1**: `john.doe@company.com` / `user123`
- **Employee 2**: `jane.smith@company.com` / `user123`

---

## ⚙️ 6. How to Run Backend

1. Open VS Code or terminal inside the backend project folder:
   ```bash
   cd backend/employee-leave-backend
   ```
2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
3. The backend server will start on `http://localhost:8080`.

---

## 💻 7. How to Run Frontend

1. Open a second terminal inside the frontend project folder:
   ```bash
   cd frontend/employee-leave-frontend
   ```
2. Install dependencies (first time only):
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the application in your browser at `http://localhost:5173`.

---

## 📡 8. API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new employee |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT |

### Employee Management (`/api/employees`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/employees/{id}` | Authenticated | Get employee profile details |
| `GET` | `/api/employees` | ADMIN | Get all employees (supports `?search=`) |
| `PUT` | `/api/employees/{id}` | Authenticated | Update employee profile |
| `DELETE` | `/api/employees/{id}` | ADMIN | Delete employee record |

### Leave Management (`/api/leaves`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/leaves` | Authenticated | Apply for leave |
| `GET` | `/api/leaves/my` | Authenticated | Get logged-in employee's leaves |
| `GET` | `/api/leaves` | ADMIN | Get all leave requests (supports `?status=`) |
| `PUT` | `/api/leaves/{id}/approve` | ADMIN | Approve leave request |
| `PUT` | `/api/leaves/{id}/reject` | ADMIN | Reject leave request |
| `GET` | `/api/leaves/summary` | Authenticated | Get dashboard summary metrics |

---

## 📸 9. Screenshots Placeholder

*(Include screenshots of the application here when uploading to GitHub)*
- Dashboard Overview
- Employee Leave Application Page
- Admin Leave Approval Panel
- Employee Directory Table

---

## 🔮 10. Future Improvements
- Email notification sending upon leave approval/rejection.
- Export leave reports to PDF/Excel format.
- Leave balance quota limit per employee per year.
