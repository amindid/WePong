# Generated by Django 4.2.16 on 2024-11-02 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0006_alter_user_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResetPasswordModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
    ]
