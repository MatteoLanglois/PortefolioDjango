# Generated by Django 4.0.5 on 2023-04-09 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portefolio', '0003_education_visible_experience_visible_hobbie_visible_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='language',
            name='visible',
            field=models.BooleanField(default=True),
        ),
    ]
