# Typical Layered (Domain-Driven Design) Architecture

| Layer / Pattern                    | Primary Responsibility                                                | Inputs / Outputs                 | Typical Example Class         |
| ---------------------------------- | --------------------------------------------------------------------- | -------------------------------- | ----------------------------- |
| **Entity / Model**                 | Encapsulates core business data and invariants                        | Raw domain data                  | `User` with `id`, `email`     |
| **DTO (Data Transfer Object)**     | Simple struct for moving data across boundaries (e.g. API or UI)      | JSON, HTTP requests/responses    | `UserDto`                     |
| **Repository**                     | Abstracts persistence (CRUD) for Entities                             | Entities ↔ persistence (DB, API) | `UserRepository`              |
| **Service**                        | Encapsulates business logic / “use cases”                             | Entities or DTOs                 | `AuthService.login(userDto)`  |
| **Controller / Handler**           | Orchestrates request → service → response, handles I/O concerns       | HTTP request/response, CLI args  | `AuthController.post_login()` |
| **Factory**                        | Builds complex objects or aggregates with required invariants         | Constructor inputs               | `OrderFactory.createFromCart` |
| **Use-Case / Application Service** | Thin orchestration layer around Services to coordinate multiple steps | DTOs, events                     | `PlaceOrderUseCase`           |

---

**Summary:**

- **Entities/Models** hold your core business state and rules.
- **Repositories** deal strictly with loading/saving those entities.
- **Services** implement business operations (e.g. “register user,” “charge card”) by calling repositories and applying domain rules.
- **Controllers/Handlers** sit at the edges: they parse inputs (HTTP, CLI), invoke services/use-cases, and format outputs.
- **DTOs** shuttle data in/out without business logic.
- **Factories** and **Use-Cases** are optional helpers to keep creation logic or multi-step flows clean.

Together, these roles keep your code organized, testable, and aligned with SOLID/domain-driven design principles.
