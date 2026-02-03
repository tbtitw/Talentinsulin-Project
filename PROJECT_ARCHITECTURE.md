# Архитектура проекта Talentinsulin

## Структура папок

Проект использует модульную архитектуру, где каждая страница имеет свою папку с компонентами.

```
src/
├── components/               # Общие компоненты
│   ├── Header.js
│   ├── Header.css
│   ├── Footer.js
│   ├── Footer.css
│   ├── AuthModal.js
│   └── AuthModal.css
├── context/                  # React Context
│   └── AuthContext.js
├── pages/                    # Страницы приложения
│   ├── Home/                 # Главная страница
│   │   ├── Home.js
│   │   ├── Home.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── Hero.js
│   │       ├── Hero.css
│   │       ├── Features.js
│   │       ├── Features.css
│   │       ├── CallToAction.js
│   │       └── CallToAction.css
│   ├── Courses/              # Курсы
│   │   ├── CoursesList.js
│   │   ├── CoursesList.css
│   │   ├── CourseDetails.js
│   │   ├── CourseDetails.css
│   │   ├── Lesson.js
│   │   ├── Lesson.css
│   │   ├── index.js
│   │   └── components/       # Будущие компоненты
│   ├── ContactUs/            # Контакты
│   │   ├── ContactUs.js
│   │   ├── ContactUs.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── ContactForm.js
│   │       ├── ContactForm.css
│   │       ├── InfoCard.js
│   │       └── InfoCard.css
│   ├── FAQ/                  # Вопросы и ответы
│   │   ├── FAQ.js
│   │   ├── FAQ.css
│   │   ├── index.js
│   │   └── components/
│   │       ├── SearchBar.js
│   │       ├── SearchBar.css
│   │       ├── QuestionItem.js
│   │       ├── QuestionItem.css
│   │       ├── CategorySection.js
│   │       └── CategorySection.css
│   ├── TeacherApplication/   # Заявка на преподавание
│   │   ├── TeacherApplication.js
│   │   ├── TeacherApplication.css
│   │   ├── index.js
│   │   └── components/       # Будущие компоненты
│   ├── Pricing/              # Тарифы
│   │   ├── Pricing.js
│   │   ├── Pricing.css
│   │   └── index.js
│   ├── Legal/                # Юридические документы
│   │   ├── PrivacyPolicy.js
│   │   ├── TermsOfService.js
│   │   ├── CookiePolicy.js
│   │   ├── Refunds.js
│   │   └── index.js
│   └── Blog/                 # Блог
│       ├── BlogList.js
│       ├── BlogPostDetail.js
│       ├── index.js
│       ├── components/
│       │   ├── BlogCard.js
│       │   └── CategoryFilter.js
│       └── data/
│           ├── blogData.js
│           └── blogContent.js
├── utils/                    # Утилиты
│   └── countries.js
├── App.js                    # Главный компонент
├── App.css                   # Глобальные стили
├── index.js                  # Точка входа
└── index.css                 # Базовые стили
```

## Принципы архитектуры

### 1. Модульность
Каждая страница находится в отдельной папке с:
- Главным компонентом страницы
- CSS файлом для стилей страницы
- `index.js` для экспорта
- Папкой `components/` для вложенных компонентов

### 2. Переиспользуемость
Компоненты разделены на:
- **Глобальные** (`src/components/`) - используются на всех страницах (Header, Footer)
- **Локальные** (`src/pages/*/components/`) - используются только на конкретной странице

### 3. Изоляция стилей
- Каждый компонент имеет свой CSS файл
- Глобальные стили только в `App.css` и `index.css`
- Стили компонентов изолированы друг от друга

### 4. Четкая структура импортов
```javascript
// Импорт страницы через index.js
import Home from './pages/Home';

// Импорт нескольких экспортов
import Courses, { CourseDetails, Lesson } from './pages/Courses';

// Импорт группы компонентов
import { PrivacyPolicy, TermsOfService } from './pages/Legal';
```

## Пример структуры страницы

### Структура файлов
```
PageName/
├── PageName.js          # Главный компонент
├── PageName.css         # Стили страницы
├── index.js             # Экспорт компонента
└── components/          # Вложенные компоненты
    ├── Component1.js
    ├── Component1.css
    ├── Component2.js
    └── Component2.css
```

### index.js
```javascript
export { default } from './PageName';
```

### PageName.js
```javascript
import React from 'react';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import './PageName.css';

function PageName() {
  return (
    <div className="page-name">
      <Component1 />
      <Component2 />
    </div>
  );
}

export default PageName;
```

## Преимущества новой архитектуры

### 1. Легкость навигации
- Все файлы, относящиеся к странице, находятся в одной папке
- Быстрый поиск компонентов

### 2. Масштабируемость
- Легко добавлять новые страницы
- Легко добавлять компоненты к существующим страницам

### 3. Поддерживаемость
- Изменения в одной странице не влияют на другие
- Изолированные стили предотвращают конфликты

### 4. Переиспользование кода
- Компоненты можно легко переносить между страницами
- Общие компоненты вынесены на верхний уровень

## Стиль кодирования

### Именование файлов
- Компоненты: `PascalCase.js` (например, `ContactForm.js`)
- Стили: `PascalCase.css` (соответствует компоненту)
- Утилиты: `camelCase.js` (например, `countries.js`)

### Именование CSS классов
- Используется BEM-подобная конвенция
- Префикс соответствует компоненту: `.contact-form`, `.info-card`

### Структура компонента
```javascript
// 1. Импорты React
import React, { useState } from 'react';

// 2. Импорты компонентов
import ChildComponent from './components/ChildComponent';

// 3. Импорты стилей
import './Component.css';

// 4. Компонент
function Component() {
  // Логика
  return (
    // JSX
  );
}

// 5. Экспорт
export default Component;
```

## Миграция существующих страниц

При переносе существующей страницы в новую архитектуру:

1. **Создать папку** для страницы в `src/pages/`
2. **Переместить** основной файл и CSS
3. **Создать** `index.js` с экспортом
4. **Выделить** переиспользуемые части в компоненты
5. **Создать** папку `components/` для вложенных компонентов
6. **Обновить** импорты в `App.js`
7. **Протестировать** работу страницы

## Рекомендации для разработки

### Создание новой страницы
```bash
# 1. Создать папку
mkdir src/pages/NewPage

# 2. Создать файлы
touch src/pages/NewPage/NewPage.js
touch src/pages/NewPage/NewPage.css
touch src/pages/NewPage/index.js

# 3. Создать папку для компонентов
mkdir src/pages/NewPage/components
```

### Добавление компонента к странице
```bash
# Создать файлы компонента
touch src/pages/PageName/components/NewComponent.js
touch src/pages/PageName/components/NewComponent.css
```

### Обновление импортов
После переноса страницы обновить импорты в `App.js`:
```javascript
// Старый способ
import PageName from './pages/PageName';

// Новый способ (через index.js)
import PageName from './pages/PageName';
// Или с явным указанием
import PageName from './pages/PageName/PageName';
```

## Будущие улучшения

- [ ] Создать компоненты для страницы Courses
- [ ] Создать компоненты для страницы TeacherApplication
- [ ] Добавить TypeScript для типизации
- [ ] Добавить тесты для компонентов
- [ ] Создать Storybook для документации компонентов
- [ ] Добавить lazy loading для страниц
