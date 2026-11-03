import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Sprite Sheet Constants
const COLS = 15;
const ROWS = 7;
const CELL_W = 240;
const CELL_H = 324;
const TOTAL_W = COLS * CELL_W; // 3600
const TOTAL_H = ROWS * CELL_H; // 2268
const TOTAL_CELLS = COLS * ROWS; // 105

// Color Palettes
const SKIN_TONES = [
  '#FFDFC4', '#F8D2B0', '#F0C294', '#DFA375', '#B87A4B', '#8C532B', '#5A3319'
];

const HAIR_COLORS = [
  '#181514', '#2B1E16', '#4A3324', '#664228', '#8A5D3B', '#B8860B', '#9CA3AF', '#D1D5DB'
];

const SUIT_COLORS = [
  '#1E2229', '#2C3440', '#1C2738', '#253549', '#374151', '#4B5563', '#2F3E46',
  '#1B263B', '#3B3247', '#4A3B32', '#6B5848', '#2D3748', '#1F2937', '#111827'
];

const SHIRT_COLORS = [
  '#FFFFFF', '#F0F9FF', '#E0F2FE', '#F3EDFF', '#EDE9FE', '#F8FAFC', '#E2E8F0', '#DBEAFE'
];

const TIE_COLORS = [
  '#7546C8', '#8B5CF6', '#991B1B', '#1E3A8A', '#0F766E', '#C2410C', '#4338CA', '#374151'
];

const TROUSER_COLORS = [
  '#1E2229', '#2C3440', '#1C2738', '#374151', '#4B5563', '#1F2937', '#334155', '#1E293B', '#64748B'
];

const SHOE_COLORS = [
  '#111111', '#1C1917', '#292524', '#44403C', '#3E2723', '#2B1810'
];

const STROKE = '#221F28';
const STROKE_W = 3.0;

function seededRandom(seed) {
  const x = Math.sin(seed * 9999 + 123.45) * 10000;
  return x - Math.floor(x);
}

