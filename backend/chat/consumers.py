import json
from urllib.parse import parse_qs
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Room, Message
from asgiref.sync import sync_to_async
from django.contrib.auth import get_user_model
from datetime import datetime
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed



class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("=====> WebSocket connected")
        access_tocken = self.scope["cookies"].get("access_token")

        # Validate the token and authenticate the user
        try:
            validated_token = await sync_to_async(JWTAuthentication().get_validated_token)(access_tocken)
            self.user = await sync_to_async(JWTAuthentication().get_user)(validated_token)
            self.user_id = self.user.id
        except AuthenticationFailed as e:
            print(f"Authentication failed: {e}")
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print(f"WebSocket disconnected with code: {close_code}")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            print(f"Received message: {text_data}")
            data = json.loads(text_data)
            message = data['content']

            # Fetch the User object using the user ID from query params
            user = await sync_to_async(get_user_model().objects.get)(id=self.user_id)
            # username = user.username
            
            timestamp = datetime.now().isoformat()  # You can format this as needed

            # Save message to the database
            room = await sync_to_async(Room.objects.get)(name=self.room_name)
            # await sync_to_async(Message.objects.create)(user=user, room=room, content=message)
            await sync_to_async(Message.objects.create)(user=user, room=room, content=message, timestamp=timestamp)

            # Send message to room group
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    # 'username': username
                    'user_id': self.user_id,  # Include the user ID
                    'timestamp': timestamp
                }
            )
        except Exception as e:
            print(f"An error occurred: {e}")

    async def chat_message(self, event):
        message = event['message']
        # username = event['username']
        user_id = event['user_id']
        timestamp = event['timestamp']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            # 'username': username,
            'message': message,
            'user_id': user_id,
            'timestamp': timestamp
        }))



# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("=====> Chat WebSocket connected")

#         # Get user ID and room name from query params and path
#         query_params = parse_qs(self.scope["query_string"].decode())
#         self.user_id = query_params.get("userId", [None])[0]
#         if not self.user_id:
#             await self.close()
#             return

#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = f'chat_{self.room_name}'

#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#         await self.accept()

#     async def disconnect(self, close_code):
#         print(f"WebSocket disconnected with code: {close_code}")
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )

#     async def receive(self, text_data):
#         try:
#             data = json.loads(text_data)
#             message = data['content']

#             # Fetch the User object using the user ID from query params
#             user = await sync_to_async(get_user_model().objects.get)(id=self.user_id)
#             timestamp = datetime.now().isoformat()

#             # Save the message to the database
#             room = await sync_to_async(Room.objects.get)(name=self.room_name)
#             message_instance = await sync_to_async(Message.objects.create)(user=user, room=room, content=message, timestamp=timestamp)

#             # Get all users in the room (excluding the sender)
#             room_users = room.users.all()

#             # Loop through users in the room and update notifications per user
#             for room_user in room_users:
#                 if room_user != user:  # Don't notify the sender
#                     # Count unread messages for this user (from sender to recipient)
#                     unread_count = await sync_to_async(Message.objects.filter)(room=room, user=room_user, is_read=False).count()

#                     # Update or create the notification for the recipient (user)
#                     notification, created = await sync_to_async(Notification.objects.get_or_create)(
#                         user=room_user, sender=user)
#                     notification.message_count = unread_count
#                     notification.last_message_timestamp = timestamp
#                     await sync_to_async(notification.save)()

#                     # Send notification update to the user's notification WebSocket
#                     if room_user != user:  # Don't notify the sender
#                         # Send the updated notification to the WebSocket
#                         await self.send_notification(room_user, unread_count, timestamp, user.id)

#             # Send message to the room group (to all users in the chat)
#             await self.channel_layer.group_send(
#                 self.room_group_name,
#                 {
#                     'type': 'chat_message',
#                     'message': message,
#                     'user_id': self.user_id,
#                     'timestamp': timestamp
#                 }
#             )
#         except Exception as e:
#             print(f"An error occurred: {e}")

#     async def chat_message(self, event):
#         message = event['message']
#         user_id = event['user_id']
#         timestamp = event['timestamp']

#         # Send message to WebSocket
#         await self.send(text_data=json.dumps({
#             'message': message,
#             'user_id': user_id,
#             'timestamp': timestamp
#         }))

#     async def send_notification(self, user, unread_count, timestamp, sender_id):
#         # Send the unread message count and last message timestamp to the user's notification WebSocket
#         # Use a user-specific channel for notifications
#         await self.channel_layer.send(
#             f"user_{user.id}_notifications",  # Use a dedicated notification channel for each user
#             {
#                 'type': 'send_notifications',
#                 'unread_count': unread_count,
#                 'last_message_timestamp': timestamp,
#                 'sender_id': sender_id
#             }
#         )


# class NotificationConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("=====> Notification WebSocket connected")

#         # Get user ID from query params
#         query_params = self.scope['query_string'].decode()
#         self.user_id = query_params.split('=')[1]  # Extract userId from query string

#         # Authenticate user by userId
#         if not self.user_id:
#             await self.close()
#             return

#         # Accept the WebSocket connection
#         await self.accept()

#     async def disconnect(self, close_code):
#         print(f"Notification WebSocket disconnected with code: {close_code}")
#         # Clean up any specific actions on disconnect if needed
#         pass

#     async def send_notifications(self, unread_count, last_message_timestamp, sender_id):
#         # Send notification message to the user through WebSocket
#         await self.send(text_data=json.dumps({
#             'unread_count': unread_count,
#             'last_message_timestamp': last_message_timestamp,
#             'sender_id': sender_id
#         }))
    
#     # This method will be called when we want to send a notification update
#     async def receive(self, text_data):
#         # Handle incoming messages from the WebSocket if necessary
#         pass

