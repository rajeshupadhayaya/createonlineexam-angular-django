from django.conf.urls import url
from exams.views import ObjectiveView
# from . import views
app_name = 'exams'

urlpatterns = [
    url(r'^objective/$', ObjectiveView.as_view(), name='objective'),
]