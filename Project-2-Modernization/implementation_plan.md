# Hotel Management System Modernization Plan

## Goal Description
Modernize the legacy Java Swing Hotel Management System to a cross-platform desktop application using modern technologies. The new system will retain existing functionality while adding mobile booking, LLM integration, and a management dashboard.

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection**: Recommending **Electron + React** or **Tauri + React** for cross-platform desktop capabilities with a modern web-based UI.
> **Database**: Recommending **SQLite** (local, zero-config) or **PostgreSQL** (robust, open-source) depending on multi-user needs.
> **LLM Integration**: Using local LLMs (e.g., Llama 3 via Ollama) or low-cost APIs (Gemini Flash) for cost efficiency.

## Proposed Changes

### 1. Tech Stack & Architecture
- **Frontend/Desktop Wrapper**: **Electron** (for cross-platform support: Mac, Windows, Linux).
- **UI Framework**: **React** + **TypeScript**.
- **Backend Logic**: **Node.js** (Embedded in Electron).
  - *Decision*: Using TypeScript for both ends simplifies packaging into a single installer (no Python runtime dependency issues).
- **Database**: **SQLite** (Local file) with optional Cloud Sync (Supabase/Firebase) for PWA integration.

### 2. Database Migration
- Migrate from MySQL to SQLite.
- Create a sync mechanism for Mobile PWA bookings (e.g., poll a free Firebase Firestore collection for new bookings).

### 3. LLM Integration
- **Customer Patterns**: Analyze booking history to suggest preferences.
- **Smart Check-in/out**: NLP-based form filling from ID scans or voice input.
- **Staff Assistant**: Chat interface for inventory checks and operational queries.

### 4. Mobile Booking Strategy
- **PWA (Progressive Web App)**: Low-cost distribution, no app store fees, works on all devices.
- **WhatsApp/Telegram Bot**: For very low friction booking in the Indian market.

### 5. Management Dashboard
- New "Management View" with charts (Recharts/Chart.js).
- Track expenses, inventory, and occupancy rates.

## Verification Plan
- **Automated Tests**: Jest/Vitest for logic, Playwright for E2E testing.
- **Manual Verification**: Compare legacy app screens with new UI.
