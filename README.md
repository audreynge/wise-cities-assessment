# Not Amazon

An e-commerce website built with Next.js, Hero UI, Tailwind CSS, and MikroORM

## Features

- Home page with product grid
- Product detail page
- Shopping cart functionality
- Database integration with MikroORM

## Tech Stack

### Frontend
- Next.js
- Hero UI
- Tailwind CSS

### Backend
- MikroORM
- PostgreSQL


## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/audreynge/wise-cities-assessment.git
   cd wise-cities-assessment
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file in the root directory with the following variables:
   \`\`\`
   DB_NAME=not_amazon
   DB_USER=postgres
   DB_HOST=localhost
   DB_POST=5432
   NEXT_PUBLIC_API_URL=http://localhost:3000
   DB_URL=postgres://postgres:postgres@localhost:5432/not_amazon
   MIKRO_ORM_CLI_CONFIG=./lib/database/mikro-orm.config.ts
   \`\`\`

4. Set up the database:
   \`\`\`bash
   npx mikro-orm migration:create
   npx mikro-orm migration:up
   npx mikro-orm seeder:run
   \`\`\`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

### Product
- id (Primary Key)
- name (String)
- description (Text)
- price (Float)
- imageUrl (String)
- createdAt (Date)
- updatedAt (Date)

### CartItem
- id (Primary Key)
- product (Many-to-one relationship with Product)
- quantity (Integer)
- createdAt (Date)
- updatedAt (Date)
