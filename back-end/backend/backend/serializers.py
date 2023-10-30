from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User 
        fields = ['id', 'username', 'password', 'email', 'is_staff'] 
        # is_staff attribute added to user to fake the admin user 
        # untill we have real field in the database for different
        # user types, till then we need this to differentiate admin
        # from candidate users
        # without it the login flow doesn't work.