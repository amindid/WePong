# Generated by Django 4.2.16 on 2024-11-28 16:46

import django.contrib.auth.models
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('is_email_confirmed', models.BooleanField(default=False)),
                ('wallet', models.IntegerField(default=400)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='avatars/')),
                ('external_avatar', models.URLField(blank=True, max_length=500, null=True)),
                ('isTwoFA', models.BooleanField(default=False)),
                ('isAuth', models.BooleanField(default=False)),
                ('authProvider', models.CharField(max_length=255, null=True)),
                ('TwoFACode', models.CharField(blank=True, max_length=6, null=True)),
                ('TwoFA_sent_at', models.DateTimeField(blank=True, null=True)),
                ('userStatus', models.CharField(max_length=255, null=True)),
                ('Blocked', models.JSONField(blank=True, default=list, null=True)),
                ('friends', models.JSONField(blank=True, default=list, null=True)),
                ('friendRequests', models.JSONField(blank=True, default=list, null=True)),
                ('MyRequests', models.JSONField(blank=True, default=list, null=True)),
                ('wins', models.IntegerField(default=0)),
                ('loses', models.IntegerField(default=0)),
                ('createdAt', models.DateTimeField(default=django.utils.timezone.now)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]