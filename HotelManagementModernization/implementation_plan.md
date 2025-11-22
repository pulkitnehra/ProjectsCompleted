# Hotel Management System Modernization Plan

## Goal Description
Modernize the legacy Java Swing Hotel Management System to a cross-platform desktop application using modern technologies. The new system will retain existing functionality while adding mobile booking, LLM integration, and a management dashboard.

## User Review Required
> [!IMPORTANT]
> **Tech Stack Selection**: Recommending **Electron + React** or **Tauri + React** for cross-platform desktop capabilities with a modern web-based UI.
> **Database**: Recommending **Supabase (PostgreSQL)**. This solves the requirement for "central data accessed by multiple desktop apps/web/kiosk" without complex sync logic. Free tier is sufficient.
> **LLM Integration**: Using **Gemini Flash API** (Free Tier) as requested. No local hardware cost.

## Proposed Changes

### 1. Tech Stack & Architecture
- **Frontend/Desktop Wrapper**: **Electron** (for cross-platform support: Mac, Windows, Linux).
- **UI Framework**: **React** + **TypeScript**.
- **Backend Logic**: **Node.js** (Embedded in Electron).
  - *Decision*: Using TypeScript for both ends simplifies packaging into a single installer (no Python runtime dependency issues).
- **Database**: **Supabase (PostgreSQL)**.
  - *Decision*: Since you need the DB to be "central and polled by desktop apps on different machines", a cloud database is essential. SQLite is local-only. Supabase provides a free, easy-to-setup PostgreSQL DB with real-time capabilities (no polling needed).

### 2. Database Migration
- Initialize **Supabase** project.
- Design schema in PostgreSQL.
- *Benefit*: PWA and Desktop App both connect directly to Supabase. No complex sync logic required.

### 3. LLM Integration
- **Model**: **Gemini Flash API**.
- **Staff Assistant**: Chat interface for inventory checks and operational queries.

### 4. Mobile Booking Strategy
- **PWA (Progressive Web App)**: Low-cost distribution, no app store fees, works on all devices.
- **WhatsApp/Telegram Bot**: For very low friction booking in the Indian market.

### 5. Management Dashboard
- New "Management View" with charts (Recharts/Chart.js).
- Track expenses, inventory, and occupancy rates.

## Verification Plan
- **Automated Tests**: Jest/Vitest for logic, Playwright for E2E testing.
- **Automated Tests**: Jest/Vitest for logic, Playwright for E2E testing.
- **Dry Run**: Perform a complete "Dry Run" of Core Functionality (Auth, Booking, Room Status) before proceeding to Dashboard/LLM tasks.

## UI Mockups

### Modern Dashboard
![Modern Dashboard](images/modern_hotel_dashboard_1763830638600.png)

### Management Analytics View
![Management Analytics](images/management_analytics_view_1763830664934.png)

### Smart Check-in (LLM Integrated)
![Smart Check-in](images/smart_checkin_screen_1763830689802.png)

### Reception Room Status Grid
![Room Status Grid](images/reception_room_grid_1763831835382.png)

### Employee Management
![Employee Management](images/employee_management_screen_1763831856404.png)

### Customer History
![Customer History](images/customer_history_screen_1763831902768.png)