// Generate single character SVG markup inside a 240 x 324 bounding box
function generateCharacter(index) {
  const rand = (n) => seededRandom(index * 47 + n);
  
  const skin = SKIN_TONES[Math.floor(rand(1) * SKIN_TONES.length)];
  const hair = HAIR_COLORS[Math.floor(rand(2) * HAIR_COLORS.length)];
  const suit = SUIT_COLORS[Math.floor(rand(3) * SUIT_COLORS.length)];
  const shirt = SHIRT_COLORS[Math.floor(rand(4) * SHIRT_COLORS.length)];
  const tie = TIE_COLORS[Math.floor(rand(5) * TIE_COLORS.length)];
  const trouser = rand(6) > 0.4 ? suit : TROUSER_COLORS[Math.floor(rand(6) * TROUSER_COLORS.length)];
  const shoe = SHOE_COLORS[Math.floor(rand(7) * SHOE_COLORS.length)];

  // Character Archetype: 0: Men's Business Suit, 1: Women's Pant Suit, 2: Blazer & Chinos,
  // 3: Button-down Shirt & Slacks, 4: Professional Dress / Skirt, 5: Cardigan / Executive Casual
  const archetype = Math.floor(rand(8) * 6);
  // Stride animation phase (0: Left forward, 1: Right forward, 2: Mid-stride walking, 3: Gentle step)
  const stride = Math.floor(rand(9) * 4);
  const hairStyle = Math.floor(rand(10) * 6);
  const hasGlasses = rand(11) > 0.65;
  const hasBeard = (archetype === 0 || archetype === 2 || archetype === 3) && rand(12) > 0.65;
  const hasBadge = rand(13) > 0.45; // Linq conference attendee lanyard badge!
  const hasBriefcase = rand(14) > 0.55;
  const hasFolder = !hasBriefcase && rand(15) > 0.5;

  const cx = 120; // center X
  const groundY = 302; // feet base Y
  const headY = 62;
  const headR = 19;
  const neckY = headY + headR;
  const shoulderY = neckY + 12;
  const waistY = 175;
  const crotchY = 192;

  let bodySvg = '';

  // 1. LEGS & SHOES (Calculated based on stride)
  let lFootX = cx - 18, lFootY = groundY;
  let rFootX = cx + 18, rFootY = groundY;
  let lKneeX = cx - 12, lKneeY = 245;
  let rKneeX = cx + 12, rKneeY = 245;

  if (stride === 0) {
    // Left forward, Right trailing
    lFootX = cx - 34; lFootY = groundY - 4;
    rFootX = cx + 28; rFootY = groundY;
    lKneeX = cx - 22; lKneeY = 242;
    rKneeX = cx + 18; rKneeY = 246;
  } else if (stride === 1) {
    // Right forward, Left trailing
    lFootX = cx - 28; lFootY = groundY;
    rFootX = cx + 34; rFootY = groundY - 4;
    lKneeX = cx - 18; lKneeY = 246;
    rKneeX = cx + 22; rKneeY = 242;
  } else if (stride === 2) {
    // Dynamic mid-stride
    lFootX = cx - 22; lFootY = groundY - 2;
    rFootX = cx + 22; rFootY = groundY - 2;
    lKneeX = cx - 15; lKneeY = 244;
    rKneeX = cx + 15; rKneeY = 244;
  }

  // Draw Legs based on outfit archetype
  if (archetype === 4 && rand(16) > 0.3) {
    // Knee-length business skirt / dress
    const skirtBottom = 232;
    // Bare legs / tights
    const tightsColor = rand(17) > 0.5 ? '#1E1B24' : skin;
    bodySvg += `
      <!-- Bare Legs / Tights -->
      <path d="M ${cx - 16} ${skirtBottom} L ${lKneeX} ${lKneeY} L ${lFootX} ${lFootY}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linecap="round" fill="none"/>
      <path d="M ${cx + 16} ${skirtBottom} L ${rKneeX} ${rKneeY} L ${rFootX} ${rFootY}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linecap="round" fill="none"/>
      <!-- Dress Shoes / Heels -->
      <path d="M ${lFootX - 10} ${lFootY} L ${lFootX + 10} ${lFootY} L ${lFootX + 8} ${lFootY - 6} L ${lFootX - 8} ${lFootY - 6} Z" fill="${shoe}" stroke="${STROKE}" stroke-width="2"/>
      <path d="M ${rFootX - 10} ${rFootY} L ${rFootX + 10} ${rFootY} L ${rFootX + 8} ${rFootY - 6} L ${rFootX - 8} ${rFootY - 6} Z" fill="${shoe}" stroke="${STROKE}" stroke-width="2"/>
      <!-- Skirt Body -->
      <path d="M ${cx - 24} ${waistY} L ${cx + 24} ${waistY} L ${cx + 30} ${skirtBottom} L ${cx - 30} ${skirtBottom} Z" fill="${trouser}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
    `;
  } else {
    // Tailored Trousers / Slacks
    bodySvg += `
      <!-- Trousers Left Leg -->
      <path d="M ${cx - 26} ${waistY} L ${cx - 4} ${crotchY} L ${lFootX + 10} ${lFootY - 4} L ${lFootX - 12} ${lFootY - 4} L ${cx - 32} ${waistY} Z" fill="${trouser}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <!-- Trousers Right Leg -->
      <path d="M ${cx + 26} ${waistY} L ${cx + 4} ${crotchY} L ${rFootX + 12} ${rFootY - 4} L ${rFootX - 10} ${rFootY - 4} L ${cx + 32} ${waistY} Z" fill="${trouser}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <!-- Formal Leather Shoes -->
      <path d="M ${lFootX - 16} ${lFootY} Q ${lFootX + 4} ${lFootY + 2} ${lFootX + 16} ${lFootY} L ${lFootX + 14} ${lFootY - 8} L ${lFootX - 14} ${lFootY - 8} Z" fill="${shoe}" stroke="${STROKE}" stroke-width="2"/>
      <path d="M ${rFootX - 16} ${rFootY} Q ${rFootX + 4} ${rFootY + 2} ${rFootX + 16} ${rFootY} L ${rFootX + 14} ${rFootY - 8} L ${rFootX - 14} ${rFootY - 8} Z" fill="${shoe}" stroke="${STROKE}" stroke-width="2"/>
    `;
  }

  // 2. TORSO & CLOTHING
  const torsoTopW = (archetype === 1 || archetype === 4) ? 38 : 46;
  const torsoWaistW = (archetype === 1 || archetype === 4) ? 26 : 34;

  if (archetype === 0 || archetype === 2) {
    // Business Suit / Blazer with Lapels and Shirt
    bodySvg += `
      <!-- Shirt Base -->
      <polygon points="${cx - torsoTopW + 4},${shoulderY} ${cx + torsoTopW - 4},${shoulderY} ${cx + torsoWaistW},${waistY} ${cx - torsoWaistW},${waistY}" fill="${shirt}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Neck Tie -->
      <polygon points="${cx - 4},${shoulderY + 2} ${cx + 4},${shoulderY + 2} ${cx + 6},${shoulderY + 38} ${cx},${shoulderY + 54} ${cx - 6},${shoulderY + 38}" fill="${tie}" stroke="${STROKE}" stroke-width="1.8"/>
      <!-- Suit Jacket Body -->
      <path d="M ${cx - torsoTopW} ${shoulderY} L ${cx - 8} ${shoulderY + 6} L ${cx - 10} ${waistY + 12} L ${cx - torsoWaistW - 4} ${waistY + 12} Z" fill="${suit}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <path d="M ${cx + torsoTopW} ${shoulderY} L ${cx + 8} ${shoulderY + 6} L ${cx + 10} ${waistY + 12} L ${cx + torsoWaistW + 4} ${waistY + 12} Z" fill="${suit}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <!-- Suit Lapels -->
      <path d="M ${cx - 18} ${shoulderY} L ${cx - 28} ${shoulderY + 24} L ${cx - 10} ${shoulderY + 48} L ${cx - 4} ${shoulderY + 44} Z" fill="${suit}" stroke="${STROKE}" stroke-width="1.8"/>
      <path d="M ${cx + 18} ${shoulderY} L ${cx + 28} ${shoulderY + 24} L ${cx + 10} ${shoulderY + 48} L ${cx + 4} ${shoulderY + 44} Z" fill="${suit}" stroke="${STROKE}" stroke-width="1.8"/>
      <!-- Jacket Button -->
      <circle cx="${cx}" cy="${shoulderY + 58}" r="2.2" fill="#1A1820"/>
    `;
  } else if (archetype === 1) {
    // Women's Tailored Pantsuit / Blazer
    bodySvg += `
      <!-- Silk Blouse / Top -->
      <polygon points="${cx - torsoTopW + 2},${shoulderY} ${cx + torsoTopW - 2},${shoulderY} ${cx + torsoWaistW},${waistY} ${cx - torsoWaistW},${waistY}" fill="${shirt}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- V-Neck Neckline -->
      <path d="M ${cx - 12} ${shoulderY} L ${cx} ${shoulderY + 22} L ${cx + 12} ${shoulderY} Z" fill="${skin}"/>
      <!-- Tailored Blazer -->
      <path d="M ${cx - torsoTopW} ${shoulderY} L ${cx - 6} ${shoulderY + 10} L ${cx - 8} ${waistY + 14} L ${cx - torsoWaistW - 2} ${waistY + 14} Z" fill="${suit}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <path d="M ${cx + torsoTopW} ${shoulderY} L ${cx + 6} ${shoulderY + 10} L ${cx + 8} ${waistY + 14} L ${cx + torsoWaistW + 2} ${waistY + 14} Z" fill="${suit}" stroke="${STROKE}" stroke-width="${STROKE_W}" stroke-linejoin="round"/>
      <!-- Gold / Silver Accent Button -->
      <circle cx="${cx}" cy="${shoulderY + 48}" r="2" fill="#E2E8F0" stroke="#334155" stroke-width="0.8"/>
    `;
  } else if (archetype === 3) {
    // Formal Office Shirt with Slacks & Belt
    bodySvg += `
      <!-- Crisp Button-Down Shirt -->
      <polygon points="${cx - torsoTopW},${shoulderY} ${cx + torsoTopW},${shoulderY} ${cx + torsoWaistW},${waistY} ${cx - torsoWaistW},${waistY}" fill="${shirt}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Placket and Buttons -->
      <line x1="${cx}" y1="${shoulderY + 10}" x2="${cx}" y2="${waistY}" stroke="${STROKE}" stroke-width="1.5" stroke-dasharray="3 7"/>
      <!-- Collar -->
      <path d="M ${cx - 12} ${shoulderY} L ${cx - 16} ${shoulderY + 14} L ${cx - 2} ${shoulderY + 10} Z" fill="${shirt}" stroke="${STROKE}" stroke-width="1.8"/>
      <path d="M ${cx + 12} ${shoulderY} L ${cx + 16} ${shoulderY + 14} L ${cx + 2} ${shoulderY + 10} Z" fill="${shirt}" stroke="${STROKE}" stroke-width="1.8"/>
      <!-- Optional Tie -->
      ${rand(18) > 0.4 ? `<polygon points="${cx - 4},${shoulderY + 8} ${cx + 4},${shoulderY + 8} ${cx + 5},${shoulderY + 44} ${cx},${shoulderY + 54} ${cx - 5},${shoulderY + 44}" fill="${tie}" stroke="${STROKE}" stroke-width="1.6"/>` : ''}
      <!-- Leather Belt & Buckle -->
      <rect x="${cx - torsoWaistW - 2}" y="${waistY - 4}" width="${torsoWaistW * 2 + 4}" height="7" rx="1.5" fill="#1C1917" stroke="${STROKE}" stroke-width="1.6"/>
      <rect x="${cx - 5}" y="${waistY - 5}" width="10" height="9" rx="1" fill="#E2E8F0" stroke="${STROKE}" stroke-width="1.2"/>
    `;
  } else if (archetype === 4) {
    // Business Dress / Shift Dress with Belt
    bodySvg += `
      <!-- Dress Torso -->
      <polygon points="${cx - torsoTopW},${shoulderY} ${cx + torsoTopW},${shoulderY} ${cx + torsoWaistW},${waistY} ${cx - torsoWaistW},${waistY}" fill="${trouser}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Round or V Collar -->
      <path d="M ${cx - 10} ${shoulderY} Q ${cx} ${shoulderY + 14} ${cx + 10} ${shoulderY}" stroke="${STROKE}" stroke-width="2" fill="${skin}"/>
      <!-- Slim Waist Belt -->
      <rect x="${cx - torsoWaistW}" y="${waistY - 5}" width="${torsoWaistW * 2}" height="6" rx="2" fill="#7546C8" stroke="${STROKE}" stroke-width="1.4"/>
    `;
  } else {
    // Executive Cardigan / Smart Casual Sweater
    bodySvg += `
      <!-- Fine Knit Sweater -->
      <polygon points="${cx - torsoTopW},${shoulderY} ${cx + torsoTopW},${shoulderY} ${cx + torsoWaistW + 2},${waistY + 4} ${cx - torsoWaistW - 2},${waistY + 4}" fill="${suit}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Collared Shirt Visible at Neck -->
      <path d="M ${cx - 14} ${shoulderY} L ${cx} ${shoulderY + 16} L ${cx + 14} ${shoulderY} Z" fill="${shirt}" stroke="${STROKE}" stroke-width="1.8"/>
      <polygon points="${cx - 12},${shoulderY} ${cx - 16},${shoulderY + 12} ${cx - 2},${shoulderY + 8}" fill="${shirt}" stroke="${STROKE}" stroke-width="1.5"/>
      <polygon points="${cx + 12},${shoulderY} ${cx + 16},${shoulderY + 12} ${cx + 2},${shoulderY + 8}" fill="${shirt}" stroke="${STROKE}" stroke-width="1.5"/>
    `;
  }

  // 3. ARMS & ACCESSORIES
  // Arm position variation
  const armSleeveColor = (archetype === 3) ? shirt : suit;
  const lArmX = cx - torsoTopW;
  const rArmX = cx + torsoTopW;

  // Left Arm (Natural swing or holding folder)
  if (hasFolder) {
    bodySvg += `
      <!-- Left Arm Holding Folder / Tablet -->
      <path d="M ${lArmX} ${shoulderY} Q ${lArmX - 8} ${shoulderY + 35} ${lArmX + 10} ${shoulderY + 55}" stroke="${STROKE}" stroke-width="${STROKE_W + 3}" stroke-linecap="round" fill="none"/>
      <!-- Linq Presentation Folder / Portfolio -->
      <rect x="${lArmX - 8}" y="${shoulderY + 42}" width="24" height="32" rx="3" fill="#7546C8" stroke="${STROKE}" stroke-width="1.8" transform="rotate(12 ${lArmX + 4} ${shoulderY + 58})"/>
      <line x1="${lArmX - 4}" y1="${shoulderY + 48}" x2="${lArmX + 10}" y2="${shoulderY + 48}" stroke="#F3EDFF" stroke-width="2" stroke-linecap="round"/>
      <!-- Hand -->
      <circle cx="${lArmX + 8}" cy="${shoulderY + 62}" r="6" fill="${skin}" stroke="${STROKE}" stroke-width="1.8"/>
    `;
  } else {
    bodySvg += `
      <!-- Left Arm Swing -->
      <path d="M ${lArmX} ${shoulderY} Q ${lArmX - 12} ${shoulderY + 35} ${lArmX - 4} ${shoulderY + 70}" stroke="${STROKE}" stroke-width="${STROKE_W + 3}" stroke-linecap="round" fill="none"/>
      <path d="M ${lArmX} ${shoulderY} Q ${lArmX - 12} ${shoulderY + 35} ${lArmX - 4} ${shoulderY + 70}" stroke="${armSleeveColor}" stroke-width="${STROKE_W + 1}" stroke-linecap="round" fill="none"/>
      <!-- Hand -->
      <circle cx="${lArmX - 4}" cy="${shoulderY + 74}" r="6" fill="${skin}" stroke="${STROKE}" stroke-width="1.8"/>
    `;
  }

  // Right Arm (Natural swing or holding briefcase)
  if (hasBriefcase) {
    bodySvg += `
      <!-- Right Arm Holding Briefcase -->
      <path d="M ${rArmX} ${shoulderY} Q ${rArmX + 8} ${shoulderY + 35} ${rArmX + 4} ${shoulderY + 65}" stroke="${STROKE}" stroke-width="${STROKE_W + 3}" stroke-linecap="round" fill="none"/>
      <!-- Hand -->
      <circle cx="${rArmX + 4}" cy="${shoulderY + 70}" r="6" fill="${skin}" stroke="${STROKE}" stroke-width="1.8"/>
      <!-- Corporate Leather Briefcase -->
      <rect x="${rArmX - 6}" y="${shoulderY + 72}" width="28" height="22" rx="3" fill="#292524" stroke="${STROKE}" stroke-width="1.8"/>
      <path d="M ${rArmX + 2} ${shoulderY + 72} L ${rArmX + 2} ${shoulderY + 67} L ${rArmX + 14} ${shoulderY + 67} L ${rArmX + 14} ${shoulderY + 72}" stroke="${STROKE}" stroke-width="1.8" fill="none"/>
      <rect x="${rArmX + 5}" y="${shoulderY + 78}" width="6" height="4" rx="1" fill="#E2E8F0"/>
    `;
  } else {
    bodySvg += `
      <!-- Right Arm Swing -->
      <path d="M ${rArmX} ${shoulderY} Q ${rArmX + 12} ${shoulderY + 35} ${rArmX + 6} ${shoulderY + 70}" stroke="${STROKE}" stroke-width="${STROKE_W + 3}" stroke-linecap="round" fill="none"/>
      <path d="M ${rArmX} ${shoulderY} Q ${rArmX + 12} ${shoulderY + 35} ${rArmX + 6} ${shoulderY + 70}" stroke="${armSleeveColor}" stroke-width="${STROKE_W + 1}" stroke-linecap="round" fill="none"/>
      <!-- Hand -->
      <circle cx="${rArmX + 6}" cy="${shoulderY + 74}" r="6" fill="${skin}" stroke="${STROKE}" stroke-width="1.8"/>
    `;
  }

  // 4. LINQ ATTENDEE BADGE (Lanyard Ribbon & Card)
  if (hasBadge) {
    bodySvg += `
      <!-- Conference Lanyard (Linq Violet) -->
      <path d="M ${cx - 10} ${shoulderY + 2} Q ${cx} ${shoulderY + 36} ${cx - 2} ${shoulderY + 46}" stroke="#7546C8" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M ${cx + 10} ${shoulderY + 2} Q ${cx} ${shoulderY + 36} ${cx + 2} ${shoulderY + 46}" stroke="#7546C8" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <!-- ID Badge Card -->
      <rect x="${cx - 7}" y="${shoulderY + 46}" width="14" height="18" rx="2" fill="#FFFFFF" stroke="${STROKE}" stroke-width="1.4"/>
      <!-- Badge Header (Violet) -->
      <rect x="${cx - 7}" y="${shoulderY + 46}" width="14" height="4" rx="1" fill="#7546C8"/>
      <!-- Mini QR icon on badge -->
      <rect x="${cx - 3}" y="${shoulderY + 53}" width="6" height="6" fill="#302544"/>
    `;
  }

  // 5. NECK & HEAD
  bodySvg += `
    <!-- Neck -->
    <rect x="${cx - 6}" y="${neckY - 4}" width="12" height="16" fill="${skin}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    <!-- Head Base -->
    <circle cx="${cx}" cy="${headY}" r="${headR}" fill="${skin}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
  `;

  // 6. FACIAL FEATURES (Realistic, professional line-art)
  const eyeY = headY - 1;
  const mouthY = headY + 8;
  bodySvg += `
    <!-- Eyes & Brows -->
    <circle cx="${cx - 6}" cy="${eyeY}" r="1.8" fill="#1E1B24"/>
    <circle cx="${cx + 6}" cy="${eyeY}" r="1.8" fill="#1E1B24"/>
    <path d="M ${cx - 10} ${eyeY - 5} Q ${cx - 6} ${eyeY - 7} ${cx - 2} ${eyeY - 5}" stroke="${STROKE}" stroke-width="1.4" fill="none"/>
    <path d="M ${cx + 2} ${eyeY - 5} Q ${cx + 6} ${eyeY - 7} ${cx + 10} ${eyeY - 5}" stroke="${STROKE}" stroke-width="1.4" fill="none"/>
    <!-- Subtle smile -->
    <path d="M ${cx - 5} ${mouthY} Q ${cx} ${mouthY + 3} ${cx + 5} ${mouthY}" stroke="${STROKE}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  `;

  // Beard (if applicable)
  if (hasBeard) {
    bodySvg += `
      <!-- Groomed Beard -->
      <path d="M ${cx - 14} ${headY + 2} Q ${cx - 14} ${headY + 18} ${cx} ${headY + 20} Q ${cx + 14} ${headY + 18} ${cx + 14} ${headY + 2} Q ${cx} ${headY + 14} ${cx - 14} ${headY + 2} Z" fill="${hair}" stroke="${STROKE}" stroke-width="1.4"/>
    `;
  }

  // Glasses (if applicable)
  if (hasGlasses) {
    bodySvg += `
      <!-- Professional Eyeglasses -->
      <rect x="${cx - 11}" y="${eyeY - 5}" width="9" height="8" rx="2.5" fill="none" stroke="${STROKE}" stroke-width="1.6"/>
      <rect x="${cx + 2}" y="${eyeY - 5}" width="9" height="8" rx="2.5" fill="none" stroke="${STROKE}" stroke-width="1.6"/>
      <line x1="${cx - 2}" y1="${eyeY - 1}" x2="${cx + 2}" y2="${eyeY - 1}" stroke="${STROKE}" stroke-width="1.6"/>
    `;
  }

  // 7. PROFESSIONAL HAIRSTYLES
  if (hairStyle === 0) {
    // Short Executive Side Part
    bodySvg += `
      <path d="M ${cx - headR} ${headY - 4} Q ${cx - headR + 2} ${headY - headR - 6} ${cx + 2} ${headY - headR - 6} Q ${cx + headR} ${headY - headR} ${cx + headR} ${headY - 2} Q ${cx + 6} ${headY - 10} ${cx - headR} ${headY - 4} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    `;
  } else if (hairStyle === 1) {
    // Modern Pompadour / Fade
    bodySvg += `
      <path d="M ${cx - headR + 2} ${headY} Q ${cx - headR - 2} ${headY - headR - 8} ${cx} ${headY - headR - 10} Q ${cx + headR + 2} ${headY - headR - 6} ${cx + headR - 2} ${headY} Q ${cx} ${headY - 12} ${cx - headR + 2} ${headY} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    `;
  } else if (hairStyle === 2) {
    // Professional Sleek Bob
    bodySvg += `
      <path d="M ${cx - headR - 2} ${headY + 8} L ${cx - headR - 2} ${headY - 6} Q ${cx} ${headY - headR - 8} ${cx + headR + 2} ${headY - 6} L ${cx + headR + 2} ${headY + 8} Q ${cx + headR - 2} ${headY + 4} ${cx + 6} ${headY - 8} Q ${cx - headR + 2} ${headY + 4} ${cx - headR - 2} ${headY + 8} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    `;
  } else if (hairStyle === 3) {
    // High Bun / Chignon
    bodySvg += `
      <!-- Hair Base -->
      <path d="M ${cx - headR} ${headY} Q ${cx} ${headY - headR - 6} ${cx + headR} ${headY} Q ${cx} ${headY - 8} ${cx - headR} ${headY} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Neat Top Bun -->
      <circle cx="${cx}" cy="${headY - headR - 6}" r="11" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    `;
  } else if (hairStyle === 4) {
    // Shoulder-length Layered Hair
    bodySvg += `
      <path d="M ${cx - headR - 3} ${headY + 24} Q ${cx - headR - 4} ${headY - 4} ${cx} ${headY - headR - 6} Q ${cx + headR + 4} ${headY - 4} ${cx + headR + 3} ${headY + 24} Q ${cx + headR - 2} ${headY + 12} ${cx + 8} ${headY - 6} Q ${cx - headR + 2} ${headY + 12} ${cx - headR - 3} ${headY + 24} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
    `;
  } else {
    // Sleek Low Ponytail / Crop
    bodySvg += `
      <path d="M ${cx - headR} ${headY + 2} Q ${cx - headR} ${headY - headR - 4} ${cx} ${headY - headR - 6} Q ${cx + headR} ${headY - headR - 4} ${cx + headR} ${headY + 2} Q ${cx} ${headY - 6} ${cx - headR} ${headY + 2} Z" fill="${hair}" stroke="${STROKE}" stroke-width="${STROKE_W}"/>
      <!-- Ponytail at back -->
      <path d="M ${cx + headR - 2} ${headY + 2} Q ${cx + headR + 10} ${headY + 12} ${cx + headR + 6} ${headY + 30}" stroke="${STROKE}" stroke-width="${STROKE_W + 2}" stroke-linecap="round" fill="none"/>
      <path d="M ${cx + headR - 2} ${headY + 2} Q ${cx + headR + 10} ${headY + 12} ${cx + headR + 6} ${headY + 30}" stroke="${hair}" stroke-width="${STROKE_W}" stroke-linecap="round" fill="none"/>
    `;
  }

  return bodySvg;
}

async function main() {
  console.log(`Generating corporate crowd sprite sheet: ${COLS}x${ROWS} = ${TOTAL_CELLS} cells...`);
  
  let masterSvg = `<svg width="${TOTAL_W}" height="${TOTAL_H}" viewBox="0 0 ${TOTAL_W} ${TOTAL_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="crispShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1" flood-color="rgba(0,0,0,0.15)"/>
    </filter>
  </defs>
`;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cellIndex = r * COLS + c;
      const cellX = c * CELL_W;
      const cellY = r * CELL_H;
      const charSvg = generateCharacter(cellIndex);
      
      masterSvg += `
    <!-- Cell ${c}, ${r} (Index ${cellIndex}) -->
    <g transform="translate(${cellX}, ${cellY})">
      ${charSvg}
    </g>
`;
    }
  }

  masterSvg += `</svg>`;

  const outDir = path.resolve('public', 'crowd');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'linq-corporate-peeps.png');
  console.log('Rendering 3600x2268 PNG with sharp...');

  await sharp(Buffer.from(masterSvg))
    .png({ compressionLevel: 8 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`Successfully generated ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);
}

main().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
