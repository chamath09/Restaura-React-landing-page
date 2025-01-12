# Step 1: Build React App
FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json . 
RUN npm i
COPY . .
RUN npm run build 

# Step 2: Serve with Nginx Server
FROM nginx:1.27.3
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

#update