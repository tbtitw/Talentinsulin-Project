# Talentinsulin - Online Language Learning Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-green)

> Современная платформа для изучения языков онлайн с интерактивными курсами, профессиональными преподавателями и вдохновляющим блогом.

## ✨ Основные возможности

- 🎓 **Онлайн курсы** - Интерактивные уроки по изучению языков
- 👨‍🏫 **Профессиональные учителя** - Квалифицированные преподаватели
- 📝 **Блог** - Статьи, советы и истории успеха (8 статей)
- 💬 **FAQ** - Подробные ответы на часто задаваемые вопросы
- 📧 **Контактная форма** - Связь с поддержкой
- 🔐 **Аутентификация** - Регистрация и вход пользователей
- 📱 **Адаптивный дизайн** - Работает на всех устройствах

## 🎨 Дизайн

**Минималистичная чёрно-белая тема:**
- Чистый и современный интерфейс
- Профессиональные изображения (Unsplash)
- Плавные анимации и переходы
- Оптимизирован для UX/UI

## 📁 Структура проекта

- Node.js (v14 or higher)
- MongoDB (choose one option below)

### MongoDB Setup Options

**Option 1: Local MongoDB (Recommended for development)**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

**Option 2: MongoDB Atlas (Free cloud database)**
1. Create free account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `.env` file with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/project7?retryWrites=true&w=majority
   ```

## Installation
```
src/
├── components/          # Глобальные компоненты
│   ├── Header.js       # Навигация
│   ├── Footer.js       # Подвал
│   └── AuthModal.js    # Модальное окно авторизации
├── pages/
│   ├── Blog/          # 📁 Модуль блога (v2.0)
│   │   ├── components/     # Компоненты блога
│   │   ├── data/          # Данные и контент
│   │   ├── BlogList.js    # Список статей
│   │   └── BlogPostDetail.js  # Отдельная статья
│   ├── ContactUs.js   # Контактная форма
│   ├── FAQ.js         # Часто задаваемые вопросы
│   ├── Courses.js     # Каталог курсов
│   ├── TeacherApplication.js  # Форма для учителей
│   └── ...
├── context/           # React Context
└── utils/            # Утилиты
```

📖 **Подробная структура:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

## 🚀 Установка и запуск

### Требования

- Node.js (v14 или выше)
- MongoDB (локальный или Atlas)

### MongoDB Setup

**Вариант 1: Локальный MongoDB**
1. Скачайте с https://www.mongodb.com/try/download/community
2. Установите и запустите службу
3. MongoDB будет доступен на `mongodb://localhost:27017`

**Вариант 2: MongoDB Atlas (облачная БД)**
1. Создайте аккаунт на https://www.mongodb.com/cloud/atlas/register
2. Создайте кластер (доступен бесплатный tier)
3. Получите строку подключения
4. Обновите `.env` файл

### Установка зависимостей

```bash
npm install
```

### Настройка окружения

Создайте файл `.env` в корне проекта:
```env
MONGODB_URI=mongodb://localhost:27017/talentinsulin
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Запуск приложения

**Запустить frontend и backend вместе:**
```bash
npm run dev
```

Откроется:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

**Запустить отдельно:**

Frontend:
```bash
npm start
```

Backend:
```bash
npm run server
```

## 📱 Страницы

| Маршрут | Страница | Описание |
|---------|----------|----------|
| `/` | Home | Главная страница |
| `/courses` | Courses | Каталог курсов |
| `/courses/:id` | Course Details | Детали курса |
| `/blog` | Blog List | Список статей блога |
| `/blog/:id` | Blog Post | Отдельная статья |
| `/faq` | FAQ | Часто задаваемые вопросы |
| `/contact-us` | Contact | Контактная форма |
| `/teach` | Teacher Application | Форма для учителей |
| `/pricing` | Pricing | Цены и планы |

## 🎯 API Endpoints

### Аутентификация

```http
POST /api/auth/register
Body: { name, email, password }

POST /api/auth/login
Body: { email, password }

