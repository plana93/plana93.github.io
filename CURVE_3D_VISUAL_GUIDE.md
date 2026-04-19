# 🎨 Quick Visual Reference — 3D Curve Layer System

## Layer Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    HERO COMPOSITION                          │
│                                                              │
│  ┌──────────────────────────────────────┐                   │
│  │         V I S I O N                  │  ← VISION text    │
│  │        ╱         ╲                   │                   │
│  │    L0 ←          → L1                │                   │
│  │   (back)        (front)              │                   │
│  └──────────────────────────────────────┘                   │
│         │                                                    │
│         │  ............ into              ← separator       │
│         │                                                    │
│         │    ┌──────────┐                                   │
│         │    │  PHOTO   │                                   │
│         │    │          │  ← L2 wraps around                │
│         └────┤          │                                   │
│              │          │                                   │
│              └──────────┘                                   │
│                                                              │
│         ┌─────────────────────────┐                         │
│         │   INTELLIGENCE          │  ← L3 on top            │
│         └─────────────────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer Properties Comparison

| Property          | L0 (Back)      | L1 (Front)     | L2 (Mid)       | L3 (Top)       |
|-------------------|----------------|----------------|----------------|----------------|
| **Z-Index**       | 0              | 2              | 4              | 6              |
| **Stroke Width**  | 16px           | 20px           | 17px           | 22px           |
| **Opacity**       | 0.72           | 0.92           | 0.80           | 0.95           |
| **Brightness**    | 0.75 (darker)  | 1.1 (lighter)  | 0.95 (neutral) | 1.15 (brightest) |
| **Saturation**    | 0.7 (muted)    | 1.2 (vivid)    | 0.9 (slight)   | 1.3 (max)      |
| **Shadow Blur**   | 3px            | 8px            | 6px            | 14px           |
| **Shadow Offset** | 1-2px          | 4px            | 3px            | 6px            |
| **Glow Size**     | 4px            | 12px           | 8px            | 16px           |
| **Animation**     | —              | breathe (6s)   | —              | breathe (5s)   |

---

## Color Gradient Progression

### Light Mode
```
L0: #1a1b6e ━━━━━━━━━━━━━━━━━━━━━┓
                                  ┃
L1: #6d28d9 ━━━━━━━━━━━━━━━━━━━━━┫  gradient flow
                                  ┃
L2: #c026d3 ━━━━━━━━━━━━━━━━━━━━━┫
                                  ┃
L3: #f43f82 ━━━━━━━━━━━━━━━━━━━━━┛
```

### Dark Mode
```
L0: #003d22 ━━━━━━━━━━━━━━━━━━━━━┓
                                  ┃
L1: #00994d ━━━━━━━━━━━━━━━━━━━━━┫  emerald to cyan
                                  ┃
L2: #00ff88 ━━━━━━━━━━━━━━━━━━━━━┫
                                  ┃
L3: #7fffd4 ━━━━━━━━━━━━━━━━━━━━━┛
```

---

## Clipping Zones (Visual Map)

```
┌─────────────────────────────────────────┐  0%
│ ┌────────────┬──────────────┐           │
│ │    L0      │     L1       │           │  ← top 46%
│ │  (left)    │   (right)    │           │
│ └────────────┴──────────────┘           │
│                                          │  46%
├──────────────────────────────────────────┤
│              L2 starts here              │
│      ┌────────┐                          │  ← 42%
│      │ photo  │  ..... into              │
│      │        │                          │
│      └────────┘                          │
│                                          │
├──────────────────────────────────────────┤  72%
│         ┌──────────────────┐            │
│         │  INTELLIGENCE    │  ← L3      │
│         └──────────────────┘            │
└─────────────────────────────────────────┘  100%
```

**Clipping formulas:**
- L0: `inset(0 50% 54% 0)` → top-left quadrant
- L1: `inset(0 0 54% 50%)` → top-right quadrant  
- L2: `inset(42% 0 0 26%)` → middle-bottom, left-offset
- L3: `inset(72% 0 0 0)` → bottom strip

---

## Visual Effect Breakdown

### 🔍 Layer L0 (Behind VISION left)
```
Appearance:
  ◆ Darker, desaturated (in shadow)
  ◆ Thinner stroke (further away)
  ◆ Minimal glow
  
Perception:
  → User sees it "behind" the letters V-I-S
  → Depth cue: less prominent = more distant
```

### 🔍 Layer L1 (In front of VISION right)
```
Appearance:
  ◆ Bright, saturated (in light)
  ◆ Thick stroke (closer to viewer)
  ◆ Strong drop shadow on letters
  ◆ Pulsing glow (breathing animation)
  
Perception:
  → User sees it "in front" of letters I-O-N
  → Depth cue: casts shadow = physically above
```

