# Sales Savvy – Full Stack E-Commerce Application

Sales Savvy is a full-stack e-commerce web application developed using Java, Spring Boot, React.js, and MySQL. It allows customers to browse products, add items to their cart, place orders, and track order status. Administrators can manage orders and update delivery status.

## Features

### Customer Features
- User Registration and Login
- Browse Products
- Add Products to Cart
- Update Cart Quantity and Remove Items
- Checkout and Place Orders
- View My Orders
- Track Order Status

### Admin Features
- Admin Login
- Admin Dashboard
- View All Orders
- Manage Orders
- Update Order Status

## Technologies Used

**Backend:** Java, Spring Boot, Spring Security, JWT, REST APIs

**Frontend:** React.js, JavaScript, HTML, CSS, Vite

**Database:** MySQL

**Tools:** Spring Tool Suite (STS), Visual Studio Code, MySQL Workbench

## Project Structure

```text
SalesSavvy/
├── sales-savvy-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
└── sales-savvy1/
    └── Spring Boot backend
```

## Frontend Setup

1. Install Node.js and npm.
2. Open the frontend project folder in VS Code.
3. Open the terminal.
4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```

6. Open `http://localhost:5173` in your browser.

## Backend Setup

1. Open the Spring Boot backend project in STS.
2. Configure the MySQL database connection in `application.properties`.
3. Create the `sales_savvy_db` database in MySQL.
4. Run the Spring Boot application.
5. The backend runs on `http://localhost:9091`.

## Database

MySQL database name: `sales_savvy_db`

Make sure to configure your own database username and password before running the application.

## Learning Outcomes

- Developed REST APIs using Spring Boot.
- Connected a React frontend to a Java backend.
- Integrated MySQL for data persistence.
- Implemented authentication and role-based access.
- Built cart, checkout, order management, and admin functionality.

## Author

Java Full Stack Developer – Portfolio Project
