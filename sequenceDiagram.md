
### 3. sequenceDiagram.md

```markdown
# Sequence Diagram – Main Flow: Place Order (End-to-End)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API as Express API
    participant Service as OrderService
    participant DB as Prisma / MongoDB

    User->>Frontend: Click "Buy Now" on active product
    Frontend->>API: POST /api/orders { productId, quantity }
    API->>API: Validate JWT → extract userId

    API->>Service: placeOrder(userId, productId, quantity)

    activate Service
    Service->>DB: Fetch Product (with current stock & times)
    DB-->>Service: Product data

    alt Product not active OR time expired OR stock < quantity
        Service-->>API: Error: "Sale expired / Insufficient stock"
        API-->>Frontend: 400 Bad Request + message
        Frontend-->>User: Show error message
    else Valid
        Service->>DB: Begin Transaction
        Service->>DB: Lock & decrease stock (stock -= quantity)
        DB-->>Service: Updated
        Service->>DB: Create Order record
        DB-->>Service: Order created
        Service->>DB: Commit Transaction
        Service-->>API: Success + order details
        deactivate Service

        API-->>Frontend: 201 Created + order
        Frontend-->>User: Order success + confirmation
    end
