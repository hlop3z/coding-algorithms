# DDD + CQRS + Hexagonal Architecture

## **Enterprise-Scale DDD Folder Structure (Text-Based)**

```text
ecommerce/                      # Realm / Bounded Context
├─ domain/                       # Pure domain logic (DDD)
│  ├─ __init__.py                # exposes aggregates/entities for import
│  ├─ order/
│  │  ├─ __init__.py             # exposes: Order, OrderItem
│  │  ├─ entities.py             # Order, OrderItem
│  │  ├─ value_objects.py        # Address, Money
│  │  ├─ services.py             # Domain-specific business logic
│  │  └─ factories.py            # OrderFactory, etc.
│  ├─ product/
│  │  ├─ __init__.py
│  │  ├─ entities.py             # Product, ProductVariant
│  │  └─ value_objects.py        # SKU, Price, Currency
│  └─ shared/
│     └─ primitives.py           # UUID, Money, Address, common value objects
│
├─ infrastructure/               # Adapters / Persistence / Messaging
│  ├─ __init__.py
│  ├─ orm/
│  │  ├─ order.py                # Django ORM model Order
│  │  ├─ order_item.py           # Django ORM model OrderItem
│  │  ├─ product.py              # ORM Product models
│  │  └─ product_variant.py
│  ├─ persistence/
│  │  ├─ order_repository.py     # Maps OrderDomain ↔ Order ORM
│  │  └─ product_repository.py   # Maps ProductDomain ↔ Product ORM
│  ├─ messaging/
│  │  └─ event_bus.py            # Kafka, RabbitMQ adapters
│  └─ external_services/
│     └─ payment_gateway.py
│
├─ application/                   # Use-case / Application Services
│  ├─ __init__.py
│  ├─ commands/
│  │  ├─ order_handlers.py       # Command handlers (write-side CQRS)
│  │  └─ product_handlers.py
│  ├─ queries/
│  │  ├─ order_queries.py        # Query handlers / read models
│  │  └─ product_queries.py
│  └─ services.py                # Orchestration layer / cross-domain services
│
├─ api/                           # Adapters for UI / REST / GraphQL
│  ├─ __init__.py
│  ├─ rest/
│  │  ├─ order_views.py          # Django REST or DRF views
│  │  └─ product_views.py
│  └─ graphql/
│     ├─ order_schema.py
│     └─ product_schema.py
│
└─ tests/
   ├─ domain/                    # Unit tests for pure domain
   ├─ infrastructure/            # Integration tests with DB/messaging
   ├─ application/               # Use-case/service tests
   └─ api/                       # API / endpoint tests
```

---

## **Dotted Path / Import Examples**

| Layer / Component                    | Example Import Path                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| Domain aggregate: Order              | `from ecommerce.domain.order.entities import Order`                                 |
| Domain value object: Money           | `from ecommerce.domain.shared.primitives import Money`                              |
| ORM model: Order                     | `from ecommerce.infrastructure.orm.order import Order as OrderORM`                  |
| Repository: OrderRepository          | `from ecommerce.infrastructure.persistence.order_repository import OrderRepository` |
| Command handler: AddItemToOrder      | `from ecommerce.application.commands.order_handlers import AddItemToOrderCommand`   |
| Query handler: OrderSummaryReadModel | `from ecommerce.application.queries.order_queries import OrderSummaryReadModel`     |
| REST API view: confirm order         | `from ecommerce.api.rest.order_views import confirm_order_view`                     |

✅ Advantages:

- **Folder hierarchy conveys context** — no need to bloat class names with `Domain`/`ORM` suffixes.
- **Consistent imports** → discoverable even in massive repos.
- **CQRS separation** — commands and queries organized by aggregate.
- **Infrastructure adapters** isolated → domain remains pure.
- **Scalable** — adding new aggregates/domains just means adding folders.

---

### **Professional Naming & Access Guidelines**

1. **Domain Layer**

   - Short, clean names: `Order`, `Product`.
   - Namespace via folders: `domain.order`, `domain.product`.
   - Factories optional, inside `domain.<aggregate>/factories.py`.

2. **Infrastructure Layer**

   - ORM models: same name as domain (`Order`) but in `infrastructure.orm`.
   - Repositories: `OrderRepository` in `infrastructure.persistence`.
   - Messaging/External services in their respective subfolders.

