#!/bin/sh

echo "🚀 Запуск ECO.VERY API..."

# Инициализируем данные
node init-data.js

echo "🌐 Запуск API сервера..."

# Запускаем API сервер
exec node simple-api.js 