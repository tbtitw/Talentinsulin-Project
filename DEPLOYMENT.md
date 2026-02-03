# Deployment Guide - Vercel

## 🚀 Подготовка к деплою

### 1. Предварительные требования

- Аккаунт на [Vercel](https://vercel.com)
- Аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (бесплатный tier доступен)
- Git репозиторий (GitHub, GitLab, или Bitbucket)

### 2. Настройка MongoDB Atlas

1. Создайте аккаунт на https://www.mongodb.com/cloud/atlas/register
2. Создайте новый кластер (выберите FREE tier)
3. Создайте пользователя базы данных:
   - Database Access → Add New Database User
   - Создайте username и надежный password
4. Добавьте IP адреса в whitelist:
   - Network Access → Add IP Address
   - Выберите "Allow Access from Anywhere" (0.0.0.0/0) для Vercel
5. Получите строку подключения:
   - Clusters → Connect → Connect your application
   - Скопируйте connection string
   - Замените `<password>` на ваш пароль
   - Замените `myFirstDatabase` на `talentinsulin`

Пример: `mongodb+srv://username:password@cluster.mongodb.net/talentinsulin?retryWrites=true&w=majority`

### 3. Настройка проекта

#### 3.1 Создайте .env файл локально (НЕ коммитьте в Git!)

```bash
cp .env.example .env
```

Заполните значения в `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talentinsulin?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
OPENAI_API_KEY=your_openai_api_key
RESEND_API_KEY=your_resend_api_key
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

#### 3.2 Убедитесь, что .env в .gitignore

Проверьте, что в `.gitignore` есть:
```
.env
.env.local
.env.*.local
```

### 4. Деплой на Vercel

#### Способ 1: Через Vercel Dashboard (Рекомендуется)

1. **Подключите репозиторий:**
   - Зайдите на https://vercel.com/new
   - Импортируйте ваш Git репозиторий
   - Выберите проект Talentinsulin

2. **Настройте проект:**
   - Framework Preset: `Create React App`
   - Root Directory: `./` (корень проекта)
   - Build Command: `npm run build` (уже настроено)
   - Output Directory: `build` (уже настроено)

3. **Добавьте переменные окружения:**
   - Settings → Environment Variables
   - Добавьте все переменные из `.env.example`:
     ```
     MONGODB_URI
     JWT_SECRET
     OPENAI_API_KEY (если используется)
     RESEND_API_KEY (если используется)
     FRONTEND_URL (URL вашего деплоя)
     NODE_ENV=production
     ```

4. **Деплой:**
   - Нажмите "Deploy"
   - Дождитесь окончания сборки

#### Способ 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Деплой проекта
vercel

# Следуйте инструкциям:
# - Set up and deploy? Yes
# - Which scope? Выберите ваш аккаунт
# - Link to existing project? No (если первый раз)
# - Project name? talentinsulin
# - Directory? ./
# - Override settings? No

# Добавьте переменные окружения
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add OPENAI_API_KEY
vercel env add RESEND_API_KEY
vercel env add FRONTEND_URL

# Production деплой
vercel --prod
```

### 5. Обновление API URL в коде

После успешного деплоя обновите API URL в вашем фронтенде:

**Создайте `src/config.js`:**
```javascript
export const API_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://your-app.vercel.app/api'
    : 'http://localhost:5000/api');
```

**Используйте в компонентах:**
```javascript
import { API_URL } from '../config';

// Вместо 'http://localhost:5000/api/...'
fetch(`${API_URL}/auth/login`, { ... });
```

### 6. Настройка Custom Domain (Опционально)

1. **Добавьте домен:**
   - Settings → Domains
   - Add Domain
   - Введите ваш домен (например, `talentinsulin.com`)

2. **Настройте DNS:**
   - Добавьте записи, указанные Vercel
   - Обычно это CNAME запись на `cname.vercel-dns.com`

3. **Обновите переменные:**
   - Обновите `FRONTEND_URL` в Environment Variables
   - Обновите `REACT_APP_API_URL` если нужно

### 7. Тестирование после деплоя

Проверьте следующие функции:

- [ ] Главная страница загружается
- [ ] Регистрация и вход работают
- [ ] Курсы отображаются
- [ ] Блог загружается и статьи открываются
- [ ] FAQ работает с поиском
- [ ] Контактная форма отправляется
- [ ] Форма "Стать преподавателем" работает
- [ ] Навигация между страницами
- [ ] Адаптивность на мобильных
- [ ] API endpoints отвечают

### 8. Мониторинг и отладка

#### Логи Vercel
```bash
# Просмотр логов через CLI
vercel logs

# Или в Dashboard
# Project → Deployments → Logs
```

#### Проверка здоровья API
```bash
curl https://your-app.vercel.app/api/health
```

Должен вернуть:
```json
{
  "status": "OK",
  "timestamp": "2026-02-03T...",
  "mongodb": "connected"
}
```

### 9. Автоматический деплой (CI/CD)

Vercel автоматически деплоит при пушах в Git:

- **Production Branch** (main/master): Автоматически деплоится в production
- **Preview Branches**: Каждый PR получает preview URL
- **Rollback**: Можно откатиться к предыдущим версиям в Dashboard

### 10. Оптимизация

#### 10.1 Кэширование
Vercel автоматически кэширует статические файлы.

#### 10.2 Environment Variables per Environment
```bash
# Production
vercel env add MONGODB_URI production

# Preview
vercel env add MONGODB_URI preview

# Development
vercel env add MONGODB_URI development
```

#### 10.3 Regions
По умолчанию Vercel деплоит в ближайший регион. Для изменения:
```json
// vercel.json
{
  "regions": ["iad1"]  // US East
}
```

## 🔒 Безопасность

### Checklist перед деплоем:

- [ ] `.env` файл НЕ в Git
- [ ] Сильный `JWT_SECRET` (минимум 32 символа)
- [ ] MongoDB пользователь имеет только необходимые права
- [ ] CORS настроен правильно (только ваш домен)
- [ ] Environment Variables добавлены в Vercel
- [ ] API keys защищены и не в коде
- [ ] HTTPS включен (Vercel делает автоматически)

## 📊 Performance

### Рекомендации:

1. **Code Splitting**: React автоматически делает при сборке
2. **Image Optimization**: Используйте `next/image` или оптимизируйте вручную
3. **MongoDB Indexes**: Убедитесь, что созданы индексы для часто запрашиваемых полей
4. **Caching**: Используйте `Cache-Control` headers для статики

## 🆘 Troubleshooting

### Проблема: 404 при обновлении страницы
**Решение**: Проверьте `vercel.json` - должен быть правильный rewrite на `index.html`

### Проблема: API endpoints не работают
**Решение**: 
- Проверьте, что все environment variables добавлены
- Проверьте логи: `vercel logs`
- Убедитесь, что MongoDB Atlas разрешает подключения от Vercel (0.0.0.0/0)

### Проблема: MongoDB connection timeout
**Решение**:
- Проверьте Network Access в MongoDB Atlas
- Убедитесь, что строка подключения правильная
- Проверьте, что username/password корректные

### Проблема: Build fails
**Решение**:
- Проверьте логи сборки в Vercel
- Запустите `npm run build` локально
- Убедитесь, что все dependencies в `package.json`

## 📚 Полезные ссылки

- [Vercel Documentation](https://vercel.com/docs)
- [Create React App Deployment](https://create-react-app.dev/docs/deployment/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 Готово!

После успешного деплоя ваше приложение будет доступно по адресу:
```
https://talentinsulin.vercel.app
```

Или на вашем custom domain!
