# Generated by Django 4.1.7 on 2023-03-10 11:52

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_delete_user_userprofile_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='age',
            field=models.IntegerField(default=0, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='bmi',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='bmr',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='cousine',
            field=models.CharField(choices=[('Morocco', 'Morocco'), ('Turkey', 'Turkey'), ('Spain', 'Spain')], default='Spain', max_length=10),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='diary',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='eggs',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='energy_intake',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='fish',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female')], default='male', max_length=10),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='halal',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='height',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='pal',
            field=models.CharField(choices=[('Sedentary', 'Sedentary'), ('Low active', 'Low Active'), ('Active', 'Active'), ('Very active', 'Very Active')], default='Active', max_length=50),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='weight',
            field=models.FloatField(default=0.0),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='yob',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