### 🔍 Layer L2 (Around photo, behind "into")
```
Appearance:
  ◆ Medium brightness (transition zone)
  ◆ Tapered stroke (squeezing through gap)
  ◆ Gradient overlay (twist effect)
  
Perception:
  → Weaves around photo edge
  → Disappears behind "into" text
  → Suggests 3D navigation through space
```

### 🔍 Layer L3 (Over INTELLIGENCE)
```
Appearance:
  ◆ Maximum brightness & saturation
  ◆ Thickest stroke (closest to viewer)
  ◆ Dramatic shadow cast on green block
  ◆ Specular highlights (top/bottom)
  ◆ Halo glow around curve
  
Perception:
  → Clearly "in front" of everything
  → Strong visual presence
  → Definitive depth hierarchy
```

---

## Hover State Changes

```
DEFAULT:
  L0: 16px / 0.72 opacity
  L1: 20px / 0.92 opacity
  L2: 17px / 0.80 opacity
  L3: 22px / 0.95 opacity

ON HOVER:
  L0: 14px / 0.60 opacity  ← recedes
  L1: 22px / 1.00 opacity  ← advances
  L2: 17px / 0.80 opacity  ← unchanged
  L3: 24px / 1.00 opacity  ← advances

Effect:
  → Foreground layers "pop out"
  → Background layers "fade back"
  → Exaggerated depth perception
```

---

## Parallax Movement (on mouse move)

```
Movement strength ∝ z-index:

L0 (z:0): ±0.0px  (static)
L1 (z:2): ±1.0px  (subtle)
L2 (z:4): ±2.0px  (medium)
L3 (z:6): ±3.0px  (pronounced)

Effect:
  → Closer layers track cursor more
  → Creates "3D scene" illusion
  → Reinforces depth hierarchy
```

---

## Debug Mode Visualization

When `debugMode: true` in JS config:

```
┌─────────────────────────────────────────┐
│  [RED OVERLAY] = occluded region        │
│  [TRANSPARENT] = visible curve segment  │
│                                          │
│  ██████░░░░░░░░░░░░██████░░░░░          │
│   ^                  ^                  │
│   └─ hidden behind   └─ hidden behind   │
│      "V" letter          "O" letter     │
└─────────────────────────────────────────┘
```

---

## Performance Considerations

| Feature                  | Performance Impact | When to Use          |
|--------------------------|-------------------|----------------------|
| Static clipping          | ✅ Negligible     | Always               |
| Breathing animation      | ✅ Low            | Always               |
| Hover depth change       | ✅ Low            | Always               |
| Mouse parallax           | ⚠️ Medium         | Desktop only         |
| Dynamic occlusion (JS)   | ⚠️ Medium-High    | Optional enhancement |
| Pixel-perfect detection  | ❌ High           | Debug/polish only    |

---

## Implementation Checklist

### CSS (Required)
- [x] 4 layer system with z-index stack
- [x] Gradient color progression
- [x] Variable stroke width
- [x] Multi-layer drop shadows
- [x] Breathing animation keyframes
- [x] Hover state transitions
- [x] Dark mode color inversion

### HTML/SVG (Required)
- [x] 4 duplicate SVG curve elements
- [x] Each with unique class (l0, l1, l2, l3)
- [x] Gradient definitions for body/spine

### JavaScript (Optional)
- [ ] Negative space analyzer
- [ ] Dynamic occlusion renderer
- [ ] Mouse parallax enhancer
- [ ] Resize/scroll recalculation

---

## Quick Test Commands

```bash
# Check if all layers are rendering
document.querySelectorAll('.mp-hero-curve').length
# Should return: 4

# Toggle debug mode
CONFIG.debugMode = true;

# Check z-index stack
Array.from(document.querySelectorAll('.mp-hero-curve')).map(el => 
  getComputedStyle(el).zIndex
);
# Should return: ["0", "2", "4", "6"]

# Measure stroke widths
Array.from(document.querySelectorAll('.mp-hero-curve__body')).map(el => 
  getComputedStyle(el).strokeWidth
);
# Should return: ["16px", "20px", "17px", "22px"]
```

---

## Troubleshooting

| Issue                        | Solution                                   |
|------------------------------|--------------------------------------------|
| Curves not stacking properly | Check z-index values in CSS                |
| Clipping not working         | Verify `clip-path` inset values            |
| No depth perception          | Ensure drop-shadow filters are applied     |
| Animation stuttering         | Reduce breathing frequency or disable      |
| Dark mode colors wrong       | Check CSS variable overrides               |
| JS occlusion not working     | Verify script is loaded after DOM ready    |

---

**Last Updated**: 2026-04-18  
**Version**: 2.0 — Visual Reference Guide
