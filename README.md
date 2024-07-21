# fullstack-app

NodeJS ReactJS Fullstack app template

Make sure you have Docker daemon is installed on your machine

- Clone it
- Rename `.example.env` to `.env` inside both `web` and `api` app inside apps
- apps/api/ folder - run `$ docker-compose up` to pull postgres image and run it's container
- apps/api folder - run `npx prisma migrate dev` , it will deploy the latest prisma schema to DB
- apps/api folder - run `npm run seed` to create SEED Data.
- apps/api/ folder - `npm run dev`
- apps/web/ folder - `npm run dev`
