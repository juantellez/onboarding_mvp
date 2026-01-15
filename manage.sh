#!/bin/bash

APP_NAME="onboarding_mvp"

case "$1" in
  start)
    echo "Starting $APP_NAME..."
    npx pm2 start $APP_NAME || npx pm2 start npm --name "$APP_NAME" -- start
    ;;
  stop)
    echo "Stopping $APP_NAME..."
    npx pm2 stop $APP_NAME
    ;;
  restart)
    echo "Restarting $APP_NAME..."
    npx pm2 restart $APP_NAME
    ;;
  delete)
    echo "Deleting $APP_NAME from PM2..."
    npx pm2 delete $APP_NAME
    ;;
  status)
    npx pm2 status
    ;;
  logs)
    npx pm2 logs $APP_NAME
    ;;
  *)
    echo "Usage: ./manage.sh {start|stop|restart|delete|status|logs}"
    exit 1
    ;;
esac
