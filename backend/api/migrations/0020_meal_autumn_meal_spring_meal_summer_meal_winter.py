# Generated by Django 4.1.7 on 2023-04-03 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_meal_country_meal_name_en_meal_name_gr_meal_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='autumn',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='meal',
            name='spring',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='meal',
            name='summer',
            field=models.BooleanField(null=True),
        ),
        migrations.AddField(
            model_name='meal',
            name='winter',
            field=models.BooleanField(null=True),
        ),
    ]
