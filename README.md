# 01 Choose your destiny

Йоу! Ну добрались.

## Порядок работы

1. Вся работа будет вестись через гитхаб и репозитории в этой организации. Каждому заданию будет соответствовать репозиторий.
Задание будет описано в корне, в файле `README.MD`.
2. Вы делаете форк репозитория, работайте со своим форком. Когда код готов — шлёте пул-реквест. Можете создать пул-реквест
до его готовности. Тогда название пул-рекевста должно начинаться с `WIP: your theme`. (Work in progress). Все последующие коммиты будут попадать в этот пул-реквест.
3. Если у вас возник какой-то общий вопрос, то велком в [телеграм](telegram.me/v7rulnik). Если вопрос по коду, то создавайте пул-реквест, комментируйте кусок кода, к которому вопрос и пингуйте меня. На гитхабе я @7rulink.
4. Не тупите. Если я обещал и не сделал — пингуйте. Если я молчу — пингуйте.


## Задание

Как я говорил, то совсем азам я вас учить не буду. Задания будут технического характера: написать какой-то небольшой апп или функцию.

**Первое задание:**

Оно направлено на выбор технологий, настройку окружения и умение читать документацию.
<br>На выполнение даётся *одна неделя*.

1. Начнем с настройки окружения. У вас должна быть установлена последняя версия node.js и npm.
2. Вам необходимо выбрать один из таск-раннеров/сборщиков для фронтенда. Выбор свободный. Ищите сами, используйте то, что больше нравится.
3. Настроить этот сборщик для следующих задач:
  * Сборка HTML: выберите любой шаблонизатор и соответствующий плагин для него
  * Сборка CSS: любой препроцессор.
  * Сборка JS: просто конкатенируем все `*.js` файлы в один
4. В репозитории должен быть файл `USAGE.MD`, в котором нужно описать как всё установиь и запускать ваши таски. Т.к. это маркдаун, то текст нужно более-менее адекватно оформить.
5. Структура проекта:<br>
  * В корне две папки `src` и `dest`. В первой исходные файлы, во второй скомпилированные. `dest` должна быть в гитигноре, как и все временные файлы.
  * В `src` в корне `index.ext` (расширение зависит от вашего шаблонизатора). И 2 папки: `css` и `js`. В них закиньте пару файлов.
