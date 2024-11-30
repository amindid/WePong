# Generated by Django 4.2.16 on 2024-10-02 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0002_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='MyRequests',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='friendRequests',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='friends',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]