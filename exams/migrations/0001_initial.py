# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-06-02 14:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answers',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_number', models.IntegerField()),
                ('choice_1', models.CharField(max_length=50)),
                ('choice_2', models.CharField(max_length=50)),
                ('choice_3', models.CharField(max_length=50)),
                ('choice_4', models.CharField(max_length=50)),
                ('correct_choice', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='CreatedExamDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('email_id', models.EmailField(db_index=True, max_length=254)),
                ('exam_id', models.CharField(db_index=True, max_length=15, unique=True)),
                ('timestamp', models.DateTimeField()),
                ('exam_duration', models.CharField(max_length=5)),
                ('exam_password', models.CharField(default=0, max_length=200)),
                ('contact_no', models.CharField(default=0, max_length=12)),
                ('country_code', models.CharField(default=0, max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='Questions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_number', models.IntegerField()),
                ('question_text', models.CharField(max_length=200)),
                ('exam_create_date', models.DateTimeField()),
                ('exam_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exams.CreatedExamDetails', to_field='exam_id')),
            ],
        ),
        migrations.AddField(
            model_name='answers',
            name='exam_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='exams.CreatedExamDetails', to_field='exam_id'),
        ),
    ]
