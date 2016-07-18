
Для запуска проекта:

  1. Клонируем репо

  - Если не установлен node.js:
  2. Устанавливаем node.js
     Устанавливаем nvm:
      + $ npm install -g nvm

  - Если node.js установлен:
  2. Обновляем node.js через:
      + $ nvm install stable
      + $ nvm use stable
     Обновляем npm:
      + $ npm install npm -g

  3. В корневой директории проекта устанавливаем зависимости
      + $ npm install

  4. Проверяем версию gulp
      + $ gulp --v
      Если меньше 4.0.0, запускаем:
        + $ npm install gulpjs/gulp.git#4.0 --save-dev

  5. Запускаем проект
      + $ gulp dev
