# Project: Bike-Rentals-(Client)

**Project Name:** Bike-Rentals-(Client)

**Project Task:** Building the Web app for a Sporting-Goods Shop.

**Project Motive:** Creating a frontend system for a Sporting-Goods Shop, including Product and Order Management.

## Client Live Link

Click here to see the Client Side Live Link: [https://rideon-rental-client.vercel.app](https://rideon-rental-client.vercel.app)

## Server Live Link

Click here to see the Server Side Live Link: [https://bike-rental-service-lilac.vercel.app](https://bike-rental-service-lilac.vercel.app)

## Server Repository Link

Click here to see the Server Side Repository Link: [https://github.com/Bahauddin-Fahad/Bike-Rental-Server](https://github.com/Bahauddin-Fahad/Bike-Rental-Server)

## Overview Video

Click here to see Video: [https://drive.google.com/file/d/1IBzEWiKa5EYsRnx4LvNdqtGGXu2CjqBD](https://drive.google.com/file/d/1IBzEWiKa5EYsRnx4LvNdqtGGXu2CjqBD)

## Project Features

1. **Signup:** Both User and Admin Signup facility is Implemented.
1. **Login:** Both User and Admin Login facility is Implemented.
1. **Home Section:** Home Section where Banner, Bikes, Testimonial, Contact Form,Why choose us and Footer is Implemented
1. **Dashboard:** User can check All bikes, Own paid and unpaid rentals via AamarPay, while Admin can check all User, Bikes, Rentals and add and update Accordingly.
   _1.User:_ User can check availabe bikes, and book the bike by paying advance, User can check his bookings in paid and unpaid section.
   _2.Admin:_ Admin can check add update or Delete Bikes. Admin can check all the users, can make a user admin or remove from admin. Admin can also delete the user. In Rental Section, Admin can check the rentals, can calculate the payment by clicking in the Calculate button. After Clicking, The user will be able to pay the rest of the amount.

## Technologies

- TypeScript
- react-dom
- react-hook-form
- jwt
- react-icons
- react-redux
- react-slick
- react-spinners
- react-toastify
- redux-persist
- slick-carousel
- AamarPay
- vercel

## :link: How to run the application locally

### Step 1: Clone the Repository

Firstly, we have to clone the repository to our local machine using Git.

```node
git clone <repository-url>
```

### Step 2: Navigate to the Project Directory

We need to navigate to the cloned repository directory.

```node
cd <repository-name>
```

### Step 3: Install Dependencies

Then we have to install the project's dependencies using npm.

```node
npm install
```

This command reads the package.json file in the project directory and installs all the required packages from the npm registry. With this command, node_modules will be installed.

### Step 4: Set up the `.env` File

Next, we will create a .env file in the root directory of our project. This file will hold the environment variables. `.env` file will look like this:

```node
VITE_BASE_URL=http://localhost:5000/api/
```

### Step 5: Start the Server

To run our Express.js application, we will use the following command:

```node
npm run dev
```

### Step 6: Access the Application

Once the server is running, we can access the application by navigating to `http://localhost:<port>` in web browser.

---

So, these are the steps to run an expressJs application locally.
