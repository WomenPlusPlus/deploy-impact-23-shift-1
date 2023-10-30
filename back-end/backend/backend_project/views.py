import string
import numpy as np
import gensim.downloader as api
# Load the GloVe model
#glove_model = api.load("word2vec-google-news-300")
# Save the model locally
model_path = "word2vec-google-news-300.gensim"
from nltk import word_tokenize
#import nltk;
from nltk.corpus import stopwords
#nltk.download('punkt')
# Download the "stopwords" corpus
#nltk.download('stopwords')
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view

from .models import Candidate_Expertise
from .utils import *
import json
from rest_framework import generics


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_candidates(request):
    candidates = Candidate.objects.all()
    serializer = CandidateSerializer(candidates, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_candidate_details(request):
    candidate_id = request.data.get('candidateid')
    candidate = Candidate.objects.select_related('user').get(user=candidate_id)
    serializer = CandidateDetailSerializer(candidate)
    return Response(serializer.data)


@api_view(['GET'])
def get_jobs(request):
    jobs = Job.objects.all()
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_job(request):
    job = Job.objects.get(job_id=request.data["job_id"])
    if job:
        if "title" in request.data:
            job.title = request.data["title"]
            job.save(update_fields=["title"]) 
        if "description" in request.data:
            job.description = request.data["description"]
            job.save(update_fields=["description"]) 
        if "is_published" in request.data:
            job.is_published = request.data["is_published"]
            job.save(update_fields=["is_published"]) 
        if "published_on" in request.data:
            job.published_on = request.data["published_on"]
            job.save(update_fields=["published_on"]) 
        return Response("ok")
    return Response("job not found", status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def create_company(request):
    serializer = CompanyCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_companies(request):
    companies = Company.objects.all()
    serializer = CompanySerializer(companies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_job(request):
    serializer = JobCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_candidate_profile(request):
    serializer = CandidateCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = User(**serializer.validated_data)
        # user.password = make_password(request.data['password'])  # Hash the password
        user.save()

        """ commented out as at this point we don't get this data from candidate.. 
        let's see how this will work in the future
        if request.data.get('usertype', '') == 'candidate':

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
                return Response(candidate_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def remove_stop_words_and_punctuation(text):
    # Lowercasing and tokenization by space
    words = word_tokenize(text.lower())

    # Remove stopwords
    stop_words = set(stopwords.words('english'))

    # Define a set of punctuation characters
    punctuation = set(string.punctuation)

    # Remove stop words and punctuation from the text
    filtered_words = [word for word in words if word.lower() not in stop_words and word not in punctuation]

    # Join the filtered words back into a sentence
    return ' '.join(filtered_words)


# calculates embeddings at the word level
def text_to_word2vec_embeddings(model, text):
    words = text.split()

    # Calculate the average Word2Vec vector for each text
    return np.mean([model[word] for word in words if word in model], axis=0)


def matchingFunction(candidate_profile_text_raw, job_description_text_raw):
    word2vec_model = load_word2vec_model()
    # preprocess
    candidate_profile_non_stop = remove_stop_words_and_punctuation(candidate_profile_text_raw)
    job_description_non_stop = remove_stop_words_and_punctuation(job_description_text_raw)

    # get embeddings
    candidate_profile_embeddings = text_to_word2vec_embeddings(word2vec_model, candidate_profile_non_stop)
    job_description_embeddings = text_to_word2vec_embeddings(word2vec_model, job_description_non_stop)

    similarity_score = cosine_similarity(
        [candidate_profile_embeddings], [job_description_embeddings]
    )[0][0]

    return similarity_score


@api_view(['POST'])
def match_candidate_post(request):
    candidate_id = request.data.get('candidateid')

    candidate = Candidate.objects.select_related('user').only('user__description').get(user=candidate_id)

    # Get the expertise names for the candidate
    expertise_names = [ce.expertise.name for ce in Candidate_Expertise.objects.filter(candidate=candidate)]

    # Build the candidate_profile string
    candidate_profile = f"{candidate.user.description} {candidate.education} {candidate.work_experience} {candidate.volunteer_experience} {candidate.courses}"

    # Append the expertise names to the candidate_profile
    if expertise_names:
        candidate_profile = ' '.join(candidate_profile.split() + expertise_names)

    matching_results = []
    jobs = Job.objects.filter(is_published=True)
    for job in jobs:
        job_id = job.job_id
        job_description = f"{job.title} {job.description}"
        # Calculate matching results for each job
        matching_score = matchingFunction(candidate_profile, job_description)
        matching_results.append({
            "job_id": job_id,
            "matching_score": matching_score
        })

    # Sort the list of dictionaries by the "matching_score" key
    sorted_response = sorted(matching_results, key=lambda x: x["matching_score"], reverse=True)

    return Response(sorted_response)


# @api_view(['GET'])
# def match_candidate(request):
#     print(request.GET["candidateid"])
#     print("....get....")
#     if request.GET["candidateid"]:
#         candidate = Candidate.objects.get(candidateid=request.GET['candidateid'])
#         candidate_data = CandidateSerializer(candidate).data
#         print(candidate_data)
#
#         # get jobs data
#         jobs = Job.objects.all()
#         serializer_job = JobSerializer(jobs, many=True)
#
#         for job in serializer_job.data:
#             print("\n")
#             print(json.dumps(job))
#
#         matching_results = "??"  # matchingFunction(candidate, job_data)
#
#         return Response(matching_results)
#     return Response("no candidate id", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def match_job_company(request):
    job = Job.objects.get(jobid=request.data['jobid'])
    job_data = JobSerializer(job).data
    print(job_data)

    # get candidates data
    candidates = Candidate.objects.all()
    serializer_candidate = CandidateSerializer(candidates, many=True)

    for candidate in serializer_candidate.data:
        print("\n")
        print(json.dumps(candidate))

    matching_results = "??"  # matchingFunction(job, candidate_data)

    return Response(matching_results)

@api_view(['POST'])
def match_job_candidate_post(request):
    job_id = request.data.get('jobid')
    job = Job.objects.get(job_id=job_id)
    job_description = f"{job.title} {job.description}"

    matching_results = []
    candidates = Candidate.objects.select_related('user').only('user__description')
    for candidate in candidates:
        candidate_id = candidate.user.id

        # Get the expertise names for the candidate
        expertise_names = [ce.expertise.name for ce in Candidate_Expertise.objects.filter(candidate=candidate)]

        # Build the candidate_profile string
        candidate_profile = f"{candidate.user.description} {candidate.education} {candidate.work_experience} {candidate.volunteer_experience} {candidate.courses}"

        # Append the expertise names to the candidate_profile
        if expertise_names:
            candidate_profile = ' '.join(candidate_profile.split() + expertise_names)

        # Calculate matching results for each job
        matching_score = matchingFunction(candidate_profile, job_description)
        matching_results.append({
            "candidate_id": candidate_id,
            "matching_score": matching_score
        })
        
    # Sort the list of dictionaries by the "matching_score" key
    sorted_response = sorted(matching_results, key=lambda x: x["matching_score"], reverse=True)

    return Response(sorted_response)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate_user(request, username=username, password=password)

    if user is not None:
        return Response({'user': user})
    else:
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

@api_view(['DELETE'])
def delete_user(request):
    try:
        instance = User.objects.get(username=request.data['username'])
        if instance:
            instance.delete()
            return Response("ok")
        return Response("User not found and could not be deleted", status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response("Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete_users(request):
    try:
        instance = User.objects.filter(username=request.data['username'])
        if instance:
            instance.delete()
            return Response("ok")
        return Response("User not found and could not be deleted", status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response("Error", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
