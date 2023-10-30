# frontend

-   create first user from supabase.com/dashboard in the authentication/users menu
-   send the signup request to backend with this data (for now you can use the test.rest - test case Mauro provided):
    {
    "username": "<email address of the user you created in supabase>",
    "password": "<User UID that you find in the supabase dashboard where you created the first user>", 
    "email": "<email address of the user you created in supabase>",
    "type": "admin",
    "name": "<name>",
    "contactnumber": "<phone>",
    "description": "<description>",
    "terms_and_conditions": true,
    "privacy_policy": true
    }
-   we need a better process for creating the first admin user!!!

If you wish to try it out with the test admin user and jobs/candidate data we have created in our supabase project, feel free to contact paivi.kero@gmail.com
and we can invite you to project and provide the necessary env variables for the supabase and database. Or in case you need any assistance setting up your project.

using docker:

-   TBD: getting the env variables to the docker image
-   docker build -t front-end .
-   docker run --name front-end-container -d -p 3000:3000 front-end

without docker:

-   provide supabase & app urls and supabase keys to .env file (copy example.env)
    -   keys and url are on supabase.com/dashboard in the settings/API menu
    -   app url aka front end url, for dev surprisingly: http://localhost:3000
    -   api url for the backend, for dev again surprisingly: http://localhost:8000
-   npm install
-   npm start

# backend

to get the database set up:
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata .\backend_project\fixtures\initial_data.json

using docker:
docker-compose up --build

without docker:
copy example.env file as .env
add the database info to .env file

pip3 install .\requirements.txt

python manage.py runserver
or
python manage.py runserver 0.0.0.0:8000
