from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from backend.serializers import UserSerializer
from .serializers import CandidateSerializer, JobSerializer
from .models import Candidate, Job
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated


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



def homepage(request):
    return HttpResponse('Hello hello developer!!!')

# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def getCandidates(request):
#     candidates = User.objects.all()  # Retrieve all Candidate records
#     serializer = UserSerializer(candidates, many=True)  # Serialize the data
#     return Response(serializer.data, status=status.HTTP_200_OK)

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