# TipHiveJS

Convert TipHiveAPP to javascript

## Requirements

- Node version equals to the one in the `.nvmrc`

## Notes:

- Copy `.env.example` to `.env` and update as needed.

## Create a staging user

- Go to https://stage.friyayapp.io
- Create a new user (**Note: you won't get an email**).

## Changes you'll need to make

- You may have to add a `/etc/hosts` entry for `friyayapp.localhost`
- If you do not have a local version of our API running
  - you'll need to use `API_URL=https://stageapi.friyayapp.io/v2` in `.env`
    (already set in the `.env.example`)

## Update your `/etc/hosts` file

- Add an entry for `127.0.0.1 friyayapp.localhost`
- Also, for each new Workspace you create, you'll need an entry: `127.0.0.1 <workspace name>.friyayapp.localhost`
  - For instance, if you create a Workspace called "uber", the entry would be `127.0.0.1 uber.friyayapp.localhost`
- These changes will allow you to access friyay app at http://friyayapp.localhost:5000 or http://uber.friyayapp.localhost:5000

## Start the app

Run `nvm use` first to load correct node version if you're using `nvm`.

Run `npm install` to install dependency modules.

Run `npm run watch` to compile graphql queries (keep it running).

Then do one of the following:

- Run `npm run dev` to start development server with hot reload.

- Run `npm run dev:debug` to start development server with hot reload and source maps to ease debugging but with slower build and rebuild times.

- Run `npm run build` to build development source and watch for changes.
  And then run `npm start` in another tab to start app server at port 5000.

Open `https://stage.friyayapp.io` or `http://friyayapp.localhost:5000` (depending on whether you use `stage` or `local api`) on a new tab in private (incognito) mode, so you wouldn't get auth error caused by mismatched authToken cookie, as you probably also logged in to the production site.

## Relay / GraphQL

- Please commit the compiled graphql queries, if any.

---

## Making Changes

- make sure `dev` is current (`git checkout dev` then `git pull`)
- create a new branch from `dev` (`git checkout -b fix/color-picker`)
- make some changes and commits
- merge latest `dev` (`git merge dev`) and fix any conflicts that arise`
- push the new branch (`git push -u`)
- create pull request, eg. from `github` or `VS Code GitLens` extension
