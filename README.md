# PhonePe Wallet - Digital Payment Application

A modern, full-stack digital wallet and payment application built with Spring Boot backend and React frontend.

## 🚀 Features

- **User Authentication**: Secure login and registration with PIN-based security
- **Digital Wallet**: Check balance, add money, and send money to other UPI IDs
- **Transaction History**: Track all your transactions with detailed information
- **Modern UI**: Beautiful dark-themed interface with glassmorphism effects and smooth animations
- **Real-time Updates**: Instant balance updates and transaction confirmations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17+** - For running the Spring Boot backend
- **Node.js 16+** - For running the React frontend
- **Maven** - For building the Java backend (included with project)
- **MySQL 8.0+** - For database (must be running)
- **Git** - For version control

## 🛠 Project Structure

```
PhonePe/
├── backend/          # Spring Boot REST API
│   ├── pom.xml
│   ├── mvnw
│   └── src/
├── frontend/         # React + Vite application
│   ├── package.json
│   ├── vite.config.js
│   └── src/
└── README.md
```

## 📦 Installation & Setup

### 1. Navigate to Project

```bash
# Navigate to the project root directory
cd path/to/PhonePe
```

### 2. Backend Setup (Spring Boot)

#### Step 1: Database Configuration

Make sure MySQL is running on your system:

```bash
# Windows (if MySQL is installed as service, it auto-starts)
# Linux/Mac
sudo systemctl start mysql

# Connect to MySQL
mysql -u root -p
```

Then create the database:

```sql
CREATE DATABASE phonepay_wallet;
```

#### Step 2: Configure Database Connection

Edit `backend/src/main/resources/application.properties` and update the database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/phonepay_wallet
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

#### Step 3: Build and Run Backend

```bash
# Navigate to backend directory
cd backend

# Build the project (creates JAR file)
./mvnw clean package

# Run the backend server
java -jar target/phonepay-wallet-1.0.0.jar

# The backend will start on http://localhost:8080
```

**Windows users** can use `mvnw.cmd` instead of `./mvnw`:

```bash
mvnw.cmd clean package
java -jar target/phonepay-wallet-1.0.0.jar
```

### 3. Frontend Setup (React + Vite)

#### Step 1: Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install npm packages
npm install
```

#### Step 2: Configure API Endpoint (Optional)

The frontend is already configured to use `http://localhost:8080/api`. If you need to change this, edit `frontend/src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Modify if needed
});
```

#### Step 3: Run Frontend Development Server

```bash
# Start the development server
npm run dev

# The frontend will start on http://localhost:5173
# Open your browser and navigate to http://localhost:5173
```

## 🎯 Running the Complete Application

### Option 1: Using Two Terminal Windows (Recommended)

**Terminal 1 - Backend:**

```bash
cd backend
java -jar target/phonepay-wallet-1.0.0.jar
# Output: Started PhonePeWalletApplication in X.XXX seconds
# ✅ Backend running on http://localhost:8080
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
# Output: ➜  Local:   http://localhost:5173/
# ✅ Frontend running on http://localhost:5173
```

Then open your browser to: **http://localhost:5173**

### Option 2: Windows PowerShell (Single Terminal)

```powershell
# Start backend in background
Start-Process -NoNewWindow -FilePath "java" -ArgumentList '-jar target/phonepay-wallet-1.0.0.jar' -WorkingDirectory "backend"

# Wait for backend to start (2-3 seconds)
Start-Sleep -Seconds 3

# Start frontend
cd frontend
npm run dev
```

### Option 3: Linux/Mac (Single Terminal with & )

```bash
# Start backend in background
cd backend && java -jar target/phonepay-wallet-1.0.0.jar &

# Wait for backend to start
sleep 3

