# [TukiPlan]

A lightweight, beginner-friendly web app for discovering, ticketing, and planning casual weekend events in Kenya (picnics, parties, meetups, small gatherings). Built for organizers and groups who don't need (or can't afford) big platforms like Mtickets or Ticketsasa.

Focus:  
- Browse/search upcoming weekend events  
- Simple ticket purchasing (M-Pesa ready in future)  
- Group planning tools: create meetups, invite friends, track shared budget/expenses  

Perfect for student groups, church fellowships, chama outings, birthday bashes, or small community events.

## Tech Stack
- **Frontend**: EJS templates + Tailwind CSS (via CDN or npm)  
- **Backend**: Node.js + Express.js  
- **Database**: SQLite (for MVP – easy, no setup)   
- **Templating**: EJS for dynamic server-rendered views  
- Other: bcrypt (passwords), jsonwebtoken (auth), body-parser, helmet  

No heavy frontend frameworks — plain HTML/CSS/JS + EJS for simplicity and fast prototyping.

## Features (MVP Roadmap)
1. User registration & login  
2. Create & list events (title, desc, date, location, price, tickets available)  
3. Search/filter events (by keyword, date → focus on weekends)  
4. Buy/view tickets (basic counter for now)  
5. Create group meetups/plans  
6. Shared budget tracker (add expenses, split among participants)  
7. Dashboard for your created events/meetups  

Future ideas:  
- M-Pesa/Stripe payment integration  
- Email/share links for invites  
- Calendar view  
- Mobile responsiveness tweaks  

## Project Structure