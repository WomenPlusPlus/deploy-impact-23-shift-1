import os
from functools import lru_cache

from gensim.models import KeyedVectors

from .models import User
from .serializers import *


def authenticate_user(request, username, password):
    users = User.objects.all()
    serializer = UserRegistrationSerializer(users, many=True)

    for user_data in serializer.data:
        if user_data.get('username') == username and user_data.get('password') == password:
            return user_data
    return None


@lru_cache(maxsize=None)  # Cache with unlimited size
def load_word2vec_model():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    model_relative_path = 'downloaded_data/glove-wiki-gigaword-100.gensim'  # 160 MB
    # model_relative_path = 'downloaded_data/word2vec-google-news-300.gensim' # 3.4 GB
    model_path = os.path.join(project_root, model_relative_path)

    # Load the Word2Vec model
    return KeyedVectors.load(model_path)
