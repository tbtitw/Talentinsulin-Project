# Структура проекта Talentinsulin

## Обзор

Talentinsulin - платформа для изучения языков с модульной архитектурой React.

## Корневая структура

```
Talentinsulin/
├── public/                  # Статические файлы
│   ├── index.html
│   └── images/
│       ├── logos/
│       └── payment/
├── server/                   # Backend на Express.js
│   ├── server.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Lesson.js
│   │   ├── TeacherApplication.js
│   │   └── User.js
│   └── routes/
│       ├── auth.js
│       ├── courses.js
│       └── teachers.js
├── src/                      # Frontend на React
│   ├── components/           # Глобальные компоненты
│   ├── pages/                # Страницы (см. детали ниже)
│   ├── context/              # React Context
│   ├── utils/                # Утилиты
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── README.md
├── ARCHITECTURE.md           # Документация архитектуры
└── MONGODB_SETUP.md          # Настройка MongoDB
```

## Детальная структура Frontend (src/)

### Компоненты (src/components/)
Глобальные компоненты, используемые на всех страницах:

```
components/
├── Header.js                 # Навигационная панель
├── Header.css
├── Footer.js                 # Футер с ссылками
├── Footer.css
├── AuthModal.js              # Модальное окно авторизации
└── AuthModal.css
```

### Страницы (src/pages/)
Каждая страница в отдельной папке с компонентами:

#### Home - Главная страница
```
Home/
├── Home.js                   # Главный компонент
├── Home.css
├── index.js                  # Экспорт
└── components/
    ├── Hero.js               # Героическая секция
    ├── Hero.css
    ├── Features.js           # Список возможностей
    ├── Features.css
    ├── CallToAction.js       # Призыв к действию
    └── CallToAction.css
```

**Маршрут:** `/`

**Особенности:**
- Разделен на 3 компонента: Hero, Features, CallToAction
- Hero содержит главный заголовок и кнопки CTA
- Features отображает 6 карточек преимуществ
- CallToAction - нижний блок с призывом начать обучение

#### Courses - Курсы
```
Courses/
├── CoursesList.js            # Список всех курсов (бывший Courses.js)
├── CoursesList.css
├── CourseDetails.js          # Детальная информация о курсе
├── CourseDetails.css
├── Lesson.js                 # Отображение урока
├── Lesson.css
├── index.js                  # Экспорт всех компонентов
└── components/               # Будущие компоненты (CourseCard, etc.)
```

**Маршруты:** 
- `/courses` - список курсов
- `/courses/:courseId` - детали курса
- `/courses/:courseId/lessons/:lessonId` - урок

**API:**
- `GET /api/courses` - получить все курсы
- `POST /api/courses` - создать курс (только для авторизованных)
- `GET /api/courses/:id` - детали курса
- `GET /api/courses/:courseId/lessons/:lessonId` - данные урока

#### ContactUs - Контакты
```
ContactUs/
├── ContactUs.js              # Главный компонент
├── ContactUs.css
├── index.js
└── components/
    ├── ContactForm.js        # Форма обратной связи
    ├── ContactForm.css
    ├── InfoCard.js           # Карточка с контактной информацией
    └── InfoCard.css
```

**Маршрут:** `/contact-us`

**Компоненты:**
- **ContactForm**: Форма с полями name, email, subject, message
- **InfoCard**: Переиспользуемая карточка для отображения Email, Live Chat, Social Media, Location

**Особенности:**
- 4 информационных карточки
- Валидация формы
- Success сообщение после отправки

#### FAQ - Вопросы и ответы
```
FAQ/
├── FAQ.js                    # Главный компонент
├── FAQ.css
├── index.js
└── components/
    ├── SearchBar.js          # Поиск по вопросам
    ├── SearchBar.css
    ├── QuestionItem.js       # Отдельный вопрос с аккордеоном
    ├── QuestionItem.css
    ├── CategorySection.js    # Секция категории
    └── CategorySection.css
```

**Маршрут:** `/faq`

**Компоненты:**
- **SearchBar**: Поиск по вопросам и ответам
- **CategorySection**: Группа вопросов по категории
- **QuestionItem**: Отдельный вопрос с раскрывающимся ответом

**Категории:**
1. Getting Started (3 вопроса)
2. Courses & Learning (4 вопроса)
3. Payments & Billing (4 вопроса)
4. Teachers & Instructors (3 вопроса)
5. Technical Support (3 вопроса)
6. Certificates & Progress (3 вопроса)

**Особенности:**
- Поиск в реальном времени
- Аккордеон интерфейс
- Анимация открытия/закрытия

#### TeacherApplication - Заявка на преподавание
```
TeacherApplication/
├── TeacherApplication.js     # Форма заявки
├── TeacherApplication.css
├── index.js
└── components/               # Будущие компоненты (FormSection, etc.)
```

**Маршрут:** `/teach`

**API:**
- `POST /api/teachers/apply` - отправка заявки

**Разделы формы:**
1. Personal Information (name, email, country, phone)
2. Teaching Experience (languages, experience, qualifications, teaching methods)
3. Additional Information (availability, timezone, video introduction, why teach)

**Особенности:**
- Многосекционная форма
- Валидация полей
- Dropdown для стран
- Success/Error сообщения

#### Pricing - Тарифы
```
Pricing/
├── Pricing.js                # Тарифные планы
├── Pricing.css
└── index.js
```

**Маршрут:** `/pricing`

**Планы:**
1. **Basic** - $9.99/month
   - Базовые курсы
   - Доступ к форуму
   - Отслеживание прогресса
   - Мобильное приложение

