# LIJR - Life Journal

Journal about emotions and experiences to better navigate your life

## How to run

`cd server` and run the following tasks

- npm install
- npm run db:seed
- npm run dev

On a separate terminal, `cd client` and run

- npm install
- npm run dev

On the client, go to login, click on 'Login' then go to 'Home' and click on Dashboard

To run tests on the server: npm test

## Description

LIJR allows you to keep track of different aspects of your life. This app is a tool designed to help you in your personal growth and to serve as a GPS when you wonder 'How did I end up here?'.

At the core of the app are the journal entries and the life aspects. Journal entries have a date and text where the user can write about a certain event or how they are feeling. An entry can be linked to different life aspects. For example, a user can write about a holiday trip and link it to their buckelist goals, to the list of things that bring them joy or with their relationships with their travel companions.

## Features

The app will allow the user to filter their journal entries by different life aspects.

A timeline feature allows the user to get a general view of how they have felt or what kinds of things have happened at a certain moment in their life.

An AI feature generates triggering questions for the user to journal about, as well as evaluate their emotional state based on what they write.

## Tech Stack

### Frontend

Web client
Framework: React and plain CSS
State management: Redux
Rich text editor: TinyMCE
AI: Chat GPT API
Chart visualization: ReactVis

### Backend

Database: MongoDB and Mongoose as ORM
Server: GraphQL

Dev dependencies:

- @faker-js/faker &rarr; Allows generation of mock data
