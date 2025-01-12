# Step 1: Build React App
FROM node:22 AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN ls -la /app/build  # Debug: List build directory contents

# Step 2: Serve with Nginx Server
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
