#Создаём виртуальное окружение
python -m venv venv 

#Активация виртуального окружения
venv/scripts/activate

#Обновление пакетного менеджера 
python -m pip install --upgrade pip 

#Устанавливаем джанго 
pip install django

#Создаём проект 
django-admin startproject store_project

#Переходим в папку с проектом
cd store_project

#Создаём приложение
python manage.py startapp store

#settings- добавляем приложение 

#Подключаем базу и создаём вспомогательные таблицы
python manage.py migrate

#Запускаем сервер
python manage.py runserver

#При изменении структуры базы
python manage.py makemigrations
python manage.py migrate

#Регистрация пользователя 
python manage.py createsuperuser