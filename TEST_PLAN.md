# Test Plan – Rolnopol v1.0.73

> Based on official documentation: http://localhost:3000/docs.html  
> API reference: http://localhost:3000/swagger.html

---

## 1. Scope

Functional and smoke testing of the **Rolnopol** agricultural management system, covering:

- User authentication & session management
- Farm resource management (fields, animals, staff, assignments)
- Internal marketplace (offers, purchases, cancellations)
- Financial operations (balance, transactions, transfers)
- Role-based access control (RBAC)
- System health & API availability

Out of scope: performance/load testing, security penetration testing, UI visual regression.

---

## 2. Test Environment

| Item     | Value                              |
| -------- | ---------------------------------- |
| Base URL | http://localhost:3000              |
| API Base | http://localhost:3000/api/v1       |
| API Docs | http://localhost:3000/swagger.html |
| Version  | 1.0.73                             |

---

## 3. User Roles

| Role       | Description                              |
| ---------- | ---------------------------------------- |
| Farmer     | Default role; manages own farm resources |
| Admin      | Can manage users; session expires in 1h  |
| Superadmin | Full system access & audit logs          |

Demo accounts are available for all roles (see http://localhost:3000/docs.html#demo-accounts).

---

## 4. Test Areas & Cases

### 4.1 Authentication

| ID     | Title                                   | Steps                                              | Expected Result                                                  | Tags                                |
| ------ | --------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| TC-A01 | Successful registration                 | POST `/register` with unique email, name, password | 201 response; user auto-logged in; redirected to `/profile.html` | `@auth @registration @p1 @smoke`    |
| TC-A02 | Duplicate email registration            | POST `/register` with an already-used email        | 4xx error with validation message                                | `@auth @registration @negative @p1` |
| TC-A03 | Successful login                        | POST `/login` with valid credentials               | 200; `rolnopolToken` and `rolnopolLoginTime` cookies set         | `@auth @login @p1 @smoke`           |
| TC-A04 | Login with invalid credentials          | POST `/login` with wrong password                  | 401 error message returned                                       | `@auth @login @negative @p1`        |
| TC-A05 | Login with deactivated account          | POST `/login` with deactivated user credentials    | 4xx error; clear error message                                   | `@auth @login @negative @p1`        |
| TC-A06 | Access protected resource without token | GET `/users/profile` without auth header           | 401 Unauthorized                                                 | `@auth @security @negative @p1`     |
| TC-A07 | Logout clears session                   | POST `/logout`; then GET `/users/profile`          | Cookies cleared; subsequent request returns 401                  | `@auth @logout @p1 @smoke`          |
| TC-A08 | Session expiration – farmer (24h)       | Use token older than 24h                           | 401 session expired error                                        | `@auth @session @p1`                |
| TC-A09 | Session expiration – admin (1h)         | Use admin token older than 1h                      | 401 session expired error                                        | `@auth @session @admin @p1`         |
| TC-A10 | Rate limiting on login                  | POST `/login` repeatedly with bad credentials      | 429 Too Many Requests after threshold                            | `@auth @rate-limit @negative @p1`   |

---

### 4.2 User Profile

| ID     | Title                           | Steps                                      | Expected Result                           | Tags                        |
| ------ | ------------------------------- | ------------------------------------------ | ----------------------------------------- | --------------------------- |
| TC-U01 | Get own profile                 | GET `/users/profile` with valid token      | 200; returns current user data            | `@user @profile @p1 @smoke` |
| TC-U02 | Update own profile              | PUT `/users/profile` with new display name | 200; profile updated                      | `@user @profile @crud @p1`  |
| TC-U03 | Delete own account              | DELETE `/users/profile`                    | 200; account removed; session invalidated | `@user @profile @crud @p1`  |
| TC-U04 | Farmer cannot update other user | PUT `/users/{otherUserId}` as farmer       | 403 Forbidden                             | `@user @rbac @negative @p1` |

---

### 4.3 Farm Resource Management – Fields

| ID     | Title                        | Steps                                                 | Expected Result                           | Tags                                |
| ------ | ---------------------------- | ----------------------------------------------------- | ----------------------------------------- | ----------------------------------- |
| TC-F01 | Create a new field           | POST `/fields` with name and area                     | 201; field created and returned           | `@fields @crud @p1 @smoke`          |
| TC-F02 | List own fields              | GET `/fields`                                         | 200; list of fields owned by current user | `@fields @crud @p1`                 |
| TC-F03 | Update a field               | PUT `/fields/{id}` with new name/area                 | 200; field updated                        | `@fields @crud @p1`                 |
| TC-F04 | Delete an unassigned field   | DELETE `/fields/{id}` on field with no assignments    | 200; field removed                        | `@fields @crud @p1`                 |
| TC-F05 | Cannot delete assigned field | DELETE `/fields/{id}` on field with active assignment | 4xx; error about active assignment        | `@fields @validation @negative @p1` |

---

### 4.4 Farm Resource Management – Animals

| ID      | Title                       | Steps                                       | Expected Result                         | Tags                       |
| ------- | --------------------------- | ------------------------------------------- | --------------------------------------- | -------------------------- |
| TC-AN01 | Create an animal            | POST `/animals` with type, amount           | 201; animal record created              | `@animals @crud @p1`       |
| TC-AN02 | List own animals            | GET `/animals`                              | 200; returns user's animals             | `@animals @crud @p1`       |
| TC-AN03 | Assign animal to a field    | PUT `/animals/{id}` with `fieldId`          | 200; animal assigned to field           | `@animals @assignment @p1` |
| TC-AN04 | Update animal details       | PUT `/animals/{id}` with new amount         | 200; record updated                     | `@animals @crud @p1`       |
| TC-AN05 | Delete an unassigned animal | DELETE `/animals/{id}` on unassigned animal | 200; animal removed                     | `@animals @crud @p1`       |
| TC-AN06 | Get allowed animal types    | GET `/animals/types`                        | 200; returns list of valid animal types | `@animals @lookup @p1`     |

---

### 4.5 Farm Resource Management – Staff & Assignments

| ID     | Title                   | Steps                                          | Expected Result                     | Tags                     |
| ------ | ----------------------- | ---------------------------------------------- | ----------------------------------- | ------------------------ |
| TC-S01 | Create a staff member   | POST `/staff` with name and age                | 201; staff record created           | `@staff @crud @p1`       |
| TC-S02 | List own staff          | GET `/staff`                                   | 200; returns user's staff list      | `@staff @crud @p1`       |
| TC-S03 | Assign staff to a field | POST `/fields/assign` with staffId and fieldId | 200; assignment created             | `@staff @assignment @p1` |
| TC-S04 | List assignments        | GET `/assignments`                             | 200; returns all user's assignments | `@staff @assignment @p1` |
| TC-S05 | Delete an assignment    | DELETE `/assignments/{id}`                     | 200; assignment removed             | `@staff @assignment @p1` |
| TC-S06 | Update staff member     | PUT `/staff/{id}` with new details             | 200; staff record updated           | `@staff @crud @p1`       |
| TC-S07 | Delete a staff member   | DELETE `/staff/{id}`                           | 200; staff record removed           | `@staff @crud @p1`       |

---

### 4.6 Marketplace

| ID     | Title                             | Steps                                                                    | Expected Result                                                     | Tags                                   |
| ------ | --------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | -------------------------------------- |
| TC-M01 | Create offer for unassigned field | POST `/marketplace/offers` with unassigned fieldId and price             | 201; offer status = `active`                                        | `@marketplace @offer @p2`              |
| TC-M02 | Create offer for assigned field   | POST `/marketplace/offers` with assigned fieldId                         | Offer created with status = `unavailable`                           | `@marketplace @offer @validation @p2`  |
| TC-M03 | Browse all marketplace offers     | GET `/marketplace/offers`                                                | 200; list of offers returned                                        | `@marketplace @browse @p2`             |
| TC-M04 | Successful purchase of a field    | POST `/marketplace/buy`; buyer has sufficient funds; field is unassigned | 200; ownership transferred; offer status = `sold`; balances updated | `@marketplace @purchase @p2 @smoke`    |
| TC-M05 | Purchase with insufficient funds  | POST `/marketplace/buy` when buyer balance < offer price                 | 4xx; `Insufficient funds: overdraft is not allowed.`                | `@marketplace @purchase @negative @p2` |
| TC-M06 | Seller cannot buy own offer       | POST `/marketplace/buy` as the offer creator                             | 4xx; error returned                                                 | `@marketplace @purchase @negative @p2` |
| TC-M07 | Cancel an active offer            | DELETE `/marketplace/offers/{offerId}` as the offer owner                | 200; offer status = `cancelled`                                     | `@marketplace @offer @p2`              |
| TC-M08 | View own offers                   | GET `/marketplace/my-offers`                                             | 200; returns only the current user's offers                         | `@marketplace @offer @p2`              |
| TC-M09 | Marketplace transaction history   | GET `/marketplace/transactions`                                          | 200; returns completed transactions                                 | `@marketplace @transactions @p2`       |

---

### 4.7 Financial Operations

| ID       | Title                            | Steps                                                          | Expected Result                                               | Tags                                 |
| -------- | -------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| TC-FIN01 | View financial account           | GET `/financial/account`                                       | 200; returns balance and account info                         | `@financial @account @p2`            |
| TC-FIN02 | View transaction history         | GET `/financial/transactions`                                  | 200; list of income/expense transactions                      | `@financial @transactions @p2`       |
| TC-FIN03 | Get single transaction           | GET `/financial/transactions/{transactionId}`                  | 200; returns transaction details                              | `@financial @transactions @p2`       |
| TC-FIN04 | Transfer funds to another user   | POST `/financial/transfer` with valid target userId and amount | 200; sender balance decreases; recipient balance increases    | `@financial @transfer @p2 @smoke`    |
| TC-FIN05 | Transfer with insufficient funds | POST `/financial/transfer` with amount > sender balance        | 4xx; overdraft error                                          | `@financial @transfer @negative @p2` |
| TC-FIN06 | Balance updates after sale       | Complete a marketplace sale; check seller and buyer accounts   | Seller income transaction; buyer expense transaction recorded | `@financial @integration @p2`        |

---

### 4.8 Role-Based Access Control (RBAC)

| ID     | Title                                       | Steps                                       | Expected Result            | Tags                                 |
| ------ | ------------------------------------------- | ------------------------------------------- | -------------------------- | ------------------------------------ |
| TC-R01 | Farmer cannot access admin statistics       | GET `/users/statistics/all` as farmer       | 403 Forbidden              | `@rbac @authorization @negative @p1` |
| TC-R02 | Farmer cannot update another user's data    | PUT `/users/{otherId}` as farmer            | 403 Forbidden              | `@rbac @authorization @negative @p1` |
| TC-R03 | Farmer cannot access other user's farm data | GET another user's fields/animals as farmer | 403 or empty result        | `@rbac @authorization @negative @p1` |
| TC-R04 | Admin can view all user statistics          | GET `/users/statistics/all` as admin        | 200; all users' statistics | `@rbac @authorization @p1 @smoke`    |

---

### 4.9 System & Health

| ID       | Title            | Steps              | Expected Result                      | Tags                         |
| -------- | ---------------- | ------------------ | ------------------------------------ | ---------------------------- |
| TC-SYS01 | Ping check       | GET `/ping`        | 200; fast response                   | `@system @health @p4 @smoke` |
| TC-SYS02 | Health check     | GET `/healthcheck` | 200; system status = healthy         | `@system @health @p4`        |
| TC-SYS03 | Database status  | GET `/databases`   | 200; all databases online            | `@system @health @p4`        |
| TC-SYS04 | Application info | GET `/about`       | 200; version and build info returned | `@system @info @p4`          |

---

## 5. End-to-End Scenarios

### E2E-01: Register and Set Up Farm

**Tags:** `@e2e @onboarding @p1 @smoke`

1. Register a new user account.
2. Log in and verify redirect to `/profile.html`.
3. Create a field (name + area).
4. Add animals and assign them to the field.
5. Add staff and assign to the field.
6. Verify all resources appear in farm overview.

### E2E-02: Sell a Field on the Marketplace

**Tags:** `@e2e @marketplace @purchase @p2`

1. User A logs in; has an unassigned field.
2. User A creates a marketplace offer for the field.
3. User B logs in; browses marketplace and finds the offer.
4. User B purchases the offer (has sufficient balance).
5. Verify: field ownership transferred to User B; offer status = `sold`; balances updated for both users.

### E2E-03: Attempt Purchase with Insufficient Funds

**Tags:** `@e2e @marketplace @purchase @negative @p2`

1. User logs in; selects an offer costing more than their balance.
2. Initiates purchase.
3. Verify: system blocks transaction with "Insufficient funds" error.
4. Verify: offer status unchanged; balances unchanged.

---

## 6. Entry / Exit Criteria

**Entry:** Application running at `localhost:3000`; demo accounts accessible; Swagger available at `/swagger.html`.

**Exit:** All P1 test cases pass; no critical/blocker defects open.

---

## 7. Priority Levels

| Priority | Description                         |
| -------- | ----------------------------------- |
| P1       | Blocking – Auth, RBAC, core CRUD    |
| P2       | High – Marketplace, financial flows |
| P3       | Medium – Edge cases, error messages |
| P4       | Low – System/health endpoints       |