GET /api/auth/me
Headers: Authorization: Bearer <token>
```

### Курсы

```http
GET /api/courses
GET /api/courses/:id
POST /api/courses (требуется авторизация)
```

### Учителя

```http
POST /api/teachers/apply
Body: { firstName, lastName, email, ... }
```

## 📝 Блог (v2.0)

### Новая структура

```
Blog/
├── components/
│   ├── BlogCard         # Карточка статьи
│   └── CategoryFilter   # Фильтр категорий
├── data/
│   ├── blogData.js      # Метаданные (заголовки, авторы, изображения)
│   └── blogContent.js   # HTML контент статей
├── BlogList.js          # Список всех статей
└── BlogPostDetail.js    # Страница статьи
```

### Статьи (8 штук):

1. 🎓 The Future of Online Language Learning
2. 💡 10 Tips for Effective Language Learning
3. 🎯 How to Stay Motivated While Learning
4. 🧠 The Science Behind Language Acquisition
5. ⏰ Building a Daily Language Learning Routine
6. ⚠️ Common Mistakes Language Learners Make
7. 🏆 Success Stories: From Beginner to Fluent
8. 🌏 The Role of Culture in Language Learning

### Добавление новой статьи

См. подробное руководство: [HOW_TO_ADD_POST.md](src/pages/Blog/HOW_TO_ADD_POST.md)

## 🛠️ Технологии

**Frontend:**
- React 18+
- React Router v6
- CSS Modules
- Unsplash API (изображения)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## 📚 Документация

- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Полная структура проекта
- [CHANGELOG_BLOG.md](CHANGELOG_BLOG.md) - История изменений блога
- [Blog/README.md](src/pages/Blog/README.md) - Документация модуля блога
- [Blog/ARCHITECTURE.md](src/pages/Blog/ARCHITECTURE.md) - Архитектура блога
- [Blog/HOW_TO_ADD_POST.md](src/pages/Blog/HOW_TO_ADD_POST.md) - Добавление статей

## 🎨 Цветовая схема

```css
--primary-text: #1a1a1a;      /* Основной текст */
--secondary-text: #666666;    /* Вторичный текст */
--light-text: #999999;        /* Светлый текст */
--background: #ffffff;        /* Фон */
--background-alt: #f5f5f5;    /* Альтернативный фон */
--border: #e5e5e5;           /* Границы */
--border-hover: #d0d0d0;     /* Границы при hover */
```

## 📊 Производительность

- ✅ Lazy loading изображений
- ✅ Оптимизированный CSS
- ✅ Минимальный re-render
- ✅ Адаптивные изображения (Unsplash)
- ✅ Кэширование данных

## 🔒 Безопасность

- JWT токены для аутентификации
- Хэширование паролей (bcrypt)
- Защита от CSRF
- Валидация данных на сервере

## 🤝 Участие в разработке

1. Fork репозитория
2. Создайте ветку (`git checkout -b feature/AmazingFeature`)
3. Commit изменения (`git commit -m 'Add AmazingFeature'`)
4. Push в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл

## 👥 Авторы

- **Development Team** - Talentinsulin
- **AI Assistant** - GitHub Copilot

## 📞 Контакты

- Website: [talentinsulin.com](http://talentinsulin.com)
- Email: support@talentinsulin.com

## 🎉 Changelog

### v2.0.0 (27 января 2026)
- ✨ Полная реорганизация модуля блога
- 🖼️ Замена эмодзи на профессиональные изображения (Unsplash)
- 📁 Модульная структура с компонентами
- 📝 8 полных статей о языковом обучении
- 🎨 Улучшенный UX/UI дизайн
- 📱 Полная адаптивность
- 📖 Расширенная документация

Подробнее: [CHANGELOG_BLOG.md](CHANGELOG_BLOG.md)

## 🚀 Будущие улучшения

- [ ] Pagination для блога
- [ ] Поиск по статьям
- [ ] Комментарии к статьям
- [ ] Профили авторов
- [ ] RSS feed
- [ ] SEO оптимизация
- [ ] Dark mode
- [ ] PWA поддержка
- [ ] Многоязычность (i18n)
- [ ] Система уведомлений

---

**⭐ Если вам нравится проект, поставьте звезду!**
3. Frontend: http://localhost:3000
4. Backend: http://localhost:5000
5. Click "Sign Up" to create an account
6. Login with your credentials

## Technologies Used

- React 18
- React Router v6
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens)
- bcryptjs for password hashing
- CORS for cross-origin requests