from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
#from django.contrib.auth.models import User
#from backend.serializers import UserSerializer
from .serializers import *
from .models import Candidate, Job, User
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password  # Import Django's password hashing function
from django.contrib.auth import authenticate


@api_view(['GET'])
def get_candidates(request):
    candidates = Candidate.objects.all()
    serializer = CandidateSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_jobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_job(request):
    serializer = JobCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    print(request.data['usertype'])
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = User(**serializer.validated_data)
        user.password = make_password(request.data['password'])  # Hash the password
        user.save()

        # Check if the 'usertype' is 'candidate'
        if request.data.get('usertype', '') == 'candidate':
            # Assuming the remaining fields match the Candidate model, extract and store them
            candidate_data = {
                "userid": user.userid,  # Get the ID of the just stored user
                "jobid": request.data.get('jobid', ''),
                "headline": request.data.get('headline', ''),
                #"skills": request.data.get('skills', ''),
                #"educationhistory": request.data.get('educationhistory', ''),
                "workexperience": request.data.get('workexperience', ''),
                "certification": request.data.get('certification', ''),
                "volunteering": request.data.get('volunteering', ''),
                #"preferredjoblocations": request.data.get('preferredjoblocations', ''),
                "resume": request.data.get('resume', ''),
                #"jobapplications": request.data.get('jobapplications', '')
            }
            candidate_serializer = CandidateSerializer(data=candidate_data)
            if candidate_serializer.is_valid():
                candidate_serializer.save()
            else:
                # Handle validation errors for the candidate-specific data
                return Response(candidate_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    #print(user)
    if user is not None:
        #token, created = Token.objects.get_or_create(user=user)
        serializer = UserRegistrationSerializer(user)
        return Response({'user': serializer.data})
        #return Response({'token': token.key, 'user': serializer.data})
    
    else:
        # Authentication failed
        return Response("Invalid credentials", status=status.HTTP_401_UNAUTHORIZED)

def homepage(request):
    return HttpResponse('Hello hello developer!!!')

# @api_view(['POST'])
# def login(request):
#     user = get_object_or_404(User, username=request.data['username'])
#     if not user.check_password(request.data['password']): #if psw false
#         return Response("missing user", status=status.HTTP_404_NOT_FOUND)
#     token, created = Token.objects.get_or_create(user=user)
#     serializer = UserSerializer(user)
#     return Response({'token': token.key, 'user': serializer.data})

# @api_view(['POST'])
# def login(request):
#     user = get_object_or_404(User, username=request.data['username'])
#     if not user.check_password(request.data['password']): #if psw false
#         return Response("missing user", status=status.HTTP_404_NOT_FOUND)
#     token, created = Token.objects.get_or_create(user=user)
#     serializer = UserSerializer(user)
#     return Response({'token': token.key, 'user': serializer.data})

# @api_view(['POST'])
# def signup(request):
#     serializer = UserSerializer(data=request.data) # convert complex data type into python dict
#     if serializer.is_valid():
#         serializer.save() #save usrr into db
#         user = User.objects.get(username=request.data['username']) #get data for that user
#         user.set_password(request.data['password'])
#         user.save()
#         token = Token.objects.create(user=user) #create token for that user
#         return Response({"token": token.key, "user": serializer.data})
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def test_token(request):
#     return Response("passed!")