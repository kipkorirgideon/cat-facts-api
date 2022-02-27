## PREREQUISITES
1. Have docker installed
2. Have docker compose installed
3. Have nodejs v16 installed
4. Have typescript installed v4+

## SETTING UP THE BACKED SERVER
1. From the root directory of the application, mkdir data
2. From the root of the project create .env file
3. Copy content of .template_env to .env

## STARTING UP THE POSTGRES DATABASE

1. From the root directory of the project, 
# run docker-compose up -d // in detached mode
This should create postgres table to be used
# This should start the server at http://localhost/5430

## INSTALLING NODE MODULES
1. Run npm install

## STARTING NODEJS BACKEND
1. Run npm run build
2. Run npm run start
# This should start the server at http://localhost/5001



