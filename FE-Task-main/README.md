## User Management System using React and JSON Server

This project is a User Management System that allows users to perform CRUD operations (Create, Read, Update, Delete) on a collection of users through a user-friendly web interface.

## Features

- User Table: The heart of the system is a table that displays a list of users. Each row represents an individual user, showing key details such as their name, email, and other relevant information.

Users of the system can perform CRUD operations on the user table:

- Create: Add new users by filling out a form with their details such as name, email, etc.
- Read: View the list of users with their information in a tabular format.
- Update: Edit user details and save the changes.
- Delete: Remove users from the system, ensuring data accuracy.

## Installation

Follow these steps to get the project up and running on your local machine:

- Fork the Repository: Start by forking this repository to your local machine and install all dependencies:

```bash
 yarn or npm install / npm i
```

- Run JSON Server: Start the JSON Server to provide the backend for the User Management System:

```bash
 yarn run db or npm run db
```

- Access data: Open browser and visit:

```bash
 http://localhost:8000/users
```

Run the React App:

- Open another terminal window, navigate to the same project directory, and run the React app:

```bash
yarn run dev or npm run dev
```

- Access the App: Open your web browser and visit:

```bash
 http://localhost:5173/
```

## Way Of Work

- Please create your git branch and create a pull request after finnishing the task.

## Tech Stack

**Client:** React, TypeScript

**Server:** Json-Server

- All user data is managed using JSON Server. The data is stored in a data/db.json file, which serves as the backend database. This integration allows for a seamless separation of frontend and backend development.The setup is already done for this step.

## API Reference

#### Get all users

```
  GET http://localhost:8000/users
```

#### Get single user

```
  GET http://localhost:8000/users/${id}
```

#### Edit user

```
  POST http://localhost:8000/users/${id}
```

#### Delete user

```
  DELETE http://localhost:8000/users/${id}
```
