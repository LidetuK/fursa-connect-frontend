#!/bin/sh

# Get the port from Railway environment variable
PORT=${PORT:-80}

# Update nginx configuration to use the correct port
sed -i "s/listen 80/listen $PORT/g" /etc/nginx/conf.d/default.conf

# Start nginx
exec nginx -g 'daemon off;' 