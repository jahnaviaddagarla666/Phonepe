# PhonePe Wallet - Backend

Spring Boot REST API backend for the PhonePe digital wallet application.

## 🚀 Quick Start

### Prerequisites
- **Java 17+**
- **MySQL 8.0+**
- **Maven** (included with project via `mvnw`)

### Setup & Run

```bash
# 1. Create database
mysql -u root -p
CREATE DATABASE phonepay_wallet;

# 2. Update credentials in application.properties
# Edit: src/main/resources/application.properties
# Set: spring.datasource.username and spring.datasource.password

# 3. Build
./mvnw clean package

# 4. Run
java -jar target/phonepay-wallet-1.0.0.jar

# Backend runs on http://localhost:8080
```

**Windows users** use `mvnw.cmd` instead of `./mvnw`

## 📦 Project Structure

```
backend/
├── pom.xml                              # Maven dependencies
├── mvnw / mvnw.cmd                      # Maven wrapper
└── src/main/java/com/phonepe/
    ├── PhonePeWalletApplication.java   # Main Spring Boot app
    ├── config/
    │   ├── CorsConfig.java             # CORS configuration
    │   └── SwaggerConfig.java          # Swagger API docs
    ├── controller/
    │   ├── UserController.java         # Auth endpoints
    │   ├── WalletController.java       # Wallet endpoints
    │   └── TransactionController.java  # Transaction endpoints
    ├── service/
    │   ├── UserService.java            # User business logic
    │   ├── WalletService.java          # Wallet business logic
    │   └── TransactionService.java     # Transaction business logic
    ├── repository/
    │   ├── UserRepository.java         # User database access
    │   ├── WalletRepository.java       # Wallet database access
    │   └── TransactionRepository.java  # Transaction database access
    ├── entity/
    │   ├── User.java                   # User model
    │   ├── Wallet.java                 # Wallet model
    │   └── Transaction.java            # Transaction model
    └── dto/
        ├── UserRegistrationRequest.java
        ├── LoginRequest.java
        ├── AddMoneyRequest.java
        ├── SendMoneyRequest.java
        ├── TransactionResponse.java
        ├── WalletResponse.java
        └── ApiResponse.java
```

## 🔧 Configuration

### Database Setup

Create `phonepay_wallet` database:

```sql
CREATE DATABASE phonepay_wallet;
USE phonepay_wallet;
```

### Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Server
server.port=8080

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/phonepay_wallet
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Application
spring.application.name=PhonePe Wallet API
```

## 🌐 API Endpoints

### Authentication

**Register User**
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "phoneNumber": "9876543210",
  "upiId": "john.doe@bank",
  "pin": "123456"
}
```

**Login User**
```http
POST /api/auth/login
Content-Type: application/json

{
  "phoneNumber": "9876543210",
  "pin": "123456"
}
```

### Wallet Operations

**Get Balance**
```http
GET /api/wallet/balance/{upiId}
```

**Add Money**
```http
PUT /api/wallet/add-money
Content-Type: application/json

{
  "upiId": "john.doe@bank",
  "amount": 5000
}
```

**Send Money**
```http
POST /api/wallet/send-money
Content-Type: application/json

{
  "senderUpi": "john.doe@bank",
  "receiverUpi": "jane.smith@bank",
  "amount": 1000
}
```

### Transactions

**Get Transaction History**
```http
GET /api/transactions/history/{upiId}
```

## 📊 Database Schema

### User Table
- `id` - Primary key
- `phone_number` - Unique phone number
- `upi_id` - Unique UPI identifier
- `name` - User full name
- `pin` - Security pin (4-6 digits)
- `created_at` - Registration timestamp

### Wallet Table
- `id` - Primary key
- `user_id` - Foreign key to User
- `balance` - Current wallet balance
- `created_at` - Account creation time
- `updated_at` - Last update timestamp

### Transaction Table
- `id` - Primary key
- `sender_upi` - Sender's UPI ID
- `receiver_upi` - Receiver's UPI ID
- `amount` - Transaction amount
- `date` - Transaction timestamp
- `wallet_id` - Related wallet (foreign key)

## 🏗 Architecture

### Layered Architecture
```
Controller Layer (REST Endpoints)
    ↓
Service Layer (Business Logic)
    ↓
Repository Layer (Database Access)
    ↓
Database (MySQL)
```

