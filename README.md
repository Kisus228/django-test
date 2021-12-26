1. Применить команду **pip install -r requirements.txt** для установления зависимостей

2. Применить команду **npm install** в папке **.\business_trips_assistant\frontend** для установки модулей.

3. Установить субд **postgres**


4. В субд создать базу данных


5. Создать файл .env прописать в нём переменные окружения
   
   
    - CHROMEDRIVER - путь до chromedriver.exe 
    - PASSWORD_DATA_BASE - пароль от базы данных
    - NAME_DATA_BASE - название базы данных
    - USER_DATA_BASE - имя пользователя базы данных
    - HOST_DATA_BASE - host базы данных
    - PORT_DATA_BASE - порт базы данных 


6. Применить фиксутры c помощью команд:
    - python manage.py loaddata city.json
    - python manage.py loaddata station.json