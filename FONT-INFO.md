# Font Implementation Notes

## Current Fonts

### Names Font (Larissa & Bruno)
**Invitation uses:** Sloop Script Pro  
**Current implementation:** Sloop Script (local font file) ✓

Font file location: `src/Assets/fonts/Sloop-ScriptThree.ttf`

Fallback fonts if Sloop Script fails to load:
- **Allura** (Google Fonts alternative)
- **Alex Brush** (Google Fonts alternative)

## How to Use Fonts from Adobe Fonts (Step-by-Step)

### Step 1: Create an Adobe Account
1. Go to [fonts.adobe.com](https://fonts.adobe.com)
2. Sign up for a free Adobe account (or sign in if you have one)
3. Note: Adobe Fonts is free with an Adobe ID, no paid subscription needed for basic use

### Step 2: Find and Add Your Font
1. Search for "Sloop Script" in the Adobe Fonts search bar
2. Click on the font you want to use
3. Click the **"Activate fonts"** or **"Add to Web Project"** button
4. If prompted, create a new Web Project (give it a name like "Wedding Website")

### Step 3: Get Your Project Code
1. Go to your **"Web Projects"** page (click your profile → Web Projects)
2. Click on your project to view details
3. You'll see an embed code that looks like this:
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/abc1234.css">
   ```
   OR
   ```css
   @import url("https://use.typekit.net/abc1234.css");
   ```

### Step 4: Add to Your Project
**Recommended:** Add to `src/index.css` (lines 3-4):
1. Open `src/index.css`
2. Replace the commented section on lines 3-4 with your Adobe Fonts import
3. Your project link will look like: `@import url('https://use.typekit.net/YOUR_ID.css');`

**Alternative:** Add to `index.html` head section:
```html
<head>
  <link rel="stylesheet" href="https://use.typekit.net/YOUR_PROJECT_ID.css">
</head>
```

### Step 5: Get the Font Family Name
1. In your Adobe Fonts web project, look for the **font-family** name
2. For Sloop Script Pro, it should be: `'sloop-script-pro'`
3. This is already configured in `src/index.css`:
   ```css
   --font-script: 'sloop-script-pro', 'Allura', 'Alex Brush', cursive;
   ```

### Example: Complete Setup
If your Adobe Fonts project ID is `abc1234`:

**In `src/index.css`:**
```css
@import url('https://use.typekit.net/abc1234.css');

:root {
  --font-script: 'sloop-script-pro', 'Allura', 'Alex Brush', cursive;
}
```

**Just replace line 3-4 with your Adobe Fonts project link!**

### Heading Font (Dates, Locations, Titles)
**Invitation uses:** Cormorant Garamond  
**Current implementation:** Cormorant Garamond ✓ (exact match)

### Body Text
**Current implementation:** Lato (clean, readable sans-serif)

## To Use Sloop Script Pro (Commercial Font)

If you have purchased Sloop Script Pro, you can add it to your project:

1. Place the font files in `src/Assets/fonts/`
2. Update `src/index.css`:

```css
@font-face {
  font-family: 'Sloop Script Pro';
  src: url('./Assets/fonts/SloopScriptPro.woff2') format('woff2'),
       url('./Assets/fonts/SloopScriptPro.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
```

3. Update the font variable:
```css
--font-script: 'Sloop Script Pro', 'Allura', 'Alex Brush', cursive;
```

## Color Scheme Applied

- **Primary/Accent:** `#7a0000` (deep red from "AGOSTO")
- **Background:** `#ffffff` (white)
- **Text:** Gray tones for elegance
