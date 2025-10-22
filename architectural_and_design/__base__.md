# **1. Enterprise-Scale DDD Folder Structure (Abstract)**

```text
<realm>/                       # e.g., ecommerce
├─ domain/                      # Pure domain logic (DDD)
│  ├─ __init__.py               # exposes aggregates/entities for import
│  ├─ <aggregate>/              # e.g., order, product
│  │  ├─ __init__.py            # exposes aggregates & VOs
│  │  ├─ entities.py            # Aggregate roots and entities
│  │  ├─ value_objects.py       # Immutable value objects
│  │  ├─ services.py            # Domain services (business logic)
│  │  └─ factories.py           # Factories for aggregates/entities
│  └─ shared/                   # Shared primitives & VOs
│     └─ primitives.py          # Money, Address, UUID, etc.

├─ infrastructure/              # Adapters / persistence / messaging
│  ├─ __init__.py
│  ├─ persistence/              # Repositories / DB adapters
│  │  ├─ <aggregate>_repository.py
│  └─ messaging/                # Event bus adapters
│     └─ event_bus.py
│  └─ external_services/        # Third-party system adapters
│     └─ payment_gateway.py

├─ application/                 # Use cases / application services
│  ├─ __init__.py
│  ├─ commands/                 # Command handlers (write-side, CQRS)
│  │  └─ <aggregate>_handlers.py
│  ├─ queries/                  # Query handlers / read models (read-side)
│  │  └─ <aggregate>_queries.py
│  └─ services.py               # Orchestration across aggregates

├─ api/                         # UI / REST / GraphQL adapters
│  ├─ rest/
│  │  └─ <aggregate>_views.py
│  └─ graphql/
│     └─ <aggregate>_schema.py

└─ tests/                       # Mirrors production structure
   ├─ domain/
   ├─ infrastructure/
   ├─ application/
   └─ api/
```

---

# **2. Dotted Path / Import Convention**

**Pattern:**

```
<realm>.<layer>.<aggregate>.<class_or_function>[.<optional_detail>]
```

**Examples:**

| Component                       | Dotted Path / Import Example                                                        |
| ------------------------------- | ----------------------------------------------------------------------------------- |
| Aggregate: Order                | `from ecommerce.domain.order.entities import Order`                                 |
| Value Object: Money             | `from ecommerce.domain.shared.primitives import Money`                              |
| Repository: OrderRepository     | `from ecommerce.infrastructure.persistence.order_repository import OrderRepository` |
| Command Handler: AddItemToOrder | `from ecommerce.application.commands.order_handlers import AddItemToOrderCommand`   |
| Query Handler: OrderSummary     | `from ecommerce.application.queries.order_queries import OrderSummaryReadModel`     |
| REST API View: confirm order    | `from ecommerce.api.rest.order_views import confirm_order_view`                     |
| GraphQL Schema: OrderType       | `from ecommerce.api.graphql.order_schema import OrderType`                          |

**Guidelines:**

- Keep **class names short**; folder structure conveys type/layer.
- CQRS separation: commands (write) vs queries (read) in their own folders.
- Infrastructure adapters are isolated from domain.

---

# **3. Value Objects (VOs) Abstract Concept**

- **Immutable** — cannot change after creation.
- **Identified by their values**, not IDs.
- **Encapsulate domain rules/validation**.

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

- VO **represents domain intent**, not persistence.
- Aggregates may contain VOs (e.g., `Order` has `Money` and `Address`).

---

# **4. VOs and GraphQL / Serialization Analogy**

| Domain VO                | How exposed in API / GraphQL              |
| ------------------------ | ----------------------------------------- |
| Simple VO (`Money`)      | Custom scalar (amount + currency)         |
| Composite VO (`Address`) | GraphQL object type (multiple fields)     |
| Email, UUID, DateTime    | Custom scalars with parse/serialize logic |

**Rule:**

- VO contains **domain logic**; GraphQL / serialization layer **just converts to/from client format**.
- Special load/dump only if VO isn’t directly representable as a primitive.

---

# **5. Key Enterprise Principles**

