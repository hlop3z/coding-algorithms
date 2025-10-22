# Architectural And Design

- **Hexagonal / Clean / CQRS → architectural patterns** (structuring your system)
- **Singleton / Factory / Adapter → design patterns** (solving object-level problems)

## **Comparison Table**

| Pattern/Architecture | Type                | Purpose                                 | Key Feature                         | Use Case                              |
| -------------------- | ------------------- | --------------------------------------- | ----------------------------------- | ------------------------------------- |
| Hexagonal            | Architecture        | Decouple core logic from infrastructure | Ports & adapters                    | Testable, flexible systems            |
| Clean                | Architecture        | Layered separation, maintainable code   | Dependency rule                     | Long-term maintainable apps           |
| CQRS                 | Architecture/Design | Separate reads/writes                   | Command vs Query separation         | High-performance apps, event sourcing |
| Singleton            | Design              | Single instance                         | Global access                       | Logging, config managers              |
| Factory              | Design              | Abstract object creation                | Interface-based creation            | Polymorphic object creation           |
| Adapter              | Design              | Interface compatibility                 | Wrapper for incompatible interfaces | Legacy or third-party integration     |

## **1. Hexagonal Architecture (Ports & Adapters)**

- **Type:** Architectural pattern
- **Goal:** Make the core application independent of frameworks, UI, database, or external services.
- **Key Idea:** The application core communicates through **ports**, and external systems implement **adapters**. This decouples the business logic from infrastructure.
- **Structure:**

  - **Domain/Core:** Business logic
  - **Ports:** Interfaces to interact with the core
  - **Adapters:** Implementations of the ports for databases, web frameworks, external APIs

- **Use Case:** Systems requiring high testability and flexibility in swapping infrastructure.

**Example:**
A payment processing system with a core domain logic. Payment gateways (Stripe, PayPal) are adapters.

---

## **2. Clean Architecture (Uncle Bob)**

- **Type:** Architectural pattern
- **Goal:** Maintain independence of business rules, frameworks, and UI for long-term maintainability.
- **Key Idea:** Layers that enforce **dependency rule**: source code dependencies can only point inward.
- **Structure:**

  1. **Entities:** Business rules
  2. **Use Cases / Interactors:** Application-specific business rules
  3. **Interface Adapters:** Convert data for UI or DB
  4. **Frameworks & Drivers:** External frameworks, UI, DB

- **Relationship to Hexagonal Architecture:** Hexagonal can be considered a specific way to implement Clean Architecture. Both emphasize decoupling and testability.

---

## **3. CQRS (Command Query Responsibility Segregation)**

- **Type:** Architectural pattern / design approach
- **Goal:** Separate read and write operations to optimize performance, scalability, and maintainability.
- **Key Idea:**

  - **Command Side:** Handles state changes (writes)
  - **Query Side:** Handles reads (can use optimized schemas)

- **Use Case:** High-performance applications, event sourcing, systems with different read/write workloads.

**Example:**
An e-commerce system:

- Commands: PlaceOrder, CancelOrder
- Queries: GetOrderHistory, GetProductAvailability

---

## **4. Singleton**

- **Type:** Creational design pattern
- **Goal:** Ensure a class has only one instance and provide a global access point.
- **Key Idea:** Centralized, single object used across the system.
- **Use Case:** Configuration manager, logging, caching
- **Caution:** Can introduce global state and tight coupling if overused.

---

## **5. Factory**

- **Type:** Creational design pattern
- **Goal:** Abstract the creation of objects so that the client does not need to know exact classes.
- **Key Idea:** Provide an interface to create objects but let subclasses decide which concrete class to instantiate.
- **Variants:** Factory Method, Abstract Factory
- **Use Case:** Decoupling object creation from business logic, supporting polymorphic object creation.

---

## **6. Adapter**

- **Type:** Structural design pattern
- **Goal:** Allow incompatible interfaces to work together.
- **Key Idea:** Wrap an existing class with a new interface so it can interact with other components.
- **Use Case:** Legacy system integration, third-party API integration

**Example:**
Wrapping a legacy payment API to match a new `PaymentGateway` interface.
