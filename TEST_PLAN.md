# Test Plan – Rolnopol v1.0.73

> Based on official documentation: http://localhost:3000/docs.html  
> API reference: http://localhost:3000/swagger.html

---

## 1. Scope

Functional and smoke testing of the **Rolnopol** agricultural management system.

Out of scope: performance/load testing, security penetration testing, UI visual regression.

---

## 2. Test Environment

| Item     | Value                              |
| -------- | ---------------------------------- |
| Base URL | http://localhost:3000              |
| API Base | http://localhost:3000/api/v1       |
| API Docs | http://localhost:3000/swagger.html |
| Version  | 1.0.73                             |

## 3. Test Areas & Cases

### 3.1. Smoke tests

- [x] HOME-1 - should display Rolnopol in page title
- [x] LOGIN-1 - login page should be visible and loaded
- [x] REG-1 - register page should be visible and loaded
- [x] API-1 - swagger page should be visible and loaded
- [x] DOCS-1 - docs page should be visible and loaded
- [x] REG-2 - successful user registration
- [x] REG-3 - registration with too short password should show error
- [x] REG-4 - registration with invalid email should show error
- [x] REG-5 - registration with too short display name should show error
- [x] LOGIN-2 - successful login redirects to profile with required sections visible, logout returns to home
- [x] LOGIN-3 - profile page displays correct user data after login
- [x] SF-1 - adding new field shows confirmation and field appears in list
- [x] SF-2 - adding new animal group shows it in the animals list
- [x] FTR-1 - footer should be visible and contain copyright text
- [x] FTR-2 - footer should have contact navigation link
- [x] FTR-3 - footer should have jaktestowac.pl and AI_Testers links
