# Changelog

## [Unreleased]

### Fixed (commit 2)

- Fixed an issue where the user was able to see contracts that did not belong to them. The code has been modified to ensure that the user can only view their own contracts.


### Refactoring (commit 1)

- Added tests to cover all the code.
- Refactored the code to decouple it and use dependency injection. This change was made in order to make the code easier to test and maintain in the future, without changing the logic of the code.

[comment]: <> (I could have further improved the structure of the code by adding additional layers such as a domain layer and presentation layer. However, given the time constraints, I focused on adding tests and refactoring the code to use dependency injection, which will make it easier to maintain and modify in the future without changing the core logic.)
