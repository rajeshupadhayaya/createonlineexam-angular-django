from django.shortcuts import render
import json, django.db, datetime
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status, views
from .models import Questions, Answers, CreatedExamDetails
# Create your views here.


class ObjectiveView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)
        exam_id = datetime.datetime.now().strftime("EX%y%m%d%H%M%S%f")
        exam_creation_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S.%f')

        try:
            for x in range(data.noOfQues):
                ques = data.question.strip()
                ansa = data.answer['a'].strip()
                ansb = data.answer['b'].strip()
                ansc = data.answer['c'].strip()
                ansd = data.answer['d'].strip()
                ansCorrect = data.answer['correct'].strip()
                question_set = Questions(question_number= x ,question_text=ques, exam_id_id = exam_id, exam_create_date=exam_creation_time)
                answer_set = Answers(question_number=x,choice_1=ansa, choice_2= ansb, choice_3=ansc, choice_4=ansd, correct_choice=ansCorrect,exam_id_id=exam_id)
                question_set.save()
                answer_set.save()

        except:
            return Response('error on creating exam')


