from django.db import models


class Door(models.Model):
    collection = models.CharField(max_length=100, default='Classic', null=False)
    TYPE_CHOICES = [
        ('Classic', 'Classic'),
        ('DO', 'DO'),
        ('VO', 'VO'),
    ]

    type = models.CharField(max_length=7, choices=TYPE_CHOICES)
    shape = models.CharField(max_length=100, default='default', null=False)
    portal = models.CharField(max_length=100, default='default', null=False)
    bevel = models.CharField(max_length=100, default='default', null=False)
    molding = models.CharField(max_length=100, default='default', null=False)
    image = models.ImageField(upload_to='door_images/', null=True, blank=True)
    icon = models.ImageField(upload_to='icon/', null=True, blank=True)
    portal_image = models.ImageField(upload_to='portal_images/', null=True, blank=True)
    molding_image = models.ImageField(upload_to='molding_images/', null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0, null=False)

    def __str__(self):
        return 'collection '+ self.collection +'shape ' + self.shape + 'portal ' + self.portal + 'bevel '+ self.bevel + 'molding ' + self.molding + 'price ' + str(self.price) + 'image ' + self.image.name

    def get_image(self):
        return self.image.name


class Basket(models.Model):
    code = models.CharField(max_length=512)
    door = models.ForeignKey(Door, on_delete=models.CASCADE)
    count = models.DecimalField(max_digits=5, decimal_places=0, default=1, null=False)
    color = models.CharField(max_length=100, default='default', null=False)

    def __str__(self):
        return {'code': self.code, 'door': self.door, 'count': self.count, 'color': self.color}


class Orders(models.Model):
    name = models.CharField(max_length=100, default='default', null=False)
    phone = models.CharField(max_length=100, default='default', null=False)
    delivery = models.CharField(max_length=100, default='default', null=False)
    size = models.CharField(max_length=100, default='default', null=False)
    collection = models.CharField(max_length=100, default='default', null=False)
    shape = models.CharField(max_length=100, default='default', null=False)
    portal = models.CharField(max_length=100, default='default', null=False)
    bevel = models.CharField(max_length=100, default='default', null=False)
    molding = models.CharField(max_length=100, default='default', null=False)
    color = models.CharField(max_length=100, default='default', null=False)
    count = models.CharField(max_length=100, default='default', null=False)
    price = models.CharField(max_length=100, default='default', null=False)