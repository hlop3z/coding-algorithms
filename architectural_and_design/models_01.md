# Models 01

💡 **Key takeaway:**

- **Domain is pure** (`OrderDomain`) → DDD entities, value objects, aggregates.
- **Infrastructure is pluggable** (`OrderRepository`, Django ORM, external APIs) → Hexagonal adapters.
- **Service layer orchestrates commands** → CQRS write side.
- **Read models / projections** → CQRS read side.
- Factories and singletons support creation and shared resources, without polluting domain logic.

---

## **Mapping Django + Dataclass Hybrid Example to Patterns**

| Component / Example                  | Pattern / Role                            | Layer in Architecture                |
| ------------------------------------ | ----------------------------------------- | ------------------------------------ |
| `OrderDomain`, `OrderItemDomain`     | **DDD Entities/Aggregates/Value Objects** | Domain Layer (Core)                  |
| `OrderService`                       | **Hexagonal / Application Service**       | Application Layer / Command Handlers |
| `OrderRepository` (Django ORM)       | **Adapter / Hexagonal**                   | Infrastructure Layer / DB Adapter    |
| `Order` (Django ORM model)           | **Adapter / Persistence Model**           | Infrastructure Layer                 |
| `OrderItem` (Django ORM model)       | **Adapter / Persistence Model**           | Infrastructure Layer                 |
| `InMemoryOrderRepository`            | **Adapter / Test Double / Hexagonal**     | Infrastructure Layer (for testing)   |
| `add_item_to_order`, `confirm_order` | **Command Handlers (CQRS Write Side)**    | Application Layer / Ports            |
| `views.py` / API endpoints           | **Adapter / Hexagonal / API Port**        | API/UI Layer                         |
| CQRS Read Models (if implemented)    | **CQRS Read Side / Projection**           | Infrastructure Layer / Read Model    |
| `Factories` (if implemented)         | **Factory Pattern**                       | Domain Layer / Application Layer     |
| `Singletons` (logger, config, cache) | **Singleton Pattern**                     | Core / Shared Services               |

---

## **How It Fits in Enterprise Architecture Diagram**

```text
           +----------------------------+
           |        API / UI Layer      |   <-- Hexagonal Adapters
           |  (Django Views / REST API)|
           +----------------------------+
                      |
         +------------------------------+
         |      Application Layer       |  <-- Ports / CQRS
         |  (OrderService, Command/Query)|
         +------------------------------+
           /                        \
+---------------------+       +---------------------+
|  Command Handlers   |       |   Query Handlers    |  <-- CQRS separation
| (add_item, confirm) |       | (read projections) |
+---------------------+       +---------------------+
          |                          |
          v                          v
+-------------------------+    +-------------------------+
| Domain Layer (Core)     |    | Read Models / Projections|
| - OrderDomain           |    | (Optional: OrderSummary) |
| - OrderItemDomain       |    +-------------------------+
| - Domain Services       |
+-------------------------+
          ^
          |
   +-------------------+
   |  Factories        |  <-- Factory pattern for aggregates
   +-------------------+
          ^
          |
   +-------------------+
   | Singletons / Core  |  <-- Logger, Config, Cache
   +-------------------+
          |
   +--------------------------+
   | Infrastructure Layer     |  <-- Hexagonal Adapters
   | - OrderRepository (ORM)  |
   | - Django Models (Order)  |
   | - Messaging / Event Bus  |
   | - External Services      |
   +--------------------------+
```

---

### **Explanation**

1. **Domain Layer (Core / DDD)**

   - Contains `OrderDomain` and `OrderItemDomain`.
   - Implements business logic, invariants, and aggregates.

2. **Application Layer / Command Handlers**

   - `OrderService` orchestrates domain operations.
   - Implements CQRS **write side** (`add_item_to_order`, `confirm_order`).

3. **Read Models / Projections (CQRS)**

   - Optional, denormalized views for fast queries.
   - Can be Django ORM models or pure dataclasses.

4. **Factories**

   - Optional helper to create aggregates consistently (`OrderDomain` with initial items).

5. **Singletons / Core Services**

   - Shared config, logging, or caching services.

6. **Infrastructure / Adapters**

   - `OrderRepository` translates between domain and ORM.
   - Django models (`Order`, `OrderItem`) persist data.
   - External systems (messaging, APIs) are integrated via adapters.

7. **API / UI Layer**

   - Django views or GraphQL endpoints.
   - Converts external requests into application commands or queries.
