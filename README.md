# Portfolio

Angular frontend, Spring Boot backend. In production it is one jar: Spring Boot serves the built Angular files and the `/api` endpoints.

## Layout

- `frontend/` Angular 20 app (standalone components, signals)
- `backend/` Spring Boot 3.4, Java 21
- `backend/src/main/resources/profile.json` all the text on the site. Edit this to change content.

## Develop

Terminal 1:

    cd backend && mvn spring-boot:run

Terminal 2:

    cd frontend && npm install && npx ng serve

Open http://localhost:4200. The dev server proxies `/api` to port 8080.

## Build one jar

    ./build.sh
    java -jar backend/target/portfolio-1.0.0.jar

Open http://localhost:8080. Contact messages are appended to `data/messages.jsonl` next to where you run the jar.

## API

- `GET /api/profile` returns the content from profile.json
- `POST /api/contact` takes `name`, `email`, `message` (and an empty `website` honeypot). Limited to 5 messages per IP per hour.

## Frontend structure (`frontend/src/app`)

    models/       interfaces for the API response, shared types and enums (import from '@app/models')
    constants/    API paths, nav items, form limits, signal-trace settings
    utils/        small pure functions (name splitting, signal maths, error messages, motion helpers)
    services/     PortfolioApi, the only place that talks to the backend
    directives/   reveal (scroll fade-in) and countUp
    components/   one folder per component: header, hero, metric-list, trend-canvas, about,
                  experience, research, fusion-diagram, skills, background, contact, contact-form, footer
    app.ts        loads the profile and passes each piece to a component
