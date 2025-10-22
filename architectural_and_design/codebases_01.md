# CodeBase

✅ **Takeaways for professional, extensible DDD in large corporates**

- **Use folder hierarchy for context separation** instead of long class names.
- **Keep domain pure** in `domain` namespace.
- **Infrastructure adapters live separately**.
- **Command/query handlers organized per aggregate**.
- **Factories and shared primitives support consistency**.
- Names stay simple: `Order`, `Product`, `OrderRepository` — context comes from **folders**.

---

## **1. Conceptual Organization: Realms, Domains, Aggregates**

- **Realm / Bounded Context**: Large business area, e.g., `ecommerce`, `payments`, `inventory`.
- **Domain**: Represents a conceptual part of the realm, e.g., `Order`, `Product`, `Cart`.
- **Aggregate**: One or more entities/value objects forming a transactional boundary.

Big corporates usually adopt **nested modularity**, e.g.:

```text
ecommerce/
├─ domain/
│  ├─ order/
│  │  ├─ entities.py         # OrderAggregate, OrderItem
│  │  ├─ value_objects.py    # Address, Money
│  │  ├─ services.py         # Domain-specific business logic
│  │  └─ factories.py        # Factory for creating aggregates
│  ├─ product/
│  │  ├─ entities.py
│  │  └─ value_objects.py
│  └─ shared/                # cross-domain primitives, e.g., Money, Currency
├─ infrastructure/
│  ├─ orm/
│  │  ├─ order.py            # Django models or SQLAlchemy tables
│  │  └─ product.py
│  ├─ messaging/             # Kafka, RabbitMQ integration
│  └─ persistence/           # Repositories mapping domain ↔ ORM
├─ application/
│  ├─ commands/
│  │  ├─ order_handlers.py
│  │  └─ product_handlers.py
│  ├─ queries/
│  │  ├─ order_queries.py
│  │  └─ product_queries.py
│  └─ services.py
└─ api/
   ├─ rest/
   └─ graphql/
```

✅ This approach is **hierarchical, predictable, and scalable**.

- `ecommerce.domain.order.Order` → pure domain aggregate
- `ecommerce.infrastructure.orm.order.Order` → ORM model / table
- `ecommerce.application.commands.order_handlers` → command handlers

This allows **consistent dotted paths** without bloating names with “Domain” or “Table” everywhere.

---

## **2. Naming Conventions**

- **Domain aggregates/entities**: short, clean names (`Order`, `Product`). Namespace via folders.
- **Persistence models / ORM tables**: same name in `infrastructure.orm` namespace.
- **Repositories**: `OrderRepository`, `ProductRepository` in `infrastructure.persistence`.
- **Commands / Queries**: verbs or intent (`ConfirmOrderCommand`, `AddItemToOrderCommand`) in `application.commands`.
- **Read models / projections**: suffix `ReadModel` or `View` (`OrderSummaryReadModel`) in `application.queries`.

**Key principle:** Avoid names like `OrderDomainOfSomethingElse` — instead, use **folder hierarchy** to separate context.

---

## **3. Folder Hierarchy Example**

```text
ecommerce/
├─ domain/
│  ├─ order/
│  │  ├─ __init__.py       # exposes Order aggregate
│  │  ├─ entities.py       # Order, OrderItem
│  │  ├─ value_objects.py  # Address, Money
│  │  ├─ services.py       # Domain logic
│  │  └─ factories.py      # Aggregate factories
│  └─ product/
│     └─ ...
├─ infrastructure/
│  ├─ orm/
│  │  ├─ order.py          # Django/SQLAlchemy tables
│  │  └─ product.py
│  └─ persistence/
│     ├─ order_repository.py
│     └─ product_repository.py
├─ application/
│  ├─ commands/
│  │  └─ order_handlers.py
│  ├─ queries/
│  │  └─ order_queries.py
│  └─ services.py
└─ api/
   ├─ rest/
   │  └─ order_views.py
   └─ graphql/
```

- Access domain: `from ecommerce.domain.order.entities import Order, OrderItem`
- Access ORM model: `from ecommerce.infrastructure.orm.order import Order as OrderORM`

This way **names remain short**, and you rely on **folders/namespaces** instead of inflating class names.

---

## **4. Principles for Large-Scale DDD**

1. **Folder first, names short**

   - Use Python package hierarchy to disambiguate instead of `OrderDomainOfEcommerce`

2. **One aggregate per file if it grows large**

   - `order/entities.py` can hold `Order` + `OrderItem`.

3. **Separate commands/queries**

   - CQRS ensures write vs read logic is clear and testable.

4. **Factories for complex aggregates**

   - Instead of bloating constructors, factories encapsulate creation rules.

5. **Shared domain primitives**

   - Money, Address, UUIDs, etc., live in `domain.shared`.

6. **Infrastructure adapters isolated**

   - ORM, messaging, APIs only in `infrastructure`, so domain stays agnostic.

---

## **5. Ergonomic Access Example**

```python
# Domain
from ecommerce.domain.order.entities import Order, OrderItem

# Persistence (ORM)
from ecommerce.infrastructure.orm.order import Order as OrderORM

# Repository
from ecommerce.infrastructure.persistence.order_repository import OrderRepository

# Commands / Handlers
from ecommerce.application.commands.order_handlers import ConfirmOrderCommand
```

- Clean, predictable, scalable.
- No naming collisions.
- Works well in **monorepos with dozens of domains**.
