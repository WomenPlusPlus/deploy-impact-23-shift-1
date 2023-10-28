from rest_framework import serializers
from .models import Candidate, Job, User


### USER ###
#get 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

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
        exclude = ['job_id']

### USER ###
#post
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'