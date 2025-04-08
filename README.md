# Bakery Text

A CUI-based bakery management game focused on inventory control, maintenance, security, hygiene, and cost optimisation.

## General Commands

- `help` : Display available commands for the current section.
- `ls`   : Observe the current state.
- `rest` : Allow employees to rest and recover from fatigue.

## NIGIWAI

- A 5-star rating system that affects demand and pricing:
  - ⭐️ 5.0: High demand, high prices, but expensive ingredients.
  - ⭐️ 0.0: Low demand, low prices, but cheap ingredients.
- NIGIWAI is influenced by:
  - ✅ Proper inventory & waste management
  - ✅ Effective intruder control & cleanliness
  - ✅ Stable production & high sales
  - ❌ Overcrowding, high waste rates
  - ❌ Persistent intruder presence (rats, thieves)
  - ❌ Customer complaints or refunds

## Sections & Commands

| ID  | Mode          | Abbr | Role                             |
| --- | ------------- | ---- | -------------------------------- |
| 00  | Purchasing    | PS   | Order and manage materials       |
| 01  | Pantry        | PN   | Storage & shelf life tracking    |
| 02  | Mixing        | MX   | Monitor ingredient balance       |
| 03  | Cooling       | CL   | Manage storage capacity          |
| 04  | Shaping       | SH   | Manage efficiency & layout       |
| 05  | Baking        | BK   | Maintain oven performance        |
| 06  | Packaging     | PK   | Ensure quality control           |
| 07  | Sales Front   | SF   | Optimise pricing & sales         |
| 08  | Waste Station | WS   | Handle waste & recycling         |
| 09  | Utilities     | UT   | Manage water, electricity, gas   |

## Troubles by Department

- **PS (Purchasing)**: Price surges, fraud, delivery delays (transport issues, bad weather)
- **PN (Pantry)**: Spoilage, pest intrusion
- **MX/CL/SH/BK (Mixing, Cooling, Shaping, Baking)**: Equipment failure, workplace accidents
- **BK (Baking)**: Temperature anomalies, gas leaks
- **PK (Packaging)**: Foreign object contamination
- **SF (Sales Front)**: Complainer incidents, robbery
- **WS (Waste Station)**: Overloaded waste
- **UT (Utilities)**: Water leaks, electrical leaks

## Fatigue Management

- Employees do not show numerical fatigue levels. Instead, their status is displayed in logs:
  - 😊 “Looking energetic.”
  - 😐 “Seems a bit tired.”
  - 😫 “Moving slower than usual.”
  - 💀 “Eyes look lifeless…”
- Use `rest` to prevent overwork. However, excessive resting will reduce efficiency and impact the score.

## Intruders & Security

Intruders cause economic losses and hygiene risks. Monitor their presence via the **Event Log (EV)** and respond promptly.

| Type                          | Behaviour                                            | Counteraction                                              |
| ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| **Nezumi (Rats)** 🐭         | Consume stock, increase hygiene risk.              | `trap` (set traps), `sanitize` (clean infected areas)       |
| **Dorobō (Thieves)** 🏴‍☠️      | Steal money from the register.                     | `guard` (increase security), `alarm` (set up anti-theft system) |
| **Kureimā (Complainers)** 😡  | Demand refunds, lowering NIGIWAI.                  | `compensate` (settle issue), `policy` (set refund rules)     |

## Game Over Conditions

1. Overwork
  Employees collapsing due to excessive fatigue → **Game Over**.

2. Unresolved Troubles
  If 4 departmental troubles remain unresolved, the bakery's operation becomes unsustainable → **Game Over**.

---

## Bread Recipes & Pricing (Ingredients per Piece, Country of Origin, and Unit Price)

| Type of Bread   | Country of Origin | Flour (g) | Yeast (g) | Salt (g) | Butter (g) | Sugar (g) | Milk (g) | Red Bean Paste (g) | Malt (g) | Unit Price (¥) |
| --------------- | ----------------- | --------: | --------: | -------: | ---------: | --------: | -------: | -----------------: | -------: | -------------: |
| Croissant       | Austria           | 41.7      | 0.8       | 0.8      | 25.0       | 4.2       | 8.3      | 0.0                | 0.0      |          160.65 |
| Anpan           | Japan             | 50.0      | 0.9       | 1.0      | 3.8        | 6.3       | 12.5     | 25.0               | 0.0      |          139.00 |
| Baguette        | France            | 500.0     | 5.0       | 10.0     | 0.0        | 0.0       | 0.0      | 0.0                | 10.0     |          192.78 |
| Bagel           | Poland            | 62.5      | 0.9       | 1.3      | 0.0        | 1.3       | 0.0      | 0.0                | 1.9      |          114.24 |
| Ciabatta        | Italy             | 400.0     | 4.0       | 8.0      | 0.0        | 0.0       | 0.0      | 0.0                | 0.0      |          240.98 |
| Naan            | India             | 60.0      | 1.0       | 0.5      | 2.0        | 3.0       | 10.0     | 0.0                | 0.0      |           68.80 |
