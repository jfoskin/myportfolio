# Roadmap

Planned updates to the portfolio, roughly in priority order.

## 1. Skills grouped by category

Group skills under headings a recruiter can scan quickly: **Frontend**, **Backend**, **Databases**, and **Tools & Platforms**.

- [ ] Add a `category` field to `backend/src/models/SkillModel.js` (an `enum` of the categories above, so typos can't create new groups)
- [ ] Add a category to every skill in `backend/src/utils/seedSkills.js` and re-seed
- [ ] Group skills by category in `frontend/src/components/SkillsContent.jsx`, with a heading per category, in a fixed order
- [ ] Add a category dropdown to the skill form in the admin dashboard

## 2. Contact form sends email

The contact form (`frontend/src/components/ContactContent.jsx`) is only a layout right now: it has no submit handler and nothing is sent.

- [ ] Add a backend route, e.g. `POST /contact`, that sends the message through an email service (Resend, SendGrid, or Nodemailer with a Gmail app password)
- [ ] Keep the destination address and API key in `backend/.env` only, never in frontend code, so the private address is never exposed to visitors
- [ ] Use the visitor's address as `reply-to`, so replies go straight to them
- [ ] Validate input on the backend (required fields, email format, max length)
- [ ] Add spam protection: a hidden honeypot field and rate limiting per IP
- [ ] Frontend: controlled inputs, a sending state, and success/error messages (reuse the style of `FetchStatus`)

## 3. Resume request section

A form recruiters can use to request my resume for a specific role.

Fields:
- [ ] Name and email (required)
- [ ] Company
- [ ] Link to the job opening (required)
- [ ] Job details / message
- [ ] LinkedIn or personal website (optional)

Build:
- [ ] New `ResumeRequest` model and a `POST /resume-requests` route; validate that links are real `http(s)` URLs
- [ ] Email me when a request arrives (reuse the email service from item 2)
- [ ] List requests in the admin dashboard so I can follow up and mark them as handled
- [ ] New desktop icon and modal for the form, using the same spam protection as the contact form
- [ ] Note on the form what the data is used for, since it collects other people's contact details

## 4. About window styled as a code editor

Restyle the About modal to look like an IDE rather than a plain window.

- [ ] Sidebar file tree (e.g. `about.md`, `experience.json`, `interests.txt`); clicking a file shows it
- [ ] Tab bar across the top showing the open file
- [ ] Line numbers and syntax-style colors taken from the theme palette (pink and teal accents)
- [ ] Status bar at the bottom (e.g. language, line count)
- [ ] Keep it readable on small screens: hide the sidebar and keep the tabs
- [ ] Keep the text as real text (not an image) so it stays accessible and searchable

## Smaller fixes

- [ ] Remember the visitor's retro/modern and light/dark choice (`localStorage`); both reset on refresh today
- [ ] `/lol` page overlaps the desktop icons in the modern layout
- [ ] Resize and compress project screenshots (some are about 3000px wide and ~700 KB)
