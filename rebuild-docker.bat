@echo off
setlocal enabledelayedexpansion
echo === Остановка и удаление контейнеров ===
docker-compose -f docker/docker-compose.yml down -v
echo === Удаление образов ===
docker rmi ecovery-app:latest 2>nul
docker image prune -f
echo === Запуск сборки и запуска контейнеров ===
docker-compose -f docker/docker-compose.yml up --build -d
echo === Проверка статуса контейнеров ===
docker-compose -f docker/docker-compose.yml ps
echo === Просмотр логов ===
docker-compose -f docker/docker-compose.yml logs 