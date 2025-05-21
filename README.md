# Ask the Panel

Live Demo: [https://ask-the-panel.vercel.app/](https://ask-the-panel.vercel.app/)

## Overview

Ask the Panel is a playful and personality-driven Q&A GenAI app. Users can ask any questions and keep a chat with four different characters:

💎 Tiffany Vandergilt – A wealthy heiress from San Francisco

⛪ Don Andrea Bellucci – An Italian priest with a peculiar spiritual wisdom

🔮 Sibylla Naxos – A Greek tarot reader (or con artist?)

🧢 Chad – A crypto bro

You can choose between a short or long response based on how detailed you want the answer to be. The application has contextual memory, so the character will remember your conversation so far.

![Demo](./public/readMe/askThePannel.gif)

## Features

-   Character-based answers powered by LLMs

-   AI responses using openrouter.ai

-   Contextual memory

-   Switchable model (default: `mistralai/mistral-7b-instruct:free`)

-   Input and prompt answer validation with **Zod**

-   Fully deployed via **Vercel**

-   Mobile Version available

## Tech Stack

-   Next.js

-   React

-   TypeScript

-   Tailwind CSS

-   Zod

-   OpenRouter API

-   Mistral AI

## Getting Started

Clone the repository and install dependencies:

`npm install`
Create a .env file at the project root with the following values:

`OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000`

Then start the development server:

`npm run dev`

Visit http://localhost:3000 in your browser.

## Configuration

    The model used by the app can be changed in the API config.ts (/lib/config.ts). Simply replace:

`config.model` with your desired model ID.

## Deployment

The app is deployed with Vercel. Ensure the `.env` values are also set in the Vercel dashboard for production.
