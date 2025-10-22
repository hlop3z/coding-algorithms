# Enterprise 02

## How Patterns Work Together

| Pattern   | Role in Architecture                                    |
| --------- | ------------------------------------------------------- |
| Hexagonal | Decouples domain from infrastructure via ports/adapters |
| CQRS      | Separates read and write operations for scalability     |
| DDD       | Structures domain: entities, aggregates, value objects  |
| Singleton | Provides shared global services (config, logger, cache) |
| Factory   | Creates domain objects/aggregates consistently          |
| Adapter   | Integrates external systems (DB, messaging, APIs)       |

---

✅ **Key Takeaways for Enterprises**

- **Separation of concerns** is strict: domain is independent, infrastructure is swappable.
- **CQRS** allows scaling reads and writes independently.
- **Event-driven architecture** can sit atop this design to propagate domain events to read models or other services.
- **Factories and Singletons** solve practical instantiation and shared resource challenges.

---

## **Enterprise Architecture Diagram (Textual/Conceptual)**

```text
           +----------------------------+
           |        API / UI Layer      |   <-- Adapters
           |  (REST, GraphQL, Web, etc)|
           +----------------------------+
                      |
         +------------------------------+
         |      Application Layer       |  <-- Ports / Adapters (Hexagonal)
         |  Command & Query Interfaces  |  <-- CQRS separation
         +------------------------------+
           /                        \
+---------------------+       +---------------------+
|  Command Handlers   |       |   Query Handlers    |  <-- CQRS
|  (write operations) |       |   (read operations)|
+---------------------+       +---------------------+
          |                          |
          v                          v
+-------------------------+    +-------------------------+
| Domain Layer (Core)     |    | Read Models / Projections|
| - Entities              |    | (Optimized for queries) |
| - Aggregates            |    +-------------------------+
| - Value Objects         |
| - Domain Services       |
+-------------------------+
          ^
          |
   +-------------------+
   |  Factories        |  <-- Factory pattern for creating aggregates/entities
   +-------------------+
          ^
          |
   +-------------------+
   | Singletons / Core  |  <-- Shared resources (Config, Logger, Cache)
   +-------------------+
          |
   +--------------------------+
   | Infrastructure Layer     |  <-- Hexagonal Adapters
   | - DB Repositories        |
   | - Messaging / Event Bus  |
   | - External Services      |
   +--------------------------+
```

---

### **Explanation**

1. **API/UI Layer (Adapters)**

   - Converts external requests (HTTP, gRPC, GraphQL) into application commands or queries.

2. **Application Layer (Ports / CQRS)**

   - Defines **ports** (interfaces) for commands (write) and queries (read).
   - Ensures the core domain remains decoupled from the outside.

3. **Command/Query Handlers**

   - **Command Handlers**: Mutate state via domain aggregates.
   - **Query Handlers**: Fetch read-optimized data from projections or read models.

4. **Domain Layer (Core / Hexagonal + DDD)**

   - Implements business logic using **Entities**, **Aggregates**, and **Value Objects**.
   - Core domain has **no direct dependency** on infrastructure.

5. **Factories**

   - Encapsulate creation of complex domain objects or aggregates.

6. **Singletons**

   - Provide globally shared services (configuration, logging, caching).

7. **Infrastructure Layer (Adapters / Hexagonal)**

   - Implements persistence, messaging, and third-party integrations.
   - Each adapter plugs into the domain via **ports**.
