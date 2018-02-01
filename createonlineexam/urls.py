"""createonlineexam URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from authentication.views import AccountViewSet, LoginView, LogoutView, LayoutView
from createonlineexam.views import IndexView
# from authentication import views

app_name = 'authentication'

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


# from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/auth/layout/(?P<user_type>.+)/', LayoutView.as_view(), name='layout'),
    url(r'^create/', include('exams.urls')),
#     url(r'^.*$', IndexView.as_view(), name='index'),
    url(r'^$', IndexView.as_view(), name='index'),


    # url(r'^', include('createonlineexam.urls')),
]
