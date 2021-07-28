import jwt

from django.http            import JsonResponse
from project.settings.local import SECRET_KEY

from accounts.models import AccountGuest
from accounts.models import AccountGuest

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth          import get_user_model

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

def login_decorator(func):
    def wrapper(self, request, *args, **kwargs):
        try:
            
            token        = request.headers.get('Authorization', None)
            payload      = jwt.decode(token, SECRET_KEY, algorithms="HS256")
            user         = AccountGuest.objects.get(id=payload['user_id'])
            request.user = user

            return func(self, request, *args, **kwargs)
        
        except jwt.exceptions.DecodeError:
            return JsonResponse({'message':'INVALID_TOKEN'}, status=401)
        
        except AccountGuest.DoesNotExist:
            return JsonResponse({'message':'INVALID_USER'}, status=401)

    return wrapper