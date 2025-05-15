# 🔗 Link Shortener API

![Clean Architecture Diagram](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)....

A modern URL shortening API built with TypeScript, leveraging Bun for performance and simplicity. It adheres to Clean Architecture principles and employs Screaming Architecture to ensure scalability, maintainability, and clear domain separation.

For a deeper understanding of Clean Architecture principles, check out [The Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

Table of Contents

- [🚀 Quick Start (Using Bun)](#-quick-start-using-bun)
- [🏛 Estructure](#-estructure)
- [🛠️ Technologies Used](#️-technologies-used)
- [📚 API Endpoints](#-api-endpoints)
- [📜 License](#-license)

## 🚀 Quick Start (Using Bun)

### **1️⃣ Install Dependencies**

```sh
bun install
```

### **2️⃣ Set up Environment Variables**

Create a .env file:

```sh
DATABASE_URL=mysql://user:password@localhost/url_shortener
JWT_SECRET=your_super_secret_key
PORT=3000
```

### **3️⃣ Run Migrations (Drizzle ORM)**

```sh)
bun run drizzle:generate
bun run drizzle:migrate
```

### **4️⃣ Start the Server**

```sh
bun run dev
```

## 🏛 Estructure

```
link-shortener-api/
│── src/
│    │── modules/               # 🏛 Business domains (Screaming Architecture)
│    │    ├── links/            # 📦 URL shortening logic
│    │    │    ├── domain/      ✅ Business entities
│    │    │    │    ├── link.ts
│    │    │    ├── use_cases/   ✅ Application use cases
│    │    │    │    ├── shortenLink.ts
│    │    │    │    ├── getOriginalUrl.ts
│    │    │    ├── interfaces/  ✅ Repository contracts
│    │    │    │    ├── linkRepository.ts
│    │    │    ├── adapters/    ✅ Interface adapters
│    │    │    │    ├── linkRepositoryMysql.ts
│    │    │    │    ├── linkMapper.ts
│    │    │    │    ├── linkPresenter.ts
│    │    │    ├── externals/   ✅ Database connection
│    │    │    │    ├── database.ts
│    │    │    │    ├── schema.ts
│    │    │── users/            # 👥 User management
│    │    │    ├── domain/
│    │    │    ├── use_cases/
│    │    │    ├── interfaces/
│    │    │    ├── adapters/
│    │    │    ├── externals/
│    │    │── profiles/         # 🏷 User preferences and tracking
│    │    │    ├── domain/
│    │    │    ├── use_cases/
│    │    │    ├── interfaces/
│    │    │    ├── adapters/
│    │    │    ├── externals/
│    │── infrastructure/        ✅ Internal services (authentication, caching)
│    │    ├── authService.ts
│    │    ├── cache.ts
│    │── externals/             ✅ Frameworks & Drivers
│    │    │── db/               ✅ Database (Drizzle ORM + MySQL2)
│    │    │── messaging/        ✅ Event messaging (RabbitMQ)
│    │    │── ui/               ✅ User interfaces (Web)
│    │    │── integrations/     ✅ External APIs (Payments, CRM)
│    │    │── web/              ✅ Web framework (Express)
│    │    │    ├── main.ts
│    │    │    ├── routes.ts
│    │    │    ├── controllers/
│    │    │    │    ├── linksController.ts
│    │    │    │    ├── usersController.ts
│    │    │    │    ├── profilesController.ts
│── package.json                ✅ Dependencies and scripts
│── tsconfig.json               ✅ TypeScript configuration
│── .env                        ✅ Environment variables
│── index.ts                    ✅ Global entry point
```

This project was created using `bun init` in bun v1.1.42. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## 🛠️ Technologies Used

- Express → Lightweight web framework.
- TypeScript → Static typing & better maintainability.
- Drizzle ORM → Optimized TypeScript-based ORM.
- Drizzle-Zod & Zod → Schema validation & type safety.
- MySQL2 → Fast MySQL client.
- Bun → Fast JavaScript runtime.

## 📚 API Endpoints

| Method | Endpoint             | Description                   | Auth Required |
| ------ | -------------------- | ----------------------------- | ------------- |
| POST   | `/api/links`         | Shorten a new URL             | Yes           |
| GET    | `/api/links/:id`     | Retrieve original URL by ID   | No            |
| GET    | `/api/links`         | List all shortened URLs       | Yes           |
| DELETE | `/api/links/:id`     | Delete a shortened URL by ID  | Yes           |
| POST   | `/api/users`         | Register a new user           |
| DELETE | `/api/links/:id`     | Delete a shortened URL by ID  | Yes           |
| POST   | `/api/users`         | Register a new user           | No            |
| POST   | `/api/users/login`   | Authenticate a user           | No            |
| GET    | `/api/users/profile` | Get user profile              | Yes           |
| PUT    | `/api/users/profile` | Update user profile           | Yes           |
| GET    | `/api/profiles`      | List user preferences         | Yes           |
| PUT    | `/api/profiles/:id`  | Update user preferences by ID | Yes           |

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
