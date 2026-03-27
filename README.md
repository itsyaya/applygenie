# ApplyGenie AI Backend

![Java](https://img.shields.io/badge/Java-17+-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2.4-brightgreen?style=for-the-badge&logo=spring)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Security-black?style=for-the-badge&logo=json-web-tokens)

ApplyGenie AI Backend is a production-level, scalable backend system for an AI-powered job application assistant. Built with Java 17 and Spring Boot, it provides secure authentication, resume and job description management, and lays the groundwork for seamless AI integrations to generate tailored career content.

## ✨ Features

- **Secure Authentication & Authorization**: Stateless JWT (JSON Web Token) authentication paired with Spring Security.
- **User Management**: Secure user registration, login, and profile management.
- **RESTful API Architecture**: Clean and scalable controller-service-repository pattern.
- **Data Persistence**: Spring Data JPA with MySQL for robust, relational data storage.
- **Robust Error Handling**: Global exception handling providing standardized API error responses.
- **Data Validation**: Strict input validation using Spring Boot Starter Validation.

## 🛠️ Technology Stack

- **Core**: Java 17, Spring Boot 3.2.4
- **Web**: Spring Web (REST APIs)
- **Database**: MySQL, Spring Data JPA, Hibernate
- **Security**: Spring Security, JJWT (io.jsonwebtoken)
- **Utilities**: Lombok for boilerplate reduction
- **Build Tool**: Maven

## 📂 Project Structure

The application follows a clean layered architecture principles to ensure separation of concerns and maintainability:

```text
src/main/java/com/applygenie
├── config/       # Spring and Application configuration classes
├── controller/   # REST API Entrypoints (e.g., AuthController)
├── dto/          # Data Transfer Objects (e.g., LoginRequest, RegisterRequest)
├── entity/       # JPA Database Entities representing tables
├── exception/    # Custom exceptions and GlobalExceptionHandler
├── model/        # Core business models
├── repository/   # Spring Data JPA interfaces for database access
├── security/     # JWT filters, entry points, and Spring Security config
└── service/      # Business logic and transaction management
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- [Java Development Kit (JDK) 17+](https://adoptium.net/)
- [Apache Maven](https://maven.apache.org/) (or use the included Maven wrapper)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/) (v8.0+)
- Your favorite IDE (IntelliJ IDEA, Eclipse, VS Code)

### 1. Database Setup

Create a new MySQL database for the application:

```sql
CREATE DATABASE applygenie_db;
```

### 2. Configure application properties

Navigate to `src/main/resources/application.properties` (or `application.yml`) and configure your database and JWT credentials:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/applygenie_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update

# JWT Configuration
app.jwt.secret=YOUR_SUPER_SECRET_KEY_MAKE_SURE_IT_IS_LONG_ENOUGH
app.jwt.expiration-ms=86400000
```
*(Note: Never commit your actual secrets to Git. Use environment variables in a production environment).*

### 3. Build & Run the Application

You can use the Maven wrapper to build and run the application from the root directory:

```bash
# Compile and build the project (skipping tests for initial run, optional)
./mvnw clean install -DskipTests

# Run the Spring Boot application
./mvnw spring-boot:run
```

The server will start, usually on `http://localhost:8080`.

## 🧪 Testing

The project is equipped with `spring-boot-starter-test` and `spring-security-test`. You can run the test suite using:

```bash
./mvnw test
```

## 📈 Future Roadmap

- Integration with LLM APIs (OpenAI / Anthropic) for generating cover letters and tailoring resumes.
- User file upload for CVs/Resumes handling (AWS S3 or local storage).
- Dockerization for containerized deployment.
- CI/CD pipeline setup (GitHub Actions).
- API Documentation via Swagger/OpenAPI.

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution of this software is strictly prohibited.
