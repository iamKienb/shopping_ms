FROM node:latest


WORKDIR /app/user

COPY package*.json ./



RUN npm install 

COPY . .

EXPOSE 8001

CMD [ "npm", "run", "dev" ]