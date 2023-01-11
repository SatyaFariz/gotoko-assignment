# redis-server --daemonize yes && npm run migration:run && npm run build && npm run start

redis-server & /entrypoint.sh mysqld & (sleep 90; npm run migration:run; npm run build; npm run start)

# docker run --rm testing:latest1 -p 3030:3030

# docker run --rm -ti -p 3030:3030 satyafariz/gotoko-test:latest /bin/bash