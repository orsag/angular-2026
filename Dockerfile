# Stage 1: Build the Angular app
FROM node:24-alpine AS build
WORKDIR /app

RUN corepack enable

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest and build
COPY . .
RUN yarn build --configuration production

# Stage 2: Serve with Nginx (remains the same)
FROM nginx:alpine
COPY --from=build /app/dist/angular-2026/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]