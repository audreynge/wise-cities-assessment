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

1. Clone the repository:<br>
   `git clone https://github.com/audreynge/wise-cities-assessment.git`<br>
   `cd wise-cities-assessment`<br>

2. Install dependencies:<br>
   `npm install`

3. Create a `.env` file in the root directory with the following variables:<br>
   `DB_NAME=not_amazon`<br>
   `DB_USER=postgres`<br>
   `DB_HOST=localhost`<br>
   `DB_POST=5432`<br>
   `NEXT_PUBLIC_API_URL=http://localhost:3000`<br>
   `DB_URL=postgres://postgres:postgres@localhost:5432/not_amazon`<br>
   `MIKRO_ORM_CLI_CONFIG=./lib/database/mikro-orm.config.ts`<br>

4. Set up the database:<br>
   `npx mikro-orm migration:create`<br>
   `npx mikro-orm migration:up`<br>
   `npx mikro-orm seeder:run`

5. Start the development server:<br>
   `npm run dev`

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
