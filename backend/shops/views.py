from random import sample
from django.db.models          import Q, Value
from rest_framework            import viewsets
from rest_framework.decorators import action
from rest_framework.response   import Response

from .models      import Shop,Category
from .serializers import ShopListSerializer, ShopDetailSerializer

class ShopListViewSet(viewsets.ModelViewSet):
    def list(self,request):
        latitude  = float(request.query_params.get('latitude'))
        longitude = float(request.query_params.get('longitude'))
        range_condition = (
            Q(latitude__range = (latitude-0.01, latitude+0.01))&
            Q(longitude__range= (longitude-0.015, longitude+0.015))
        )
        shops       = Shop.objects.filter(range_condition).order_by('-kakao_score')
        result_list = []

        if request.query_params.get('all') == 'True':
            serializer = ShopListSerializer(shops,many=True)
            result     = {'전체' : serializer.data}
            result_list.append(result)
                
        if request.query_params.get('top') == 'True':
            serializer = ShopListSerializer(shops[:10],many=True)
            result     = {'오늘의 추천' : serializer.data}
            result_list.append(result)

        if request.query_params.get('category') == 'True':
            categories = sample(range(1,Category.objects.all().count()+1),3)
            for category_id in categories:
                category            = Category.objects.get(id=category_id)
                shops_category      = shops.filter(category=category)[:10]
                serializer_category = ShopListSerializer(shops_category, many=True)
                result              = {category.category_name + ' 맛집': serializer_category.data}
                result_list.append(result)

        return Response(result_list)

class ShopDetailViewSet(viewsets.ModelViewSet):
    serializer_class = ShopDetailSerializer
    def get_queryset(self):
        queryset = Shop.objects.filter(id=self.kwargs['id'])
        return queryset