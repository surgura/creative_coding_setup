# hydra-src docs
This document is AI generated so take it with a grain of salt.

## Overview

This script detects the active Hydra environment and extends the Hydra runtime with helpers for aspect ratio correction, masking, and source scaling. It is designed to work across the Hydra web editor, Atom Hydra, and custom Hydra embeddings.

The focus is predictable image and video handling across arbitrary canvas sizes.



## Source Helper Functions

### `srcMask(tex)`

Creates a source masked by a full screen rectangle.

Behavior
- Equivalent to `src(tex).mask(shape(4, 1, 0))`
- Prevents texture wrapping

Input
- `tex` any Hydra source or texture

Returns
- Masked Hydra source

Example
```js
srcMask(s0).out()
```

---

### `srcAbs(tex)`

Scales a source based on its absolute pixel dimensions relative to the canvas.

Behavior
- Preserves original pixel size
- Corrects distortion from non matching canvas aspect ratios

Input
- `tex` image or video texture

Returns
- Scaled Hydra source

Example
```js
srcAbs(s0).out()
```

Fallback
- If input is not a texture it falls back to `src(tex)`

---

### `srcAbsMask(tex)`

Same as `srcAbs` with an additional rectangular mask.

Use when
- Pixel accurate scaling is required without edge wrapping

Example
```js
srcAbsMask(s0).out()
```

---

### `srcRel(tex)`

Scales a source to fit within the canvas while preserving aspect ratio.

Behavior
- Letterboxes or pillarboxes as needed
- No cropping

Input
- `tex` image or video texture

Returns
- Aspect corrected Hydra source

Example
```js
srcRel(s0).out()
```

---

### `srcRelMask(tex)`

Same as `srcRel` with an added rectangular mask.

Use when
- Scaling media that must never repeat or wrap

Example
```js
srcRelMask(s0).out()
```

## Generator Prototype Extensions

The following methods are added to all visual generators such as `osc`, `noise`, `shape`, and `src`.

---

### `rotateRel(...args)`

Rotates a generator while compensating for non square canvas aspect ratios.

Behavior
- Temporarily rescales axes before and after rotation
- Prevents elliptical distortion

Example
```js
osc(10, 0.1, 1).rotateRel(0.2).out()
```

---

### `correctScaleRel(source)`

Applies relative aspect ratio correction based on an external texture.

Behavior
- Scales the current generator to match the aspect ratio of `source`
- Useful when mixing procedural visuals with image or video inputs

Input
- `source` image or video texture

Example
```js
osc().correctScaleRel(s0).out()
```

Fallback
- If the input is not a texture it returns `src(source)`

---

### `noWrap(sm = 0)`

Prevents edge wrapping by masking the generator with a rectangle.

Behavior
- Applies a rectangular mask
- `sm` controls mask smoothing

Example
```js
src(s0).noWrap().out()
```

