## ft_transcendence

A full-stack Single-page web app featuring:  
 - real-time multiplayer Pong gameplay
 - multiple authentication methods (2FA via email, auth app and OAuth)
 - comprehensive user management
 - tournament organization.

[visit the live app](https://authplay.vercel.app)

## Deployment:
Frontend: `Vercel`  
Backend: `Render` (note: free tier may introduce some latency)

<br>

## Features
🎮 **Gaming Experience**

- Real-time multiplayer Pong
- AI opponent for solo gameplay
- Customizable game settings (ball speed, paddle size, colors)
- Responsive controls with smooth gameplay

👥 **User Management**

- Secure user registration and authentication
- Google OAuth integration for easy sign-in
- User profiles with statistics and match history
- Friend system with real-time online/offline status
- User search and discovery

🔒 **Security & Privacy**

- Two-Factor Authentication (2FA) via email and authenticator apps
- JWT-based secure sessions
- GDPR compliance with data anonymization options
- Account deletion and local data management

🏆 **Tournament System**

- Create and join tournaments
- Bracket-style tournament organization
- Real-time tournament tracking

🌐 **Accessibility & Compatibility**

- Cross-browser compatibility
- Intuitive user interface

<br>

## If wanna check the project locally

Get the repo
```bash
git clone <URL> ft_transcendence
```

Change Directory and make sure `docker` is running before using `Makefile` to compile
```bash
cd ft_transcendence && make
```

Open the browser
```bash
https://localhost
```
**Note:** ssl/tls is set to be self-signed so the browser may ask you to accept the risk.


Dev mode is also available since the frontend is build with vite
```bash
localhost:5173
```

.env is included which does not include any sensitive credentials but some of the variable to prevent hard coding.  
**Note:** Some authentication features require additional environment variables:
- Google OAuth: Requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` 
- Email 2FA: Requires `SENDER_EMAIL` and `SENDER_PW`
- Authenticator app 2FA works out of the box

Contact the repository owner for the required credentials.

<br>

## Tech

`Docker` is used to run the web.  

**frontend:**
 - framework: `TailwindCSS`
 - toolkit: `Vite`
 - Language: `Typescript`
   
**backend**
 - framework: `Fastify`
 - runtime: `Node.js`
 - toolkit: `Nodemon`

**database**
 - SQLite

<br>

## Modules:

**web**
- Use a framework to build the backend. (node.js and fastify)
- Use a framework or toolkit to build the front-end. (tailwind css) **(minor)**
- Use a database for the backend. (SQLite) **(minor)**

**user management**
- Standard user management, authentication, users across tournaments.
- Implement remote authentication. (google signin)

**cybersecurity**
- 2FA（email, google authenticator） and JWT
- GDPR compliance options with user anonymization, local data management, and Account Deletion. **(minor)**

**gameplay and user experience**
- Game customization options. **(minor)**

**DevOps**
- Designing the Backend as Microservices.

**ai-algo**
- Introduce an AI opponent.

**Accessibility**
- Expanding Browser Compatibility. **(minor)**

<br>

## Notes

This is a collaborative 42 project developed with [@jmaio22](https://github.com/jmaio22)

**Team contributions:**

[@jmaio22](https://github.com/jmaio22): Tournament system, Pong game implementation and AI opponent

[@andychiu3](https://github.com/andychiu3):  User management, authentication, security features, match history and friend system

<br>

## Technical considerations:

This project follows 42 constraints with limited tools 

<br>
