import json
import uuid

from django.http import JsonResponse
from django.core.serializers import serialize
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from .telegram_bot import send_message_to_bot, send_photo_to_bot
from .forms import DoorForm
from .models import Door, Basket, Orders


def identification(request):
    unique_id = request.session.get('unique_id', 'Not available')
    if not unique_id or unique_id == 'Not available':
        unique_id = str(uuid.uuid4())
        request.session['unique_id'] = unique_id
    else:
        unique_id = request.session.get('unique_id', 'Not available')
    return unique_id


def catalog(request):
    unique_id = identification(request)
    print(unique_id)
    doors = Door.objects.all()
    data = json.loads(serializers.serialize('json', doors))
    if request.method == 'POST':
        form = DoorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('cart')

    return render(request, 'catalog.html', {'data': data, 'unique_id': unique_id})


def cart(request):
    unique_id = identification(request)
    orders = Basket.objects.filter(code=unique_id)

    return render(request, 'Cart.html', {'orders': orders, 'unique_id': unique_id})


@csrf_exempt
def delete(request, pk):
    if request.method == 'POST':
        order = Basket.objects.get(pk=pk)
        order.delete()

    return JsonResponse({'message': 'Data saved deleted'})


@csrf_exempt
def save(request):
    if request.method == 'POST':
        data_to_save = json.loads(request.body)['data']
        for data in data_to_save:
            order = Basket.objects.get(pk=data['id'])
            order.count = data['count']
            order.save()

    return JsonResponse({'message': 'Data saved successfully'})


def main(request):
    return render(request, 'main.html', )


def order(request):
    Name = request.POST['name']
    id = request.POST['unique_id']
    phone = request.POST['phone']
    delivery = request.POST['delivery']
    size = request.POST['size']

    doors = Basket.objects.filter(code=id)

    for x in doors:
        collection = x.door.collection
        shape = x.door.shape
        portal = x.door.portal
        bevel = x.door.bevel
        molding = x.door.molding
        color = x.color
        price = x.door.price
        image = x.door.image.url
        count = x.count
        total = price * count

        message = f"Имя :{Name} \nНомер: {phone}\nДоставка : {delivery} Замеры : {size}  \nКоллекция : {collection} Форма : {shape}  Портал : {portal}  Фреза : {bevel}  Багет : {molding} Цвет : {color} \nКоличество :{count} Итого : {total}"

        send_photo_to_bot(image)

        send_message_to_bot(message)


        Save_order = Orders()
        Save_order.name = Name
        Save_order.phone = phone
        Save_order.delivery = delivery
        Save_order.size = size
        Save_order.collection = collection
        Save_order.shape = shape
        Save_order.portal = portal
        Save_order.bevel = bevel
        Save_order.molding = molding
        Save_order.color = color
        Save_order.count = str(count)
        Save_order.price = str(price)
        Save_order.save()
    doors.delete()
    return main(request)
