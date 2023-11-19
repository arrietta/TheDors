from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('catalog/', views.catalog, name='catalog'),
    path('', views.main, name='main'),
    path('cart/', views.cart, name='cart'),
    path('Delete/<int:pk>/', views.delete, name='delete'),
    path('save/', views.save, name='save'),
    path('order/', views.order, name='order'),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

