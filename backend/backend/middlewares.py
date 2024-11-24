# from django.http import JsonResponse
# from rest_framework.response import Response
# from django.utils.deprecation import MiddlewareMixin
# from django.utils.cache import get_cache_key
# from django.contrib.auth.middleware import get_user
# from django.utils.deprecation import MiddlewareMixin
# from django.core.cache import cache
# from django.http import HttpResponse
# from django.utils.encoding import force_str


# class JsonResponseMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         response = self.get_response(request)
#         if (
#             response.status_code >= 400
#             and not isinstance(response, JsonResponse)
#             and not isinstance(response, Response)
#         ):
#             return JsonResponse(
#                 {
#                     "details": response.reason_phrase,
#                 },
#                 status=response.status_code,
#             )
#         return response

class JWTFromCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        access_token = request.COOKIES.get('access_token')
        if access_token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {access_token}'
        response = self.get_response(request)
        return response


# class UserCacheMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         # Skip caching for URLs that start with /admin/
#         if request.path.startswith('/admin/'):
#             return None

#         user = get_user(request)  # Get the user object from the request
#         if user.is_authenticated:
#             cache_key = get_cache_key(request)
#             user_specific_cache_key = f"{cache_key}_{user.id}"
#             request._cache_key = user_specific_cache_key
#             # Check if data is already cached
#             cached_data = cache.get(request._cache_key)
#             if cached_data:
#                 # Return the cached response
#                 return HttpResponse(cached_data, content_type="application/json")


# class JWTFromCookieMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response  # Save the response callable

#     def __call__(self, request):
#         # Logic to handle the request, e.g., adding JWT from cookies
#         jwt_token = request.COOKIES.get('jwt')
#         if jwt_token:
#             request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_token}'

#         # Process the request and get the response
#         response = self.get_response(request)
#         return response
