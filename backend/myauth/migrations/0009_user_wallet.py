# Generated by Django 4.2.16 on 2024-11-06 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0008_remove_user_otptwofa_user_twofacode_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='wallet',
            field=models.IntegerField(default=400),
        ),
    ]
