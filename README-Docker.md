# ECO.VERY - Docker Руководство

## 🐳 Быстрый старт

### Системные требования
- Docker Desktop для Windows
- Docker Compose (входит в Docker Desktop)

### Запуск проекта

#### Способ 1: Использование bat-скриптов (рекомендуется)
```bash
# Первый запуск или полная пересборка
rebuild-docker.bat

# Обычный запуск
docker-start.bat

# Остановка
docker-stop.bat
```

#### Способ 2: Командная строка
```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Полная пересборка
docker-compose down -v
docker system prune -af --volumes
docker-compose up --build -d
```

## 📋 Описание сервисов

### React приложение (ecovery-app)
- **Порт**: 3000
- **URL**: http://localhost:3000
- **Технологии**: React, TypeScript, Vite, Tailwind CSS
- **Nginx**: Статическая раздача файлов с SPA поддержкой

### MongoDB (mongodb)
- **Порт**: 27017
- **Пользователь**: admin
- **Пароль**: ecoVery2024!
- **База данных**: ecovery
- **Конфигурация**: ./mongodb/mongod.conf

### Mongo Express (mongo-express)
- **Порт**: 8081
- **URL**: http://localhost:8081
- **Пользователь**: admin
- **Пароль**: mongoExpress2024!

## 🔧 Конфигурация

### Файл .env
Содержит все пароли и настройки для Docker Compose:
```
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=ecoVery2024!
ME_CONFIG_BASICAUTH_PASSWORD=mongoExpress2024!
```

### Конфигурация MongoDB
- Файл: `mongodb/mongod.conf`
- Включена авторизация
- Настроено логирование
- Оптимизация для разработки

## 🛠️ Полезные команды

### Просмотр логов
```bash
# Все сервисы
docker-compose logs -f

# Конкретный сервис
docker-compose logs -f ecovery-app
docker-compose logs -f mongodb
docker-compose logs -f mongo-express
```

### Подключение к MongoDB
```bash
# Через MongoDB Compass
mongodb://admin:ecoVery2024!@localhost:27017/ecovery

# Через командную строку
docker exec -it ecovery-mongodb mongosh -u admin -p ecoVery2024!
```

### Очистка Docker
```bash
# Удаление всех контейнеров и образов
docker system prune -af --volumes

# Удаление только томов данных
docker-compose down -v
```

## 🚀 Разработка

### Изменение кода
1. Внесите изменения в `app/src/`
2. Запустите `rebuild-docker.bat` для пересборки
3. Приложение будет доступно на http://localhost:3000

### Работа с базой данных
1. Откройте Mongo Express: http://localhost:8081
2. Введите логин: `admin`, пароль: `mongoExpress2024!`
3. Создавайте коллекции и документы через веб-интерфейс

## 🔒 Безопасность

⚠️ **Важно**: Пароли в `.env` файле предназначены только для разработки!

Для продакшена:
1. Измените все пароли в `.env`
2. Используйте Docker Secrets
3. Настройте HTTPS для nginx
4. Ограничьте доступ к портам

## 📁 Структура проекта

```
ecovery/
├── app/                    # React приложение
├── mongodb/               # Конфигурация MongoDB
│   └── mongod.conf
├── docker-compose.yml    # Описание сервисов
├── Dockerfile            # Образ React приложения
├── nginx.conf            # Конфигурация Nginx
├── .env                  # Переменные окружения
├── .dockerignore         # Исключения для Docker
├── rebuild-docker.bat    # Полная пересборка
├── docker-start.bat      # Запуск контейнеров
└── docker-stop.bat       # Остановка контейнеров
``` 