3. **Application Layer**

   - Commands/Queries grouped per aggregate.
   - Services orchestrate multiple aggregates.

4. **API Layer**

   - REST / GraphQL adapters only, convert external requests → application commands/queries.

5. **Tests**

   - Mirror folder hierarchy of production code for clarity.

---

Perfect — here’s a **text-based “dotted-path cheat sheet”** showing exactly **how to consistently access each component** in a large DDD + CQRS + Hexagonal setup, using the `ecommerce` realm as an example. This is exactly the kind of guide developers in big teams use to avoid confusion.

---

## **E-Commerce Realm: Dotted-Path Cheat Sheet**

### **1. Domain Layer (Core / Pure DDD)**

| Concept                 | Import Path / Access Example                                   |
| ----------------------- | -------------------------------------------------------------- |
| Aggregate: Order        | `from ecommerce.domain.order.entities import Order`            |
| Aggregate: Product      | `from ecommerce.domain.product.entities import Product`        |
| Value Object: OrderItem | `from ecommerce.domain.order.entities import OrderItem`        |
| Value Object: Money     | `from ecommerce.domain.shared.primitives import Money`         |
| Domain Service: Pricing | `from ecommerce.domain.product.services import PricingService` |
| Factory: OrderFactory   | `from ecommerce.domain.order.factories import OrderFactory`    |

---

### **2. Infrastructure Layer (Adapters)**

| Concept                                  | Import Path / Access Example                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| ORM Model: Order                         | `from ecommerce.infrastructure.orm.order import Order as OrderORM`                      |
| ORM Model: OrderItem                     | `from ecommerce.infrastructure.orm.order_item import OrderItem as OrderItemORM`         |
| ORM Model: Product                       | `from ecommerce.infrastructure.orm.product import Product as ProductORM`                |
| Repository: OrderRepository              | `from ecommerce.infrastructure.persistence.order_repository import OrderRepository`     |
| Repository: ProductRepository            | `from ecommerce.infrastructure.persistence.product_repository import ProductRepository` |
| Messaging Adapter: EventBus              | `from ecommerce.infrastructure.messaging.event_bus import EventBus`                     |
| External Service Adapter: PaymentGateway | `from ecommerce.infrastructure.external_services.payment_gateway import PaymentGateway` |

---

### **3. Application Layer (Use Cases / CQRS)**

#### **Command Side (Write)**

| Concept                           | Import Path / Access Example                                                      |
| --------------------------------- | --------------------------------------------------------------------------------- |
| Command Handler: AddItemToOrder   | `from ecommerce.application.commands.order_handlers import AddItemToOrderCommand` |
| Command Handler: ConfirmOrder     | `from ecommerce.application.commands.order_handlers import ConfirmOrderCommand`   |
| Application Service: OrderService | `from ecommerce.application.services import OrderService`                         |

#### **Query Side (Read / Projections)**

| Concept                              | Import Path / Access Example                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| Read Model: OrderSummaryReadModel    | `from ecommerce.application.queries.order_queries import OrderSummaryReadModel`      |
| Query Handler: FetchOrdersByCustomer | `from ecommerce.application.queries.order_queries import FetchOrdersByCustomerQuery` |

---

### **4. API / Adapter Layer**

| Concept                      | Import Path / Access Example                                    |
| ---------------------------- | --------------------------------------------------------------- |
| REST View: Add Item to Order | `from ecommerce.api.rest.order_views import add_item_view`      |
| REST View: Confirm Order     | `from ecommerce.api.rest.order_views import confirm_order_view` |
| GraphQL Schema: OrderType    | `from ecommerce.api.graphql.order_schema import OrderType`      |

---

### **5. Shared / Utilities**

| Concept          | Import Path / Access Example                        |
| ---------------- | --------------------------------------------------- |
| Logger Singleton | `from ecommerce.domain.shared.logger import Logger` |
| Config Singleton | `from ecommerce.domain.shared.config import Config` |
| Cache Singleton  | `from ecommerce.domain.shared.cache import Cache`   |

---

### **6. Test Layer**

