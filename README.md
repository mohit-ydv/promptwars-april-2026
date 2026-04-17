# 🏟️ StadiumAssist - PromptWars April 2026

**StadiumAssist** is a premium, AI-powered event management platform designed to revolutionize the attendee experience at large-scale venues. Built for the **Global Cup 2026** at the Premium Arena, it provides real-time venue analytics and personalized assistance.

## 🚀 The Problem it Solves

Navigating a massive stadium with 70,000+ attendees can be overwhelming. StadiumAssist solves:
- **Crowd Management**: Directs users away from congested gates and stands.
- **Facility Discovery**: Instantly locates the nearest restrooms and concessions with the shortest wait times.
- **Accessibility**: Provides optimized routes for attendees with mobility needs.
- **Information Gap**: Delivers live match stats and event updates directly to the user's interface.

## ✨ Key Features

- **🤖 Smart AI Assistant**: A Gemini-powered (Flash Lite) chatbot that understands stadium context and provides real-time guidance.
- **📍 Live Crowd Stats**: Real-time capacity, density, and gate status monitoring.
- **⚡ Persistent Quick Actions**: Sticky shortcuts for essential needs like "Nearest toilets," "Quick food," and "Emergency."
- **🎟️ Personalized Attendee Context**: Integrated view of seating, preferences, and personalized alerts.
- **🔔 Dynamic Alert System**: Real-time notifications for egress, concessions availability, and security updates.
- **✨ Premium Dark UI**: A high-end, responsive dashboard built with Lucide icons and Framer Motion animations.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript 6
- **Build Tool**: Vite 8
- **Styling**: Vanilla CSS with Tailwind CSS 4 utility framework
- **AI**: Google Generative AI (Gemini 2.5 Flash Lite)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🚥 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (optional but recommended):
   Create a `.env` file in the root:
   ```env
   VITE_GEMINI_API_KEY=YOUR_API_KEY
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build

To create a production build:
```bash
npm run build
```

---
*Created for the PromptWars April 2026 Challenge.*
