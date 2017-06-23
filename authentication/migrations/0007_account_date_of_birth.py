# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-06-04 18:03
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0006_account_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2016, 6, 4, 18, 3, 49, 10831, tzinfo=utc)),
            preserve_default=False,
        ),
    ]