# Start frontend
cd ../frontend && npm run dev
```

## 🧪 Testing the Application

### Default Test Credentials

The application comes with pre-configured test data. Use these credentials to log in:

- **Phone Number**: `9876543210`
- **PIN**: `123456`

### Test Workflow

1. **Login Page**
   - Enter phone: `9876543210`
   - Enter PIN: `123456`
   - Click "Sign in"

2. **Dashboard - Overview Tab**
   - View your wallet balance
   - Add money to wallet
   - Send money to another UPI ID

3. **Dashboard - Transactions Tab**
   - View complete transaction history
   - See sender/receiver details
   - Track amount and timestamps

4. **Logout**
   - Click logout button in header
   - Redirected to login page

5. **Create New Account**
   - Click "Sign up here" on login page
   - Fill in complete details
   - Set 4-6 digit PIN
   - Account created successfully

## 🔧 Build for Production

### Build Frontend

```bash
cd frontend

# Create optimized production build
npm run build

# Output directory: frontend/dist/
# Ready to deploy to any static hosting
```

### Build Backend

```bash
cd backend

# Build without running tests (faster)
./mvnw clean package -DskipTests

# Output: backend/target/phonepay-wallet-1.0.0.jar
# Ready to run on production server
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user account
- `POST /api/auth/login` - Login with credentials

### Wallet Management
- `GET /api/wallet/balance/{upiId}` - Get current balance
- `PUT /api/wallet/add-money` - Add money to wallet
- `POST /api/wallet/send-money` - Send money to another user

### Transactions
- `GET /api/transactions/history/{upiId}` - Get transaction history

## 📱 Technology Stack

### Backend
- **Spring Boot 3.2.0** - REST API framework
- **Spring Data JPA** - Database ORM
- **Spring Security** - Authentication & Authorization
- **MySQL 8.0** - Relational database
- **Java 17** - Programming language
- **Maven** - Build management

### Frontend
- **React 19.2.0** - UI library
- **Vite 5.0** - Fast build tool
- **React Router 7.13.0** - Client-side routing
- **Framer Motion 12.33.0** - Animation library
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Axios 1.13.4** - HTTP client library

## 🎨 UI/UX Features

- ✨ Dark theme with glassmorphism design
- 🎬 Smooth animations and transitions
- 📱 Fully responsive layout
- 🎯 Emoji icons for visual appeal
- 🌈 Gradient text and buttons
- 📊 Tab-based dashboard navigation
- ✅ Real-time form validation
- 🔔 Toast notifications
- 🎪 Loading spinners
- 💳 Professional card layouts

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `Port 8080 already in use`
```bash
# Windows - Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

**Problem**: `MySQL connection error`
- Ensure MySQL service is running
- Verify credentials in `application.properties`
- Check database exists: `CREATE DATABASE phonepay_wallet;`

**Problem**: `Build fails with Java version error`
```bash
# Check Java version
java -version

# Should output Java 17 or higher
# Install Java 17 if needed
```

### Frontend Issues

**Problem**: `CORS errors in browser console`
- Backend CORS is pre-configured, ensure backend is running
- Check backend is on `http://localhost:8080`

**Problem**: `Cannot connect to backend`
- Verify backend is running on port 8080
- Check network/firewall settings
- Ensure no proxy issues in your environment

**Problem**: `npm install fails`
```bash
# Clear npm cache
npm cache clean --force

# Retry install
npm install
```

**Problem**: `Port 5173 already in use`
```bash
# Frontend will auto-increment to 5174, 5175, etc.
# Or kill the process and restart
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Common Solutions

| Issue | Solution |
|-------|----------|
| `localhost:5173 blank page` | Check browser console for errors, restart frontend server |
| `Login button not working` | Ensure backend is running, check network tab in DevTools |
| `Balance not loading` | Clear browser cache, hard refresh (Ctrl+Shift+R) |
| `Transactions not showing` | Create a test transaction first, then check history tab |

## 📝 Development Notes

- Backend uses Hibernate auto-schema update
- Frontend uses Vite with HMR (Hot Module Reload)
- All API responses follow standard JSON format
- Authentication uses localStorage on client-side
- CORS is enabled for development (localhost:5173)

## 📄 License

Open source project for educational purposes.

## 🤝 Support

For questions or issues:
1. Check browser console for errors
2. Check backend terminal for logs
3. Review code comments in respective files
4. Ensure all prerequisites are installed correctly
