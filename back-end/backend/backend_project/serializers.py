from rest_framework import serializers
from .models import Candidate, Job, User, Company


### USER ###
#get 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

### CANDIDATE ###
#get
class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

class CandidateDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Candidate
        fields = '__all__'
        extra_fields = ['user']
        depth = 2

#post
class CandidateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

### COMPANY ###
#get 
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

#post
class CompanyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        exclude = ['company_id']

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