@echo off
docker-compose down -v
docker rmi ecovery-app:latest necovery-ecovery-app:latest 2>nul
docker image prune -f
cd app && npm cache clean --force && cd ..
docker-compose up --build -d
docker-compose ps 