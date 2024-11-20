from rest_framework import generics
from .models import Room, Message, Notification
from .serializers import RoomSerializer, MessageSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django.shortcuts import render
from django.http import JsonResponse
import jwt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authentication import BaseAuthentication
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

class CookieJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get('access_token')
        if not access_token:
            return None
        try:
            payload = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed({'error': 'Token has expired.'})
        except jwt.InvalidTokenError:
            raise AuthenticationFailed({'error': 'Invalid token.'})
        
        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed({'error': 'User not found.'})
        
        return (user, None)

class RoomListView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def perform_create(self, serializer):
        serializer.save()


class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room_name = self.kwargs['room_name']
        return Message.objects.filter(room__name=room_name)

    def perform_create(self, serializer):
        room_name = self.kwargs['room_name']
        room = get_object_or_404(Room, name=room_name)
        serializer.save(user=self.request.user, room=room)


# def get_notifications(request):
#     # Ensure the user is authenticated
#     if not request.user.is_authenticated:
#         return JsonResponse({'error': 'User not authenticated'}, status=401)

#     # Get notifications for the logged-in user
#     notifications = Notification.objects.filter(user=request.user)

#     # Serialize the notifications to return in JSON format
#     notification_data = [
#         {
#             'sender': notification.sender.username,
#             'message_count': notification.message_count,
#             'last_message_timestamp': notification.last_message_timestamp.isoformat(),
#             'is_read': notification.is_read,
#         }
#         for notification in notifications
#     ]
    
#     return JsonResponse({'notifications': notification_data})


# def mark_notification_as_read(request, notification_id):
#     if not request.user.is_authenticated:
#         return JsonResponse({'error': 'User not authenticated'}, status=401)
    
#     try:
#         # Get the notification for the logged-in user and the given ID
#         notification = Notification.objects.get(id=notification_id, user=request.user)
        
#         # Mark the notification as read
#         notification.is_read = True
#         notification.save()
        
#         return JsonResponse({'message': 'Notification marked as read'})
#     except Notification.DoesNotExist:
#         return JsonResponse({'error': 'Notification not found'}, status=404)
    

# def mark_all_notifications_as_read(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({'error': 'User not authenticated'}, status=401)

#     # Get all notifications for the logged-in user
#     notifications = Notification.objects.filter(user=request.user, is_read=False)

#     # Mark all notifications as read
#     notifications.update(is_read=True)
    
#     return JsonResponse({'message': 'All notifications marked as read'})

def index(request):
    return render(request, 'index.html')