# frontend

- create first user from supabase.com/dashboard in the authentication/users menu

using docker:
 - TBD: getting the env variables to the docker image
 - docker build -t front-end . 
 - docker run --name front-end-container -d -p 3000:3000 front-end

without docker:
 - provide supabase & app urls and supabase keys to .env file (copy example.env)
    - keys and url are on supabase.com/dashboard in the settings/API menu
    - app url for dev surpricingly: http://localhost:3000
 - npm install
 - npm start

I installed already the react MUI component library:
  - https://mui.com/material-ui/getting-started/templates/
  - https://mui.com/material-ui/react-button-group/

# backend
using docker:
  docker-compose up --build

without docker:
  python manage.py runserver 