# Step 1
FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

# add app
COPY . ./
# start app
CMD ["npm", "start"]


# Stage 2
#FROM nginx
# COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build-step /app/build /usr/share/nginx/html