# Project_02

<!-- clone the repository -->

<!-- frontend codes -->

cd frontend
npm install

<!-- create .env file in frontend and the below code -->

REACT_APP_CHAT_BOT=<dialogflow chatbot id>
REACT_APP_CHAT_SRC=<dialogflow chatbot url>

REACT_APP_PAYHERE_MERCHANT_ID=<payhere merchant id>
REACT_APP_PAYHERE_MERCHANT_SECRET=<payhere merchant secret>

REACT_APP_CLOUDINARY_URL=<Cloudinary url>
REACT_APP_CLOUD_NAME=<cloudinary cloud name>

<!-- run the code -->

npm start

<!-- Backend codes -->
cd backend
npm install

<!-- create .env file in backend and the below code -->

MONGO_URI=<mongo uri of your database>
NODE_ENV=developemnt
JWT_SECRET=<a word>

ADMIN_USERNAME=<username for admin>
ADMIN_PASSWORD=<username for password>
ADMIN_ROLE=admin

REACT_APP_PAYHERE_MERCHANT_ID=<payhere merchant id>
REACT_APP_PAYHERE_MERCHANT_SECRET=<payhere merchant secret>

EMAIL=<email address>
PASSWORD=<email app password>

<!-- run the code -->
npx nodemon index.js