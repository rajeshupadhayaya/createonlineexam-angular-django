# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-06-04 10:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_viewtemplate_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='user_type',
            field=models.IntegerField(),
        ),
    ]
