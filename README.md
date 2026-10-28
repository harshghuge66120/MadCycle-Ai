# MedCycle AI

React + TypeScript + Vite recreation of the supplied MedCycle AI TSX project.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run on Windows (PowerShell)
1. Extract `medcycle-ai-project.zip`.
2. Open PowerShell in the extracted `medcycle-ai-project` folder.
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the development server:
   ```powershell
   npm run dev
   ```
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```powershell
npm run build
npm run preview
```

## Notes
- The project starts with synthetic demonstration medicine, reminder, collection-point, and disposal-passport data.
- Browser localStorage is used to persist medicines, reminders, and passports on that browser.
- The OCR scanner and AI/ML risk score are demo simulations, not a connected OCR service or trained clinical model.
- Collection points and contact details in the source are demo data. Verify real disposal locations with a local pharmacist or authorized program.
- Do not use the app to make clinical decisions. Never take expired medicines; consult a pharmacist or healthcare professional.
