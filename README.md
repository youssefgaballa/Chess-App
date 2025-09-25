# Chess-Project
### Features:  
User Registration, Authentication, Authorization.  
Publish and update notes using a Lexical text editor.  
Play chess on a chessboard.  

### How to run:
Clone the repository. Make sure you have npm installed.  
Create a .env file in the root directory and put in
whatever variables are needed (see the Environment Variables section below).  
Then run the following commands when in the root directory.

\$ cd nodejs-backend  
\$ npm i  
\$ cd ..  
\$ docker compose -f docker-compose-nodejs.yml up --watch --build  
\$ cd frontend  
\$ npm i  
\$ npm run dev  

### Environment Variables:
If you want to test the app locally, you'll need to 
create a .env file with the following variables:

BACKEND_PORT=  
HTTP_PORT=  
POSTGRES_PORT=  
FRONTEND_PORT=  

POSTGRES_USER=  
POSTGRES_PASSWORD=  
POSTGRES_HOST=  
POSTGRES_PORT=  
POSTGRES_DB=  
ACCESS_TOKEN_SECRET=  
REFRESH_TOKEN_SECRET= 

VITE_HTTP_PORT=  