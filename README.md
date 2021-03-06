# FoodCravings

> Simple Restaurant App platform built with the MERN stack & Redux.

![screenshot](/frontend/public/images/1.png?raw=true 'APP')

## Features

- Full featured restaurant app
- Menu reviews and ratings
- Top menu carousel
- Menu pagination
- Menu search feature
- User profile with orders
- Admin menu management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Admin Login

admin@example.com (Admin)
123456

```

```
Sample Login for PayPal Payment

sb-gc435r2575838@personal.example.com
x!zDkwX2

```
