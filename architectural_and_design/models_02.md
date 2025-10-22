# Models 02

- **Domain logic** remains **framework-agnostic**, using **dataclasses**.
- **Django ORM** is only used in the **repository layer**.
- This keeps your **core domain testable** and **independent of Django**, while still persisting data in a database.

## ✅ **Advantages of This Hybrid Approach**

1. **Domain is framework-independent:** fully testable with dataclasses.
2. **Persistence is separated:** Django ORM only in the repository.
3. **Service layer orchestrates business rules:** views never touch ORM directly.
4. **Aggregate handling:** domain objects manage their own invariants (`OrderDomain` + `OrderItemDomain`).
5. **Easy to swap persistence later:** you can implement `OrderRepository` with SQLAlchemy, a NoSQL DB, or an in-memory store.

---

## Diagram Flow

```text
Domain (OrderDomain, OrderItemDomain)
        ↓
Repository (maps ↔ ORM)
        ↓
Django ORM (Order, OrderItem)
        ↓
Service / Views
```

---

## **1. Domain Models (Dataclasses, Framework-Agnostic)**

```python
# orders/domain/models.py
from dataclasses import dataclass, field
from typing import List

@dataclass
class OrderItemDomain:
    product_id: int
    quantity: int

    def __post_init__(self):
        if self.quantity <= 0:
            raise ValueError("Quantity must be positive")

@dataclass
class OrderDomain:
    order_id: int
    items: List[OrderItemDomain] = field(default_factory=list)
    status: str = "pending"

    def add_item(self, product_id: int, quantity: int):
        self.items.append(OrderItemDomain(product_id, quantity))

    def confirm(self):
        if not self.items:
            raise ValueError("Cannot confirm empty order")
        self.status = "confirmed"
```

✅ Core domain is **pure Python**, fully testable without Django.

---

## **2. Django ORM Models (Persistence Layer)**

```python
# orders/infrastructure/models.py
from django.db import models

class Order(models.Model):
    order_id = models.IntegerField(unique=True)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product_id = models.IntegerField()
    quantity = models.PositiveIntegerField()
```

---

## **3. Repository (Mapping Domain ↔ ORM)**

```python
# orders/infrastructure/repositories.py
from orders.domain.models import OrderDomain, OrderItemDomain
from .models import Order, OrderItem

class OrderRepository:
    def save(self, order: OrderDomain):
        # Save or update main order
        order_table, _ = Order.objects.update_or_create(
            order_id=order.order_id,
            defaults={"status": order.status}
        )

        # Sync items
        OrderItem.objects.filter(order=order_table).delete()
        order_items = [
            OrderItem(order=order_table, product_id=item.product_id, quantity=item.quantity)
            for item in order.items
        ]
        OrderItem.objects.bulk_create(order_items)
        return order_table

    def find_by_id(self, order_id: int) -> OrderDomain | None:
        try:
            order_table = Order.objects.get(order_id=order_id)
            items = [
                OrderItemDomain(product_id=i.product_id, quantity=i.quantity)
                for i in order_table.items.all()
            ]
            return OrderDomain(order_id=order_table.order_id, items=items, status=order_table.status)
        except Order.DoesNotExist:
            return None
```

✅ All Django logic is **isolated in the repository**, domain stays clean.

---

## **4. Service Layer (Use Cases)**

```python
# orders/services.py
from .infrastructure.repositories import OrderRepository
from orders.domain.models import OrderDomain

class OrderService:
    def __init__(self):
        self.repo = OrderRepository()

    def add_item_to_order(self, order_id: int, product_id: int, quantity: int):
        order = self.repo.find_by_id(order_id)
        if not order:
            order = OrderDomain(order_id=order_id)
        order.add_item(product_id, quantity)
        self.repo.save(order)
        return order

    def confirm_order(self, order_id: int):
        order = self.repo.find_by_id(order_id)
        if not order:
            raise ValueError("Order not found")
        order.confirm()
        self.repo.save(order)
        return order
```

---

## **5. Optional Django Views**

```python
# orders/views.py
from django.http import JsonResponse
from .services import OrderService

order_service = OrderService()

def add_item_view(request, order_id: int, product_id: int, quantity: int):
    try:
        order = order_service.add_item_to_order(order_id, product_id, quantity)
        items = [{"product_id": i.product_id, "quantity": i.quantity} for i in order.items]
        return JsonResponse({"order_id": order.order_id, "status": order.status, "items": items})
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)

def confirm_order_view(request, order_id: int):
    try:
        order = order_service.confirm_order(order_id)
        items = [{"product_id": i.product_id, "quantity": i.quantity} for i in order.items]
        return JsonResponse({"order_id": order.order_id, "status": order.status, "items": items})
    except ValueError as e:
        return JsonResponse({"error": str(e)}, status=400)
```
