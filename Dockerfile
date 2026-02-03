FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy all files
COPY . .

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
