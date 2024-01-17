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

## Tech Stack

### Frontend

Web client
Framework: React and plain CSS
State management: Redux
Tagging manager: react-tag-input

### Backend

Database: MongoDB and Mongoose as ORM
Server: GraphQL

Dev dependencies:

- @faker-js/faker &rarr; Allows generation of mock data

## Ideas for new features

- Add a light theme (use a similar background color as the site https://dribbble.com/)
- Implement a mentions system such as in [here](https://www.algolia.com/doc/ui-libraries/autocomplete/solutions/rich-text-box-with-mentions-and-hashtags/) to link journal entries with tags, or implement the whole life aspects and measurables part of the app
- Create a list of questions that randomly pop up in the user's dashboard, to trigger journal entries
- Implement an [emotional level of vibration](https://i.pinimg.com/originals/dc/6e/6a/dc6e6a6e7840023ef6595fd47298ae5b.jpg) system to link journal entries with a certain emotional state
- Two possible ways of linking entries to emotional states:
  - AI: Make an api request to evaluate the emotional state of an entry
  - Implement a [circular menu](https://freefrontend.com/css-circle-menus/) so that when the user saves a journal entry, they have to necessarily click on the emotional state they feel that entry is about
- Give the user the possibility to save their data locally
- Create a community feature so people with similar emotions and mood can connect, share and help each other
