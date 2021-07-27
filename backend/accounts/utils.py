from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

# Custom Authentication을 만들어 사용

class TestAuthentication(BaseBackend):

    def authenticate(self, request, username=None, password=None):
        User = get_user_model()
        if username is None:
            username = request.data.get('username', '')
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None