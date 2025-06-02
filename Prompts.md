Here's a **detailed AI prompt** to generate a **React Native mobile app UI and logic** for an **MVP personal finance app**, based on the **Top 20 most relevant day-to-day features** for Indian middle-class users. This is optimized for a prompt that can be used with code-generation or design-generation AIs (like GPT-4, Midjourney, Figma AI, etc.):

---

### 🔷 Prompt: Build a React Native Personal Finance Mobile App (India-Centric MVP)

**Objective**: Generate a **React Native mobile application** focused on solving the **day-to-day financial pain points** of Indian middle-class users. The app should deliver a **clean, intuitive, and functional MVP** that includes **20 critical features**, designed for early validation and high utility.

---

### 🧩 App Overview:

* **App Name**: *Artha*
* **Platform**: React Native (cross-platform: Android & iOS)
* **Tech Stack**:

  * Frontend: React Native + TypeScript
  * State: Redux Toolkit or Context API
  * Backend: Firebase / Node.js (Mock for MVP)
  * Persistence: SQLite / AsyncStorage
  * UI: Styled using Tailwind or NativeBase
  * Navigation: React Navigation
  * Authentication: Firebase Auth with 2FA

---

### 🌟 Design & UX Guidelines:

* Use modern Indian fintech app UI patterns (inspired by Groww, CRED, PhonePe)
* Easy-to-read charts and icons
* Local currency format (₹)
* Dark & Light Mode switch
* Multilingual support (start with English & Hindi)
* Accessibility & touch-optimized for older users

---

### ✅ Include the following **Top 20 Features** in MVP:

1. **Expense Categorization**

   * Auto & manual categorization (e.g., Groceries, Travel, Bills, Lifestyle)
   * Pie chart view for category split

2. **Budget Planning**

   * Monthly budget set per category
   * Alerts when spending crosses budget

3. **Bill Reminders**

   * Auto-detect bills from SMS
   * Push + in-app reminders for credit cards, electricity, DTH, rent

4. **Bank Account Aggregation**

   * Show all balances from SBI, ICICI, HDFC, Paytm, GPay in one screen
   * Simulate bank integration using mock JSON for MVP

5. **Credit Score Monitoring**

   * Simulated integration (mock credit score from 300-900)
   * Tips to improve score

6. **Goal-Based Savings**

   * Create savings goals (e.g., Wedding, Education, Travel)
   * Visual progress bar with monthly deposit

7. **EMI & Loan Management**

   * Track active EMIs and loans (auto/manual entry)
   * Show interest % and time left

8. **Income Tracking**

   * Track salary, freelance, tuition, rental income
   * Weekly/monthly income graphs

9. **Real-Time Alerts & Notifications**

   * Simulate UPI/Bank SMS alerts
   * Push alerts when amount is debited or credited

10. **Recurring Payments Detection**

    * Detect and list recurring payments from history
    * Option to cancel or snooze subscriptions

11. **Investment Tracking**

    * Track mutual funds, SIPs, LIC, PPF
    * Show returns, start date, current value (mock data)

12. **Tax Estimator**

    * Show estimated tax based on income and deductions (80C/80D)
    * Offer deduction suggestions

13. **Digital Wallet Integration**

    * Track spending from Paytm, GPay, PhonePe
    * Monthly wallet usage summary

14. **Family Budgeting**

    * Invite spouse/parent to shared dashboard
    * View combined expenses & goals

15. **Custom Tags and Notes**

    * Tag transactions (e.g., Personal, Business, Medical)
    * Add notes for context

16. **Financial Health Score**

    * Score based on savings %, debt, investments
    * Show improvement tips

17. **Subscription Tracker**

    * Show active subscriptions: Netflix, Spotify, Coursera
    * Option to cancel directly (mock action)

18. **Cash Flow Visualization**

    * Bar/line chart of income vs expenses month-wise
    * Highlight surplus or deficit

19. **Two-Factor Authentication**

    * Enable 2FA via OTP (Firebase Phone Auth)
    * Option to enable from settings

20. **Data Export to Excel/CSV**

    * Export transaction data with filters
    * Use react-native-share or similar for file export

---

### 🛠 MVP Requirements:

* Implement mock data for bank and credit integrations
* Focus on **offline-first capability** using SQLite or local storage
* Ensure app works well on 4G and low-end phones
* All data fields should use INR currency formatting
* Provide mock test data for each use case

---

### 📱 UI Screens Needed:

1. Onboarding + Signup/Login with OTP
2. Home Dashboard (Overview of balance, budget, goals)
3. Expense Tracker + Add/Edit Expense
4. Budget Setup Screen
5. Goal Saving Setup & Progress
6. Credit Score Dashboard
7. Subscriptions Manager
8. EMI & Loan Tracker
9. Bank/Wallet Aggregation View
10. Settings (Language, Theme, 2FA, Export Data)
11. Notifications Center
12. Family Sharing Screen
13. Income Tracker View
14. Tax Estimator Wizard
15. Reports (Pie/Bar/Line charts)

---

### 🔐 Security & Privacy:

* PIN Lock / Biometric login
* All sensitive data encrypted in local storage
* GDPR/Indian data compliance basics

---

### 📤 Output Requirements:

* Provide:

  * React Native codebase (TypeScript)
  * Component structure for screens
  * Navigation flow
  * Mock API / data layer for integrations
  * Sample UI mockups or wireframes (if applicable)

---

