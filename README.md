# Project_02

## Frontend Setup

```bash
# Clone the repository
# ...

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory with the following content
REACT_APP_CHAT_BOT=<dialogflow chatbot id>
REACT_APP_CHAT_SRC=<dialogflow chatbot url>

REACT_APP_PAYHERE_MERCHANT_ID=<payhere merchant id>
REACT_APP_PAYHERE_MERCHANT_SECRET=<payhere merchant secret>

REACT_APP_CLOUDINARY_URL=<Cloudinary url>
REACT_APP_CLOUD_NAME=<cloudinary cloud name>

# Run the frontend application
npm start

# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory with the following content
MONGO_URI=<mongo uri of your database>
NODE_ENV=development
JWT_SECRET=<a word>

ADMIN_USERNAME=<username for admin>
ADMIN_PASSWORD=<username for password>
ADMIN_ROLE=admin

REACT_APP_PAYHERE_MERCHANT_ID=<payhere merchant id>
REACT_APP_PAYHERE_MERCHANT_SECRET=<payhere merchant secret>

EMAIL=<email address>
PASSWORD=<email app password>

# Run the backend application
npx nodemon index.js

