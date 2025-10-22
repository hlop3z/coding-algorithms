# Hexagonal Architecture with CQRS

## **1. Conceptual Overview**

- **Hexagonal Architecture:** Focuses on **decoupling the core domain** from infrastructure (DB, UI, external APIs) via **ports** and **adapters**.
- **CQRS:** Focuses on **separating reads and writes**, optimizing each for its own purpose.

**Combining them:**

- The **core domain** (inside the hexagon) handles commands and queries as two separate flows.
- **Ports** define the interfaces for commands and queries.
- **Adapters** implement these ports for external systems like REST APIs, databases, messaging queues, etc.

---

## **2. Structural Approach**

```text
        +---------------------+
        |   UI / API Adapters |
        +---------------------+
                 |
        +---------------------+
        |   Application Ports |
        |  (Commands & Queries)
        +---------------------+
          /                  \
+----------------+      +----------------+
| Command Adapter|      | Query Adapter  |
+----------------+      +----------------+
          |                    |
    +-----------+          +-----------+
    | Command   |          | Query     |
    | Handlers  |          | Handlers  |
    +-----------+          +-----------+
          \                    /
           +------------------+
           |   Domain / Core  |
           +------------------+
           | Entities & Rules |
           +------------------+
```

- **Command side:** Handles state-changing operations (write operations).
- **Query side:** Handles read-only operations (optimized for fast retrieval).
- **Domain/Core:** Implements business logic independent of how commands/queries are invoked.

---

## **3. Benefits of Combining Hexagonal + CQRS**

1. **Clear separation of concerns:** Commands and queries are explicitly separated.
2. **Infrastructure independence:** Hexagonal ports/adapters make it easy to swap databases, messaging systems, or APIs.
3. **Scalability:** Query adapters can be optimized independently (read replicas, caching, projections).
4. **Testability:** Core domain can be tested without any infrastructure dependencies.

---

## **4. Implementation Tips**

- **Command Handlers:** Implement transactional operations (like placing an order).
- **Query Handlers:** Implement read-optimized operations (like fetching order history).
- **Adapters:** Could be REST endpoints, GraphQL resolvers, message brokers, or database repositories.
- **Events:** Often, the command side emits domain events that update read models asynchronously for the query side.

---

### **Example: E-commerce System**

- **Command:** `PlaceOrderCommand → OrderCommandHandler → Domain Entities → Persist via RepositoryAdapter`
- **Query:** `GetOrderDetailsQuery → OrderQueryHandler → Read Model Adapter → Return DTO`
- **Adapters:** REST API exposes commands and queries; database adapters handle persistence.