| Concept                      | Import Path / Access Example                                                             |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| Domain Unit Tests            | `from tests.domain.order.test_order import TestOrderAggregate`                           |
| Repository Integration Tests | `from tests.infrastructure.persistence.test_order_repository import TestOrderRepository` |
| Service / Application Tests  | `from tests.application.services.test_order_service import TestOrderService`             |
| API / Endpoint Tests         | `from tests.api.rest.test_order_views import TestConfirmOrderView`                       |

---

### ✅ **Guidelines for This Structure**

1. **Short class names** — context comes from **folders** instead of suffixes (`Domain`, `ORM`, etc.).
2. **Namespaces / dotted paths** are predictable: `domain`, `infrastructure`, `application`, `api`.
3. **CQRS separation**: commands (write) vs queries (read) clearly divided.
4. **Aggregates / entities** live in their own subfolders to avoid collisions.
5. **Infrastructure adapters** only depend on domain interfaces.
6. **Factories & singletons** in `domain.shared` or `domain.<aggregate>/factories.py`.
7. **Tests mirror production structure** for discoverability.

---

This approach scales well for **dozens of domains** across multiple developers — you can always say:

```text
ecommerce.domain.<aggregate>.<entities/services/factories>
ecommerce.infrastructure.<orm/persistence/messaging>
ecommerce.application.<commands/queries/services>
ecommerce.api.<rest/graphql>
```

- **No need for names like `OrderDomainOfSomethingElse`**.
- **Everything is discoverable and consistent**.

---

## **1. What a Value Object (VO) Is**

In **DDD**, a **Value Object** is:

- **Immutable**: once created, its state cannot change.
- **Identified by its values**, not by an ID. Two VOs with the same values are considered equal.
- **Encapsulates logic/validation**: e.g., a `Money` VO might ensure the currency is valid, or `Email` VO might validate format.

Example:

```python
from dataclasses import dataclass

@dataclass(frozen=True)
class Money:
    amount: float
    currency: str

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("Amount cannot be negative")
```

Here, `Money` is a VO. Its identity is **the pair of values (`amount`, `currency`)**, not a unique ID.

---

## **2. GraphQL Scalars vs Value Objects**

- **GraphQL Scalar**: a primitive type like `String`, `Int`, `Float`, or a **custom scalar** like `DateTime`, `Email`.

  - Responsible for **serialization / deserialization** (load/dump).
  - Does not contain behavior beyond validation or parsing.

- **Value Object**: a **domain-level construct**, not necessarily tied to serialization.

  - May contain business rules, validation, or methods.
  - Could be backed by a scalar when exposed via GraphQL.

### Example Mapping

| Domain VO | GraphQL Scalar Equivalent                        |
| --------- | ------------------------------------------------ |
| `Money`   | Custom scalar `Money` with `amount` & `currency` |
| `Email`   | Custom scalar `Email`                            |
| `Address` | Object type (complex)                            |

**Key:** GraphQL **needs special load/dump** only if the VO is complex or not directly supported by a built-in scalar. But the VO itself is **more than just a scalar**; it may include logic that GraphQL doesn’t care about internally.

---

## **3. When VOs Need Special GraphQL Handling**

1. **Custom Scalar VO**: e.g., `Email`, `UUID`, `Money`.

   - You define **serialize/parseValue/parseLiteral** for GraphQL.

```python
import graphene

class EmailScalar(graphene.Scalar):
    @staticmethod
    def serialize(email):
        return str(email)

    @staticmethod
    def parse_value(value):
        return Email(value)

    @staticmethod
    def parse_literal(node):
        return Email(node.value)
```

2. **Complex VO / Object VO**: e.g., `Address`.

   - Map it to a GraphQL **ObjectType** rather than a scalar.
   - No single scalar, it has multiple fields.

---

### **4. Summary**

- **VO ≠ Scalar**, but a VO **may map to a GraphQL scalar or object**.
- VO encapsulates **domain logic**, validation, and immutability.
- GraphQL scalars are **serialization-focused**, for communication with clients.
- Special load/dump is only necessary if the VO is **not natively supported** by GraphQL or if you want to enforce its domain constraints.

---

💡 **Rule of Thumb:**

- If VO is simple (`Money` = `float + currency`) → custom scalar.
- If VO is composite (`Address` = multiple fields) → GraphQL object type.
- Always keep **domain logic in the VO**, GraphQL layer just **translates it to/from client data**.
