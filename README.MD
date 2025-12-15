# CodeShare API

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Backend REST API for the NoteShare code sharing platform. This API handles code snippet storage, retrieval, and management with database persistence using Prisma ORM.

**🔗 Frontend Repository:** [note_share_frontend](https://github.com/AdebimpeAbdulhamidEniola/note_share_frontend)

## Overview

CodeShare API is a TypeScript-based backend service that provides RESTful endpoints for creating, storing, and retrieving code snippets. It serves as the data layer for the NoteShare platform, enabling users to share code snippets with unique, shareable links.

## Features

- **RESTful API** - Clean, intuitive endpoints for code snippet operations
- **Database Persistence** - Reliable storage using Prisma ORM
- **Type-Safe** - Full TypeScript implementation for enhanced reliability
- **Hot Reload** - Development server with nodemon for rapid iteration
- **Scalable Architecture** - Modular structure for easy maintenance and extension

## Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) 18+
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Development:** [Nodemon](https://nodemon.io/) for hot reloading
- **Database:** PostgreSQL / MySQL / SQLite (configurable via Prisma)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or later
- npm, yarn, or pnpm package manager
- PostgreSQL, MySQL, or SQLite database

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AdebimpeAbdulhamidEniola/code_share_api.git
cd code_share_api
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure your database connection:

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/codeshare?schema=public"
# or for MySQL
# DATABASE_URL="mysql://user:password@localhost:3306/codeshare"
# or for SQLite
# DATABASE_URL="file:./dev.db"

PORT=3001
NODE_ENV=development
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
# or
npx prisma db push
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

### Running the API

#### Development Mode

Start the development server with hot reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The API will be available at `http://localhost:3001` (or your configured PORT).

#### Production Mode

Build and start the production server:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
code_share_api/
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   └── migrations/        # Database migration files
├── src/
│   ├── controllers/       # Request handlers
│   ├── routes/            # API route definitions
│   ├── models/            # Data models and types
│   ├── middleware/        # Express middleware
│   ├── utils/             # Helper functions
│   └── index.ts           # Application entry point
├── prisma.config.ts       # Prisma configuration
├── nodemon.json           # Nodemon configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## API Endpoints

### Code Snippets

#### Create a Code Snippet
```http
POST /api/snippets
Content-Type: application/json

{
  "code": "console.log('Hello World');",
  "language": "javascript",
  "theme": "vs-dark"
}
```

**Response:**
```json
{
  "id": "abc123xyz",
  "code": "console.log('Hello World');",
  "language": "javascript",
  "theme": "vs-dark",
  "createdAt": "2024-12-15T10:30:00.000Z",
  "shareUrl": "https://codeshare-coral.vercel.app/snippet/abc123xyz"
}
```

#### Get a Code Snippet
```http
GET /api/snippets/:id
```

**Response:**
```json
{
  "id": "abc123xyz",
  "code": "console.log('Hello World');",
  "language": "javascript",
  "theme": "vs-dark",
  "createdAt": "2024-12-15T10:30:00.000Z"
}
```

#### List Recent Snippets
```http
GET /api/snippets?limit=10
```

#### Delete a Snippet
```http
DELETE /api/snippets/:id
```

## Database Schema

The API uses Prisma ORM with the following core schema:

```prisma
model Snippet {
  id        String   @id @default(cuid())
  code      String   @db.Text
  language  String
  theme     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

To modify the schema, edit `prisma/schema.prisma` and run:

```bash
npx prisma migrate dev --name your_migration_name
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio GUI
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma Client

### Prisma Studio

To explore and manage your database visually:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your data.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | Required |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` |

## Deployment

### Deploy to Render / Railway / Heroku

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables (especially `DATABASE_URL`)
4. The platform will automatically detect and build your Node.js app
5. Ensure the start command is set to `npm start`

### Deploy with Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t codeshare-api .
docker run -p 3001:3001 --env-file .env codeshare-api
```

## Testing

```bash
# Run tests (when implemented)
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## CORS Configuration

The API is configured to accept requests from the frontend application. Update CORS settings in your main application file:

```typescript
// src/index.ts
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error response format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "statusCode": 400
  }
}
```

## Performance Considerations

- Database queries are optimized using Prisma's query engine
- Consider implementing caching for frequently accessed snippets
- Add rate limiting for production deployments
- Use connection pooling for database connections

## Security

- Validate and sanitize all user inputs
- Implement rate limiting to prevent abuse
- Use environment variables for sensitive data
- Keep dependencies updated
- Consider adding authentication for snippet management

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all TypeScript types are properly defined

## Troubleshooting

### Database Connection Issues

```bash
# Test your database connection
npx prisma db push

# Reset your database (caution: deletes all data)
npx prisma migrate reset
```

### Prisma Client Not Found

```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port Already in Use

Change the `PORT` in your `.env` file or kill the process using the port:

```bash
# Find process on port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

## Support

If you encounter issues or have questions:

- Open an [issue](https://github.com/AdebimpeAbdulhamidEniola/code_share_api/issues)
- Check [Prisma documentation](https://www.prisma.io/docs)
- Review [TypeScript documentation](https://www.typescriptlang.org/docs)

## Maintainer

**Adebimpe Abdulhamid Eniola**
- GitHub: [@AdebimpeAbdulhamidEniola](https://github.com/AdebimpeAbdulhamidEniola)

## Related Projects

- [Frontend Application](https://github.com/AdebimpeAbdulhamidEniola/note_share_frontend) - Next.js frontend for CodeShare
- [Live Demo](https://codeshare-coral.vercel.app) - Production deployment

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with [Prisma ORM](https://www.prisma.io/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
- Inspired by code sharing platforms like Pastebin and GitHub Gist

---

**Note:** This is the backend API. For the complete application experience, run this alongside the [frontend application](https://github.com/AdebimpeAbdulhamidEniola/note_share_frontend).