1. **Folders > class name suffixes**: context is from folder, not bloated class names.
2. **Predictable dotted paths**: `<realm>.<layer>.<aggregate>.<class_or_function>` → scalable across domains.
3. **CQRS separation**: write vs read handled explicitly in folders.
4. **Infrastructure adapters isolated**: domain layer remains pure.
5. **Factories & shared singletons** live in domain or shared folders.
6. **Tests mirror production**: makes it easy to locate and maintain.

---

# **6. Spoken-Aloud Example (Like Explaining to a Kid)**

- `ecommerce.domain.order.Order` → “In the e-commerce domain, the Order aggregate.”
- `ecommerce.application.order.AddItemToOrderCommand` → “Application layer, write command for Order.”
- `ecommerce.infrastructure.persistence.order_repository.OrderRepository` → “Repository to save/load Order aggregates.”
- `ecommerce.domain.shared.Money` → “Shared value object for money in the domain.”

---

**✅ Summary:**

- **Clean, consistent, scalable structure** without Django or any specific framework.
- **Value Objects remain pure domain constructs**, optionally mapped to GraphQL scalars/objects.
- **Dotted paths** are predictable and minimal — folders convey most context.
- Fully supports **DDD + CQRS + Hexagonal architecture** at enterprise scale.

## **E-Commerce Realm: Dotted-Path Map (Example)**

```
<realm> = ecommerce
```

---

### **1. Domain Layer (Core / Pure DDD)**

| Concept                        | Dotted Path / Import Example                     | Notes                         |
| ------------------------------ | ------------------------------------------------ | ----------------------------- |
| Aggregate: Order               | ecommerce.domain.order.Order                     | Root entity for order logic   |
| Aggregate: Product             | ecommerce.domain.product.Product                 | Root entity for product logic |
| Entity: OrderItem              | ecommerce.domain.order.OrderItem                 | Part of Order aggregate       |
| Entity: ProductVariant         | ecommerce.domain.product.ProductVariant          | Part of Product aggregate     |
| Value Object: Money            | ecommerce.domain.shared.Money                    | Shared immutable VO           |
| Value Object: Address          | ecommerce.domain.shared.Address                  | Shared immutable VO           |
| Domain Service: PricingService | ecommerce.domain.product.services.PricingService | Encapsulates business rules   |
| Factory: OrderFactory          | ecommerce.domain.order.factories.OrderFactory    | Creates Order aggregates      |

---

### **2. Infrastructure Layer (Adapters / Persistence / Messaging)**

| Concept                                  | Dotted Path / Import Example                                              | Notes                             |
| ---------------------------------------- | ------------------------------------------------------------------------- | --------------------------------- |
| Repository: OrderRepository              | ecommerce.infrastructure.persistence.order_repository.OrderRepository     | Maps Order domain ↔ persistence   |
| Repository: ProductRepository            | ecommerce.infrastructure.persistence.product_repository.ProductRepository | Maps Product domain ↔ persistence |
| ORM / Table: OrderORM                    | ecommerce.infrastructure.persistence.order_repository.OrderORM            | Optional, if using ORM internally |
| ORM / Table: ProductORM                  | ecommerce.infrastructure.persistence.product_repository.ProductORM        | Optional, if using ORM internally |
| Messaging Adapter: EventBus              | ecommerce.infrastructure.messaging.event_bus.EventBus                     | Event publishing/subscribing      |
| External Service Adapter: PaymentGateway | ecommerce.infrastructure.external_services.payment_gateway.PaymentGateway | Integrates with external systems  |

---

### **3. Application Layer (Use Cases / CQRS)**

#### **Command Side (Write)**

| Concept                           | Dotted Path / Import Example                                        | Notes                              |
| --------------------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| Command Handler: AddItemToOrder   | ecommerce.application.commands.order_handlers.AddItemToOrderCommand | Write-side operation               |
| Command Handler: ConfirmOrder     | ecommerce.application.commands.order_handlers.ConfirmOrderCommand   | Write-side operation               |
| Application Service: OrderService | ecommerce.application.services.OrderService                         | Orchestration, multiple aggregates |