### Key Components

**Controllers** - Handle HTTP requests and responses
- `UserController` - Authentication endpoints
- `WalletController` - Wallet operations
- `TransactionController` - Transaction queries

**Services** - Implement business logic
- `UserService` - User registration, login validation
- `WalletService` - Balance management, money operations
- `TransactionService` - Transaction recording and history

**Repositories** - Database CRUD operations
- Spring Data JPA automatically implements basic CRUD
- Custom query methods for specific operations

**Entities** - JPA models representing database tables
- Relationships: User ↔ Wallet, Wallet ↔ Transaction

## 🔒 Security Features

- PIN-based authentication (4-6 digits)
- CORS enabled for frontend on localhost:5173
- Data validation on all inputs
- Unique constraints on phone number and UPI ID
- Transaction logging for audit trail

## 🚀 Build & Run Commands

```bash
# Clean and build
./mvnw clean package

# Build without tests (faster)
./mvnw clean package -DskipTests

# Run directly from IDE
./mvnw spring-boot:run

# Run compiled JAR
java -jar target/phonepay-wallet-1.0.0.jar

# Run on different port
java -jar target/phonepay-wallet-1.0.0.jar --server.port=8081
```

## 📚 Dependencies

Core dependencies in pom.xml:

- **spring-boot-starter-web** - REST API support
- **spring-boot-starter-data-jpa** - ORM
- **spring-boot-starter-validation** - Input validation
- **mysql-connector-java** - MySQL driver
- **springdoc-openapi-starter-webmvc-ui** - Swagger UI (optional)

View all: Check `pom.xml` file

## 🧪 Testing

### Manual Testing with cURL

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phoneNumber":"1234567890","upiId":"test@bank","pin":"123456"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"1234567890","pin":"123456"}'

# Get Balance
curl http://localhost:8080/api/wallet/balance/test@bank

# Add Money
curl -X PUT http://localhost:8080/api/wallet/add-money \
  -H "Content-Type: application/json" \
  -d '{"upiId":"test@bank","amount":5000}'
```

### Using Postman
1. Import API endpoints from above examples
2. Set `Content-Type: application/json` header
3. Test each endpoint with sample data

## 🐛 Troubleshooting

**Backend won't start**
- Check Java version: `java -version` (should be 17+)
- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify port 8080 is not in use

**Database connection error**
- Ensure database exists: `CREATE DATABASE phonepay_wallet;`
- Check MySQL credentials are correct
- Verify MySQL service is running

**CORS errors**
- CORS is configured in `CorsConfig.java`
- Frontend must be on `http://localhost:5173`
- Check backend is accessible from frontend

**Build fails**
- Clear Maven cache: `rm -rf ~/.m2/repository` (Linux/Mac)
- Ensure all dependencies download: `./mvnw clean install`
- Check internet connection for Maven Central

## 📋 API Response Format

All responses follow standard JSON format:

**Success Response**
```json
{
  "success": true,
  "message": "Operation completed",
  "data": {
    // Response data here
  }
}
```

**Error Response**
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## 📝 Production Deployment

Before deploying to production:

1. **Security**
   - Change default credentials
   - Use secure PIN hashing (SHA-256/bcrypt)
   - Enable HTTPS
   - Restrict CORS to specific domains

2. **Database**
   - Use managed MySQL service
   - Enable backups
   - Set appropriate retention policies
   - Use read replicas for scaling

3. **Environment**
   - Use environment variables for sensitive config
   - Set `ddl-auto=validate` (don't auto-update)
   - Enable transaction logging
   - Set up monitoring and alerting

4. **Performance**
   - Enable connection pooling
   - Add database indexes
   - Cache frequently accessed data
   - Use CDN for static assets

## 🚀 Scaling Tips

- Use connection pooling (HikariCP)
- Implement pagination for large result sets
- Add logging and monitoring
- Use load balancer for multiple instances
- Consider microservices architecture

## 📄 License

Educational project - Open source

## 🤝 Support

For issues:
1. Check logs: `tail -f logs/application.log`
2. Enable SQL logging: Set `spring.jpa.show-sql=true`
3. Check database state: `SELECT * FROM user;`
4. Review error messages in console

For full project documentation, see the main [README.md](../README.md) in the root directory.
