from .serializers import *
from .models import Candidate, Job, User
from rest_framework.response import Response


def authenticate_user(request, username, password):
    users = User.objects.all()
    serializer = UserRegistrationSerializer(users, many=True)

    for user_data in serializer.data:
        if user_data.get('username') == username and user_data.get('password') == password:
            return user_data
    return None