#### **Query Side (Read / Projections)**

| Concept                              | Dotted Path / Import Example                                           | Notes                            |
| ------------------------------------ | ---------------------------------------------------------------------- | -------------------------------- |
| Query Handler: FetchOrdersByCustomer | ecommerce.application.queries.order_queries.FetchOrdersByCustomerQuery | Read-side operation              |
| Read Model: OrderSummaryReadModel    | ecommerce.application.queries.order_queries.OrderSummaryReadModel      | Projection for read optimization |
| Query Handler: ProductInventory      | ecommerce.application.queries.product_queries.ProductInventoryQuery    | Read-side operation              |

---

### **4. API / Adapter Layer (UI / REST / GraphQL)**

| Concept                      | Dotted Path / Import Example                      | Notes                             |
| ---------------------------- | ------------------------------------------------- | --------------------------------- |
| REST View: Add Item to Order | ecommerce.api.rest.order_views.add_item_view      | Exposes write operation           |
| REST View: Confirm Order     | ecommerce.api.rest.order_views.confirm_order_view | Exposes write operation           |
| REST View: List Orders       | ecommerce.api.rest.order_views.list_orders_view   | Exposes read operation            |
| GraphQL Schema: OrderType    | ecommerce.api.graphql.order_schema.OrderType      | Maps Order aggregate to GraphQL   |
| GraphQL Schema: ProductType  | ecommerce.api.graphql.product_schema.ProductType  | Maps Product aggregate to GraphQL |

---

### **5. Shared / Utilities**

| Concept            | Dotted Path / Import Example    | Notes                |
| ------------------ | ------------------------------- | -------------------- |
| Logger Singleton   | ecommerce.shared.logger.Logger  | Global logging       |
| Config Singleton   | ecommerce.shared.config.Config  | Configuration access |
| Cache Singleton    | ecommerce.shared.cache.Cache    | Caching services     |
| Common VO: Money   | ecommerce.domain.shared.Money   | Shared value object  |
| Common VO: Address | ecommerce.domain.shared.Address | Shared value object  |

---

### **6. Tests (Mirrors Production Structure)**

| Concept                      | Dotted Path / Import Example                                               | Notes                             |
| ---------------------------- | -------------------------------------------------------------------------- | --------------------------------- |
| Domain Unit Tests            | tests.domain.order.test_order.TestOrderAggregate                           | Unit testing aggregates and VOs   |
| Repository Integration Tests | tests.infrastructure.persistence.test_order_repository.TestOrderRepository | DB or adapter integration tests   |
| Application / Service Tests  | tests.application.services.test_order_service.TestOrderService             | Command/query orchestration tests |
| API / Endpoint Tests         | tests.api.rest.test_order_views.TestConfirmOrderView                       | Endpoint testing (REST/GraphQL)   |

---

### **7. Principles Behind This Structure**

1. **Predictable dotted paths**: `<realm>.<layer>.<aggregate>.<class_or_function>`.
2. **Folders convey type**: no need to bloat class names with `Domain`, `ORM`, etc.
3. **CQRS separation**: commands vs queries are clearly organized.
4. **Adapters isolated**: domain remains pure.
5. **Factories & singletons** placed logically: `domain` for factories, `shared` for singletons.
6. **Tests mirror production** for easy discoverability.
7. **Scalable**: add new aggregates by creating new folders under domain, infra, application, and api.

---

#### ✅ **Spoken-Aloud Examples**

- `ecommerce.domain.order.Order` → “Domain layer, Order aggregate.”
- `ecommerce.application.order.AddItemToOrderCommand` → “Application layer, command handler for Order.”
- `ecommerce.infrastructure.persistence.order_repository.OrderRepository` → “Repository to persist/load Order aggregates.”
- `ecommerce.api.graphql.order_schema.OrderType` → “GraphQL type for Order aggregate.”
- `ecommerce.domain.shared.Money` → “Shared value object for Money in the domain.”

---

This **blueprint works for dozens of aggregates and multiple developers**, keeps imports **clean and discoverable**, and fully supports **DDD + CQRS + Hexagonal architecture** at **enterprise scale**.
