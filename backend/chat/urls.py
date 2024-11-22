from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.RoomListView.as_view(), name='room-list'),
    path('rooms/<str:room_name>/messages/', views.MessageListCreateView.as_view(), name='room-messages'),
    path('html/', views.index, name='index'),

    # path('notifications/', views.get_notifications, name='get_notifications'),
    # path('notifications/<int:notification_id>/read/', views.mark_notification_as_read, name='mark_notification_as_read'),
    # path('notifications/read_all/', views.mark_all_notifications_as_read, name='mark_all_notifications_as_read'),

]
