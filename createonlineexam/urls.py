
from django.conf.urls import url, include, patterns
from django.contrib import admin
from rest_framework import routers
from authentication.views import AccountViewSet, LoginView, LogoutView, LayoutView
from createonlineexam.views import IndexView
# from authentication import views

app_name = 'authentication'

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)



# from . import views

# urlpatterns = [
urlpatterns = patterns(
    '',
    # url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/auth/layout/(?P<user_type>.+)/', LayoutView.as_view(), name='layout'),
    url(r'^create/', include('exams.urls')),
    url(r'^.*$', IndexView.as_view(), name='index'),


    # url(r'^', include('createonlineexam.urls')),
)