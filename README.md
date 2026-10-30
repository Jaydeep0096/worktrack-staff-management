WorkTrack — Employee Management System
WorkTrack is a full-stack MERN application for managing employee records. Users can add employees, view the directory, search by name or email, and delete records.
Features
- Add employees with name, email, department, job title, and salary.
- View employee records stored in MongoDB.
- Search employees by name or email.
- Delete employees with confirmation.
- Employee count displayed at the top of the dashboard.
- Responsive dashboard with loading, success, and error messages.
- Backend API supports updates and department filtering; the initial dashboard does not yet expose these controls.

- Technology Stack
Layer	Technologies
Frontend	React, Vite, JavaScript, HTML, CSS
Backend	Node.js, Express
Database	MongoDB, Mongoose
API communication	Fetch API
Configuration	dotenv, Vite environment variables

Project Structure
worktrack/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/employeeApi.js
│   │   ├── hooks/useEmployees.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── config/db.js
│   ├── controllers/employeeController.js
│   ├── middleware/errorHandler.js
│   ├── models/Employee.js
│   ├── routes/employeeRoutes.js
│   ├── services/employeeService.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── README.md

Requirements
- A supported Node.js LTS release and npm.
- MongoDB running locally, or a MongoDB Atlas database.
Setup
Download or clone this repository, then open its root folder in your terminal.
1. Install dependencies
cd server
npm install
cd ../client
npm install
2. Configure the backend
Create server/.env:
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/worktrack
CLIENT_URL=http://localhost:5173
For MongoDB Atlas, replace MONGODB_URI with your own Atlas connection string, using worktrack as the database name. Configure your Atlas database user and IP access list before connecting.

The local connection string requires MongoDB to be installed and running on port 27017. MongoDB creates the database and collection when the first employee is saved.
3. Configure the frontend
Create client/.env:
VITE_API_BASE_URL=http://localhost:5000/api
Use plain URLs in both files, without Markdown formatting. Keep database credentials in the backend only. Variables prefixed with VITE_ are visible in the browser.
4. Start the backend
From the repository root, run:
cd server
npm run dev
Expected output:
MongoDB connected: worktrack
Server running on port 5000
5. Start the frontend
Open a second terminal at the repository root:
cd client
npm run dev
Open the URL printed by Vite, usually http://localhost:5173. If Vite selects another port, update CLIENT_URL in server/.env to match. Restart the corresponding process after changing environment variables.
API Endpoints
Base URL: http://localhost:5000/api
Method	Endpoint	Description
GET	/health	Check whether the API responds
GET	/employees	List employees, newest first, up to 100 records
GET	/employees?search=Rahul	Search by name or email
GET	/employees?department=Engineering	Filter by department
POST	/employees	Create an employee
PATCH	/employees/:id	Update an employee
DELETE	/employees/:id	Delete an employee


Replace :id with an employee's MongoDB _id.
Example employee
For POST or PATCH requests, use Content-Type: application/json.
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "department": "Engineering",
  "jobTitle": "Software Engineer",
  "salary": 75000
}
Names require at least two characters. All five fields are required when creating an employee. Salary must be nonnegative, and email addresses must be unique.
Example list response
{
  "success": true,
  "data": []
}
The frontend API service extracts data, so React receives an employee array.
Verify the Application
1. Open http://localhost:5000/api/health and confirm the API returns JSON.
2. Open http://localhost:5000/api/employees and confirm it returns an employee array inside data.
3. Add an employee through the dashboard.
4. Refresh the page and confirm the employee remains visible.
5. Search for the employee and test deleting the record.

