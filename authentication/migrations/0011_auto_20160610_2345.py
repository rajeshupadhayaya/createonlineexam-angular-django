# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-06-10 18:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0010_auto_20160605_1552'),
    ]

    operations = [
        migrations.AlterField(
            model_name='viewtemplate',
            name='user_type',
            field=models.IntegerField(unique=True),
        ),
    ]