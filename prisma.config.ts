import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Wymuszamy załadowanie zmiennych z .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});