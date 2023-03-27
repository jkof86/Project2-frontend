FROM node:14.16.0 as build
WORKDIR /app

#we copy the app to the container
COPY . /app/

#we configure the container to build the react app
RUN npm install
RUN npm run build

#we prepare nginxnpm 
FROM nginx:1.23.3-alpine
COPY --from=build /app/build /usr/share/nginx/html

#starts up nginx
EXPOSE 80 
CMD [ "nginx","-g", "daemon off;" ]