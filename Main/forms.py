from django import forms
from .models import Basket


class DoorForm(forms.ModelForm):
    class Meta:
        model = Basket
        fields = ['code', 'door', 'color']


# class SaveData(forms.ModelForm):
#     class Meta:
#         model = Basket
#         fields = {'name', 'phone', 'delivery', 'size', 'collection', 'shape', 'portal', 'bevel', 'molding', 'color',
#                   'count', 'price'}
