# Use Case Diagram

```mermaid
usecaseDiagram
    actor Admin
    actor User

    usecase "Register / Login" as UC1
    usecase "Create Flash Product" as UC2
    usecase "Update/Delete Product" as UC3
    usecase "Browse Active Flash Sales" as UC4
    usecase "View Product Details" as UC5
    usecase "Place Order" as UC6
    usecase "View Order History" as UC7

    Admin --> UC1
    Admin --> UC2
    Admin --> UC3

    User --> UC1
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7

    note right of UC6
        Includes:
        - Check time window
        - Check stock
        - Deduct stock atomically
    end note
