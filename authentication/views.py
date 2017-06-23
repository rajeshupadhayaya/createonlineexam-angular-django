from rest_framework import permissions, viewsets, status, views, generics
from django.contrib.auth import authenticate, login, logout
from authentication.models import Account, ViewTemplate
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer, LayoutSerializer
from rest_framework.response import Response
from rest_framework.decorators import detail_route


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):

        if self.request.method in permissions.SAFE_METHODS:
            return permissions.AllowAny()

        if self.request.method == 'post':
            return permissions.AllowAny()

        return permissions.IsAuthenticated(), IsAccountOwner()

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        print(serializer)
        if serializer.is_valid():
            # print('valid')
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):

    def post(self, request):
        # print(request)
        # data = json.loads(request.body)
        data = request.data

        email = data.get('email')
        password = data.get('password')

        user = authenticate(username=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                serialized = AccountSerializer(user)
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)


class LayoutView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = LayoutSerializer

    def get_queryset(self):
        userType = self.kwargs['user_type']
        queryset = ViewTemplate.objects.filter(user_type=userType)
        return queryset
