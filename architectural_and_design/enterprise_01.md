# Enterprise 01

| Level                   | Common Patterns                                           | Notes                                                  |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------ |
| System / Architecture   | Hexagonal + CQRS + Event Sourcing, Microservices, Layered | Structure, scalability, separation of concerns         |
| Integration / Component | Adapter, Strategy, Observer                               | Integration with external systems and dynamic behavior |
| Object / Creation       | Singleton, Factory, Builder                               | Object management, resource control                    |
| Domain                  | DDD + CQRS + Event Sourcing                               | Complex business domains, auditability                 |

---

## **Key Observations in Enterprises**

1. **Architectural Patterns** like Hexagonal, Clean, CQRS, Microservices dominate the system-level design.
2. **Design Patterns** like Singleton, Factory, Adapter, Strategy, Observer are used **within components** to solve specific problems.
3. **Event-Driven Architectures** (via Event Sourcing or messaging) are extremely common for async operations.
4. **Hybrid Approaches** are the norm: systems rarely use just one pattern; combinations depend on scalability, domain complexity, and team structure.

---

## **1. Hexagonal + CQRS + Event Sourcing**

- **Why enterprises use it:**

  - Clear separation of concerns (Hexagonal)
  - Optimized read/write (CQRS)
  - Auditability, history tracking, and eventual consistency (Event Sourcing)

- **Common Use Case:** Financial systems, e-commerce platforms, booking systems.
- **Flow:**

  1. Command triggers a domain event.
  2. Event updates write models.
  3. Event propagates to update read models (CQRS).
  4. Hexagonal architecture ensures core domain remains decoupled from adapters.

---

## **2. Microservices + Hexagonal + CQRS**

- **Why enterprises use it:**

  - Microservices allow horizontal scaling and team independence.
  - Hexagonal architecture ensures each microservice is loosely coupled to infrastructure.
  - CQRS allows separate optimization of read/write workloads per service.

- **Common Use Case:** Large SaaS platforms, banking backends, logistics.

---

## **3. Layered (N-Tier) + Factory + Singleton**

- **Why enterprises use it:**

  - Layered architecture is simple, widely understood, and maps to enterprise roles.
  - Singleton ensures shared resources (like config, logging) are globally available.
  - Factory pattern abstracts object creation across layers.

- **Common Use Case:** Legacy enterprise systems, ERP modules, internal tools.

---

## **4. Hexagonal + Adapter + Strategy**

- **Why enterprises use it:**

  - Adapter allows integration with multiple external systems (payment gateways, legacy APIs).
  - Strategy pattern supports dynamic selection of algorithms or business rules.
  - Hexagonal keeps the domain isolated.

- **Common Use Case:** Payment platforms, recommendation engines, multi-vendor integrations.

---

## **5. CQRS + Event Sourcing + Domain-Driven Design (DDD)**

- **Why enterprises use it:**

  - DDD structures the core domain into **aggregates, entities, and value objects**.
  - CQRS separates read/write workloads.
  - Event Sourcing ensures history and replayability of state changes.

- **Common Use Case:** High-complexity domains like banking, insurance, telecommunications.

---

## **6. Microservices + API Gateway + Singleton + Factory**

- **Why enterprises use it:**

  - Microservices architecture requires an API Gateway to unify entry points.
  - Singleton manages shared resources like authentication or cache.
  - Factory abstracts service instantiation, especially for plugins or extensions.

- **Common Use Case:** Large-scale e-commerce, SaaS platforms with plugins.
