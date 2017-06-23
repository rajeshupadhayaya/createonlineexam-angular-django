from django.db import models


class CreatedExamDetails(models.Model):
    user_id = models.IntegerField()
    email_id = models.EmailField(db_index=True)
    exam_id = models.CharField(max_length=15,unique=True,db_index=True)
    timestamp = models.DateTimeField(auto_now_add=False)
    exam_duration = models.CharField(max_length=5)
    exam_password = models.CharField(max_length=200,default=0)
    contact_no = models.CharField(max_length=12, default=0)
    country_code = models.CharField(max_length=5,default=0)

    def __str__(self):
        return self.user_id


class Questions(models.Model):
    question_number = models.IntegerField()
    question_text = models.CharField(max_length=200)
    exam_id = models.ForeignKey(CreatedExamDetails, to_field='exam_id')
    exam_create_date = models.DateTimeField(auto_now_add=False)

    def __str__(self):
        return self.question_text


class Answers(models.Model):
    question_number = models.IntegerField()
    exam_id = models.ForeignKey(CreatedExamDetails, to_field='exam_id')
    choice_1 = models.CharField(max_length=50)
    choice_2 = models.CharField(max_length=50)
    choice_3 = models.CharField(max_length=50)
    choice_4 = models.CharField(max_length=50)
    correct_choice = models.CharField(max_length=50)

    def __str__(self):

        return self.correct_choice
