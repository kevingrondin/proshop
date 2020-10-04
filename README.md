# Proshop

> eCommerce platform built with the MERN stack & Redux.

![screenshot](https://github.com/bradtraversy/proshop_mern/blob/master/uploads/Screen%20Shot%202020-09-29%20at%205.50.52%20PM.png)

## Features

- [  ] Full featured shopping cart
- [ ] Product reviews and ratings
- [ ] Top products carousel
- [ ] Product pagination
- [ ] Product search feature
- [ ] User profile with orders
- [ ] Admin product management
- [ ] Admin user management
- [ ] Admin Order details page
- [ ] Mark orders as delivered option
- [ ] Checkout process (shipping, payment method, etc)
- [ ] PayPal / credit card integration
- [ ] Database seeder (products & users)

## Usage

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

