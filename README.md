# Jewellery E-commerce Backend

The REST API for a jewellery e-commerce system, built with Java, Spring Boot, Spring Data JPA and MySQL. The matching UI is in the [frontend repo](https://github.com/sibusisomakaula/jewellery-ecommerce-frontend).

## Tech stack

- Java
- Spring Boot (Maven)
- Spring Data JPA / Hibernate
- Spring Security
- MySQL

## Prerequisites

- JDK (the version set in `pom.xml`)
- [Maven](https://maven.apache.org/) (or use an IDE such as IntelliJ)
- MySQL running on `localhost:3306`

## Database setup

The app connects to a database called `jewellerydb`, which is created automatically if it doesn't exist. By default it uses:

- Username: `root`
- Password: `root`

If your MySQL credentials are different, edit `src/main/resources/application.properties`, or set the environment variables below (if your properties file is configured to read them):

```
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/sibusisomakaula/jewellery-ecommerce-backend.git
cd jewellery-ecommerce-backend

# 2. Run the application
mvn spring-boot:run
```

The API starts on `http://localhost:8080` by default.

## Notes

- Hibernate is set to `ddl-auto=update`, so tables are created and updated automatically.
- The `uploads/` folder (for uploaded images) and `data/` folder are not stored in Git. Create `uploads/` in the project root if the app needs it.
- SQL logging is switched on for development. Turn it off in `application.properties` for production.

## Project structure

```
src/main/java/za/co/jewellerysystem/
  config/        Application configuration
  controller/    REST controllers
  domain/        Entity classes
  factory/       Object factories
  repository/    Data access layer
  security/      Security configuration
  service/       Business logic
```
