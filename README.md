# DECK SOLVED

A Magic The Gathering card reference & deck-building tool.

## Goals & Mission

The main goal is to build a **simple**, **easy-to-use** and **user-friendly** web-application which can be used as an **MTG card reference** and as a **deck-building tool**.

The application should be composed of the following _sections_:

- **SEARCH**.- Which should provide the necessary tools to search for specific cards and display them (e.g. single card page, multiple cards view due to search-queries, etc), exposing relevant data to the user. The main goal is to offer the user only card-information that might influence the process of deck-building (e.g. we should avoid print-related aspects of a card like it's expansion).
- **BUILD DECK**.- Which should expose a set of tools that support the user to build an MTG deck regardless of the playing format. The main purpose is to give the user additional information on his created deck (e.g. mana curve, sample hands, relevant statistics of the deck, etc).
- **AUTHENTICATION**.- The application should persist user data, thus the application should provide a way to register and log in (also users should be able to login using their facebook, google accounts, etc).

## Used Technologies:

### Client:

- React.js - **user interfaces**.
- Material UI (React) - **design system**.
- Axios - **requests to server**.
- Others - JQuery, qs (query-string), etc.

### Server:

- Node.js - **server**.
- Express - **api**.
- Mongoose (MongoDB) - **database**.
- Others - body-parser, dot-env, etc.

## App Structure:

### Search section:

**Endpoints:**

- `/search`:
  - Used with queryParams _(e.g. "/search?name=tarmogoyf")_.
  - Trigger a card-search according to the query-string and display a page with the results. You can also perform an advanced search using the set of allowed string queries that are defined on the API (review server API).
- `/cards/<cardName>`:
  - Used with URL params _(e.g. "/cards/Thoughtseize")_.
  - Redirects to a page that shows the card's detailed information.

**Views**:

- Search page (search input, home view).
- Results page (card results, results can be displayed as an image or as a list of cards, also you can sort and filter these results).
- Card page (card detailed information, ruling, etc).
