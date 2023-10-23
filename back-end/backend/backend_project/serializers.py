from rest_framework import serializers
from .models import Candidate, Job, User

### CANDIDATE ###
#get
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

### JOB ###
#get 
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

#post
class JobCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        exclude = ['jobid']

### USER ###
#post
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'firstname', 'lastname', 'contactnumber', 'usertype']