2. **Pro** - $19.99/month (Most Popular)
   - Все из Basic
   - Live сессии
   - Приоритетная поддержка
   - Загружаемые материалы
   - Сертификаты

3. **Premium** - $29.99/month
   - Все из Pro
   - Индивидуальные уроки
   - Персональный план обучения
   - Расширенная аналитика
   - Пожизненный доступ

#### Legal - Юридические документы
```
Legal/
├── PrivacyPolicy.js          # Политика конфиденциальности
├── TermsOfService.js         # Условия использования
├── CookiePolicy.js           # Политика cookies
├── Refunds.js                # Политика возвратов
└── index.js                  # Экспорт всех документов
```

**Маршруты:**
- `/privacy` - Политика конфиденциальности
- `/terms` - Условия использования
- `/cookies` - Политика cookies
- `/refunds` - Возвраты и отмены

#### Blog - Блог
```
Blog/
├── BlogList.js               # Список статей
├── BlogPostDetail.js         # Детали статьи
├── index.js
├── components/
│   ├── BlogCard.js           # Карточка статьи
│   └── CategoryFilter.js     # Фильтр по категориям
└── data/
    ├── blogData.js           # Метаданные статей
    └── blogContent.js        # HTML контент статей
```

**Маршруты:**
- `/blog` - список всех статей
- `/blog/:id` - детали статьи

**Категории:**
- All
- Language Learning
- Teaching Tips
- Technology
- Culture

**Статьи (8 шт.):**
1. The Science Behind Language Learning (Language Learning)
2. Top 10 Tips for Language Learners (Language Learning)
3. How Technology is Revolutionizing Education (Technology)
4. The Role of Native Speakers in Learning (Teaching Tips)
5. Cultural Immersion: Beyond the Textbook (Culture)
6. Creating Effective Lesson Plans (Teaching Tips)
7. The Future of Online Learning (Technology)
8. Overcoming Language Learning Plateaus (Language Learning)

**Особенности:**
- Профессиональные изображения от Unsplash
- Фильтрация по категориям
- Rich HTML контент
- Навигация между статьями

### Context (src/context/)
```
context/
└── AuthContext.js            # Контекст авторизации
```

**Функции:**
- Управление состоянием авторизации
- Хранение данных пользователя
- Login/Logout функциональность

### Utils (src/utils/)
```
utils/
└── countries.js              # Список стран для форм
```

## Backend структура (server/)

### Models (Mongoose схемы)
```
models/
├── User.js                   # Пользователь (email, password, role)
├── Course.js                 # Курс (title, description, teacher, lessons)
├── Lesson.js                 # Урок (title, content, video)
└── TeacherApplication.js     # Заявка учителя
```

### Routes (API endpoints)
```
routes/
├── auth.js                   # /api/auth/* (login, register)
├── courses.js                # /api/courses/* (CRUD курсов)
└── teachers.js               # /api/teachers/* (заявки)
```

### Middleware
```
middleware/
└── auth.js                   # JWT проверка токенов
```

## Стек технологий

### Frontend
- **React 18+** - UI библиотека
- **React Router v6** - Маршрутизация
- **CSS Modules** - Стилизация компонентов

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - База данных
- **Mongoose** - ODM для MongoDB
- **JWT** - Авторизация

## Дизайн система

### Цветовая палитра
```css
--primary-text: #1a1a1a;      /* Основной текст */
--secondary-text: #666666;    /* Вторичный текст */
--light-bg: #f5f5f5;          /* Светлый фон */
--white: #ffffff;             /* Белый */
--border: #e5e5e5;            /* Границы */
```

### Типографика
- **Заголовки**: 2.8rem - 1.3rem, font-weight: 600-700
- **Основной текст**: 1rem - 1.2rem, line-height: 1.7
- **Кнопки**: 1rem - 1.1rem, font-weight: 600

### Компоненты
- **Кнопки**: Черные с белым текстом, hover эффект
- **Карточки**: Белые с тенью, border-radius: 12px
- **Формы**: Светлые границы, focus с тенью

## Скрипты

```json
{
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

## Переменные окружения

```
MONGODB_URI=mongodb://localhost:27017/talentinsulin
JWT_SECRET=your_secret_key
PORT=5000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход

### Courses
- `GET /api/courses` - Все курсы
- `POST /api/courses` - Создать курс (auth required)
- `GET /api/courses/:id` - Детали курса
- `PUT /api/courses/:id` - Обновить курс (auth required)
- `DELETE /api/courses/:id` - Удалить курс (auth required)
- `GET /api/courses/:courseId/lessons/:lessonId` - Урок

### Teachers
- `POST /api/teachers/apply` - Подать заявку

## Документация

- **README.md** - Основная информация о проекте
- **ARCHITECTURE.md** - Детальное описание архитектуры
- **MONGODB_SETUP.md** - Инструкции по настройке MongoDB
- **Blog/README.md** - Документация блог модуля
- **Blog/ARCHITECTURE.md** - Архитектура блога
- **Blog/HOW_TO_ADD_POST.md** - Как добавить статью

## Будущие улучшения

- [ ] TypeScript для типизации
- [ ] Unit тесты (Jest + React Testing Library)
- [ ] E2E тесты (Cypress)
- [ ] Storybook для компонентов
- [ ] Lazy loading страниц
- [ ] PWA функциональность
- [ ] Internationalization (i18n)
- [ ] Dark mode
- [ ] Analytics интеграция
- [ ] SEO оптимизация
