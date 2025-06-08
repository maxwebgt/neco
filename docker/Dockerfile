# Многоступенчатая сборка для React приложения
FROM node:18-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и package-lock.json для кеширования слоев
COPY app/package*.json ./

# Установка зависимостей (включая dev для сборки)
RUN npm ci && npm cache clean --force

# Копирование исходного кода
COPY app/ .

# Сборка приложения для продакшена
RUN npm run build

# Продакшн стадия с nginx
FROM nginx:alpine

# Копирование собранного приложения
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование конфигурации nginx
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Открытие порта
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"] 