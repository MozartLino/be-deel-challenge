# DEEL BACKEND TASK

As I did not have enough time to complete the task, I would like to share my thoughts on what I would have done if I had more time:

- I would have completed all of the proposed tasks.
- I would have created domain-specific errors, such as InsufficientBalanceError and JobNotFoundError, to handle exceptional cases in a more meaningful way.
- I would have tried to work with domain objects to model the business concepts and rules more accurately.
- I would have tried to decouple the business logic as much as possible from external libraries, such as sequelize, to make the code more maintainable and scalable.
- I would have created a presentation layer to separate the controller and the object mapping for the frontend from the rest of the application.
- I would have created a service layer to encapsulate business rules and provide a more clear separation of concerns.
- I would have created a domain layer to store domain objects, which would contain logic such as profile.isContractor() or profile.hasSufficientBalance(amount), to represent the business concepts and rules more clearly.

  
1. ***GET*** `/contracts/:id` DONE

2. ***GET*** `/contracts` DONE

3. ***GET*** `/jobs/unpaid` DONE

4. ***POST*** `/jobs/:job_id/pay` DONE

5. ***POST*** `/balances/deposit/:userId` UNRESOLVED

6. ***GET*** `/admin/best-profession?start=<date>&end=<date>` UNRESOLVED

7. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` UNRESOLVED
