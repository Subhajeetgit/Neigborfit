# NeighborFit

NeighborFit is a web application that helps users discover neighborhoods that best match their preferences for safety, affordability, commute, nightlife, and schools.

The project was developed as part of an SDE internship selection assignment. It demonstrates:

- User authentication (signup/login) with secure password hashing
- JWT-protected API endpoints
- A matching algorithm to recommend neighborhoods
- Integration with MongoDB Atlas for storing user data
- A modern React frontend with Material-UI for an attractive UI

---

## 🚀 Features

- **User Authentication**
  - Sign up with username and password
  - Login and receive a JWT token
  - Logout securely

- **Matching Algorithm**
  - Users set preferences using sliders
  - Neighborhoods are scored and ranked based on weighted criteria

- **Protected Routes**
  - Only logged-in users can access recommendations

- **Dynamic Data**
  - Neighborhood data loaded from a JSON file (can be replaced by real-world data sources)

---

## 🛠 Tech Stack

- **Frontend:** React, React Router, Material-UI, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** bcrypt, JWT

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas cluster created
