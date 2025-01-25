# 🌟 STELLAR BURGER

**STELLAR BURGER** – это интерактивное веб-приложение для создания бургеров, разработанное в рамках обучения на платформе Yandex Practicum. Позволяет пользователям конструировать бургеры, оформлять заказы и отслеживать их статус в режиме реального времени.

## 🚀 Технологии

- **React** + **TypeScript** – для удобной и безопасной разработки.
- **Redux Toolkit** – управление глобальным состоянием приложения.
- **WebSockets** – получение в реальном времени статуса заказов (как всех, так и конкретного пользователя).
- **Drag & Drop** (**react-dnd**) – перетаскивание ингредиентов для формирования бургера.
- **Jest & Cypress** – автотестирование редюсеров, открытия/закрытия модальных окон и функционала Drag & Drop.

## ⚡ Функционал

✅ Конструктор бургеров с перетаскиванием ингредиентов.  
✅ Авторизация и регистрация пользователей.  
✅ История заказов с WebSocket-обновлениями.  
✅ Детальная информация об ингредиентах.  
✅ Модальные окна для просмотра заказа и ингредиентов.  
✅ Тесты:
- **Jest** – редюсеры, логика работы модальных окон.
- **Cypress** – E2E тестирование основных сценариев.

## 📦 Установка

```sh
npm install
npm install --legacy-peer-deps (при проблемах с совместимостью)
npm start

## 📦 Для тестов

npm run test
npm run cypress:open

