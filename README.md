# Bakery Text

A CUI-based bakery management game focused on inventory control, maintenance, security, hygiene, and cost optimization.

## General Commands

- `help` : Display available commands for the current section.
- `ls`   : Observe the current state.
- `log`  : Check event logs for intrusions, breakdowns, or hygiene issues.
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

| ID  | Mode           | Abbr | Role                           | Management Commands (Admin Actions) | Title |
| --- | -------------- | ---- | ------------------------------ | ----------------------------------- | ----- |
| 00  | Purchasing     | PS   | Order and manage materials     | `order` (bulk purchase), `quote` (check price trends) | 調達 |
| 01  | Pantry         | PN   | Storage & shelf life tracking  | `rotate` (FIFO check), `audit` (spoilage check) | 保管 |
| 02  | Mixing         | MX   | Monitor ingredient balance     | `adjust` (balance supply chain), `halt` (stop overproduction) | 混錬 |
| 03  | Cooling        | CL   | Manage storage capacity        | `temp` (set cooling power), `expand` (upgrade storage) | 冷却 |
| 04  | Shaping        | SH   | Manage efficiency & layout     | `layout` (optimize space), `inspect` (workflow check) | 成型 |
| 05  | Baking         | BK   | Maintain oven performance      | `repair` (fix issues), `fuel` (adjust power usage) | 焼成 |
| 06  | Packaging      | PK   | Ensure quality control         | `qc` (inspect batches), `speed` (adjust packaging rate) | 検品 |
| 07  | Sales Front    | SF   | Optimize pricing & sales       | `price` (adjust rates), `promo` (trigger discounts) | 販売 |
| 08  | Waste Station  | WS   | Handle waste & recycling       | `dispose` (clear expired goods), `recycle` (reduce costs) | 廃棄 |
| 09  | Utilities      | UT   | Manage water, electricity, gas | `fix` (repair leaks), `budget` (set cost limits) | 設備 |

## Fatigue Management

- Employees do not show numerical fatigue levels. Instead, their status is displayed in logs:
  - 😊 “Looking energetic.”
  - 😐 “Seems a bit tired.”
  - 😫 “Moving slower than usual.”
  - 💀 “Eyes look lifeless…”
- Use `rest` to prevent overwork. However, excessive resting will reduce efficiency and impact the score.

## Intruders & Security

Intruders cause economic losses and hygiene risks. Monitor their presence via the **Event Log (EV)** and respond promptly.

| Type      | Behavior | Counteraction |
|----------|----------|--------------|
| **Nezumi (Rats)** 🐭 | Consume stock, increase hygiene risk. | `trap` (set traps), `sanitize` (clean infected areas) |
| **Dorobō (Thieves)** 🏴‍☠️ | Steal money from the register. | `guard` (increase security), `alarm` (set up anti-theft system) |
| **Kureimā (Complainers)** 😡 | Demand refunds, lowering NIGIWAI. | `compensate` (settle issue), `policy` (set refund rules) |

## Game Over Conditions

1. **Overwork**  
   Employees collapsing due to excessive fatigue → **Game Over**.

2. **Health Department Violation**  
   Failing to maintain hygiene (e.g., rats present too long) triggers an inspection → **Game Over**.

---

Stay sharp, manage resources wisely, and keep your bakery running at peak efficiency! 🍞✨
