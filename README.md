# Chess-App
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
In a new terminal:  
\$ cd frontend  
\$ npm i  
\$ npm run dev  

### Environment Variables:
If you want to test the app locally, you'll need to 
create a .env file with the following variables:

BACKEND_PORT=  
VITE_BACKEND_PORT=  
FRONTEND_PORT=  
VITE_FRONTEND_PORT=  
HTTP_PORT=  
VITE_HTTP_PORT=  

POSTGRES_USER=   
POSTGRES_PASSWORD=  
POSTGRES_HOST=  
POSTGRES_PORT=  
POSTGRES_DB=  

ACCESS_TOKEN_SECRET=  
REFRESH_TOKEN_SECRET=  
ACCESS_TOKEN_EXPIRES_IN=  
REFRESH_TOKEN_EXPIRES_IN=  

Three ports need to be exposed for the Backend, Frontend, and Socket.io server (which uses an HTTP server).  
All three should be different, and the "VITE_" prefixed version of the same port should match the non-prefixed version.  
The POSTGRES_HOST should match the postgres service name in the docker compose file. Currently the service name is postgres, so POSTGRES_HOST should be set to postgres.  
If you want a different POSTGRES_HOST name, you'd also need to change both occurences of the previous service name in the docker compose file.  

For the jwt token secrets, you can supply 64 random bytes in hexadecimal format  
You can create some on the command-line (with node.js) by running the following commands:  
\$ node  
\$ require('crypto').randomBytes(64).toString('hex')  

The "EXPIRES_IN" variables format is in vercel/ms:  
Example values: "2 days", "10 h", "40s", and 60.  
REFRESH_TOKEN_EXPIRES_IN should be longer than ACCESS_TOKEN_EXPIRES_IN.