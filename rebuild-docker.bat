@echo off
echo 🔄 Перезапуск ECO.VERY через Docker Compose...

echo 📦 Останавливаем все сервисы...
docker-compose down

echo 🗑️ Удаляем старые образы...
docker-compose down --rmi all

echo 🏗️ Собираем и запускаем все сервисы...
docker-compose up --build -d

echo ⏳ Ждем запуска сервисов...
timeout /t 10 /nobreak > nul

echo ✅ ECO.VERY запущен!
echo.
echo 🌐 Сайт:          http://localhost
echo 📡 API:           http://localhost:3001
echo 🗄️  Mongo Express: http://localhost:8081
echo.
echo Нажмите любую клавишу для выхода...
pause > nul 