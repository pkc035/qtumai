import requests, jwt

from django.http      import JsonResponse
from django.views     import View

from accounts.models  import AccountGuest
from project.settings import ALGORITHM, SECRET_KEY



class KakaoLogIn(View):
    def get(self, request):
            access_token    = request.headers.get('Authorization')
            profile_request = requests.get(
                "https://kapi.kakao.com/v2/user/me", headers={"Authorization":f"Bearer {access_token}"},
            )
            profile_json  = profile_request.json()
            kakao_number  = profile_json["id"]

            if AccountGuest.objects.filter(kakao_number=kakao_number).exists():
                guest = AccountGuest.objects.get(kakao_number=kakao_number)
                token = jwt.encode({"guest_id":guest.id}, SECRET_KEY, ALGORITHM)
                return JsonResponse({"token": token},status=200)

            else:
                result={'kakao_number':kakao_number}
                return JsonResponse(result,status=400)


class GoogleLoginView(View):
    def get(self,request):
        access_token    = request.headers.get("Authorization")
        url      = 'https://oauth2.googleapis.com/tokeninfo?id_token='
        response = requests.get(url+access_token)
        user     = response.json()
        if AccountGuest.objects.filter(google_number = user['sub']).exists(): 
            guest           = AccountGuest.objects.get(google_number=user['sub']) 
            encoded_jwt         = jwt.encode({'guest_id': guest.id},SECRET_KEY, ALGORITHM)
            return JsonResponse({ 
                'access_token'  : encoded_jwt.decode('UTF-8')}, status=200)     

        else: 
            return JsonResponse({"message":"USER_DOES_NOT_EXIST"},status=400)
