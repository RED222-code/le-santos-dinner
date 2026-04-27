/* ============================================================
   PotLoader.jsx — Animated Cooking Pot (Loading Indicator)
   ============================================================
   This component renders an SVG illustration of a boiling pot
   with animated steam, bubbles, ripples, and flames. It is
   displayed inside FoodCard while recipes are being fetched.

   The SVG uses unique gradient IDs (via React's useId hook)
   so that multiple PotLoader instances on the same page
   don't conflict with each other.
   ============================================================ */

import { useId } from "react";

function PotLoader() {
  // useId() gives us a unique string for this component instance.
  // We strip colons because SVG IDs can't contain them.
  const uniqueId = useId().replace(/:/g, "");

  // Each gradient in the SVG needs a globally unique ID.
  // We create them by combining the unique base with a descriptive suffix.
  const potMetalId = `${uniqueId}-potMetal`;
  const potShadeId = `${uniqueId}-potShade`;
  const potGlossId = `${uniqueId}-potGloss`;
  const waterFillId = `${uniqueId}-waterFill`;
  const flameFillId = `${uniqueId}-flameFill`;
  const mountMetalId = `${uniqueId}-mountMetal`;

  return (
    <div className="food-card-loading">
      <div className="pot-loader" aria-hidden="true">
        <svg
          className="pot-loader-svg"
          viewBox="0 0 360 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ---- Gradient Definitions ----
              These define how fills transition between colors.
              They are referenced below using url(#id). */}
          <defs>
            {/* Metallic horizontal gradient for the pot body */}
            <linearGradient id={potMetalId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f535a" />
              <stop offset="14%" stopColor="#f8f8f8" />
              <stop offset="42%" stopColor="#cfd3d8" />
              <stop offset="68%" stopColor="#9ba0a7" />
              <stop offset="100%" stopColor="#43474d" />
            </linearGradient>

            {/* Vertical shadow gradient for the pot bottom */}
            <linearGradient id={potShadeId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.34)" />
            </linearGradient>

            {/* Diagonal gloss highlight on the pot */}
            <linearGradient id={potGlossId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.84)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* Water surface color */}
            <linearGradient id={waterFillId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8fe4ff" />
              <stop offset="50%" stopColor="#6ed0f0" />
              <stop offset="100%" stopColor="#97ebff" />
            </linearGradient>

            {/* Flame gradient (blue-purple) */}
            <linearGradient id={flameFillId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7ec9ff" />
              <stop offset="55%" stopColor="#7a73ff" />
              <stop offset="100%" stopColor="#5f37ff" />
            </linearGradient>

            {/* Handle mount metallic gradient */}
            <linearGradient id={mountMetalId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d7dce2" />
              <stop offset="100%" stopColor="#9ea6af" />
            </linearGradient>
          </defs>

          {/* ---- Shadow under the pot ---- */}
          <ellipse cx="180" cy="294" rx="110" ry="16" fill="rgba(64, 77, 92, 0.18)" />
          <ellipse cx="180" cy="262" rx="84" ry="10" fill="#0e1014" />

          {/* ---- Flames (7 individual flame shapes) ---- */}
          <g>
            <path
              className="flame flame-one"
              d="M100 280C93 270 95 256 106 244C116 255 118 271 109 281C106 284 102 283 100 280Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-two"
              d="M126 282C118 270 121 252 132 236C144 249 145 268 136 281C133 284 129 285 126 282Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-three"
              d="M154 283C146 270 149 249 160 231C172 246 173 267 164 282C161 286 156 286 154 283Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-four"
              d="M182 284C174 272 176 248 188 226C200 245 201 269 191 283C188 287 184 287 182 284Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-five"
              d="M209 283C201 270 203 249 214 231C226 246 227 267 218 282C215 286 211 286 209 283Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-six"
              d="M237 282C228 269 230 252 242 236C253 248 255 268 246 281C243 285 240 285 237 282Z"
              fill={`url(#${flameFillId})`}
            />
            <path
              className="flame flame-seven"
              d="M264 280C255 268 258 255 270 244C280 255 282 270 274 281C271 284 267 284 264 280Z"
              fill={`url(#${flameFillId})`}
            />
          </g>

          {/* ---- Left Handle ---- */}
          <path
            d="M86 150C58 148 48 170 59 192"
            fill="none"
            stroke="#262d36"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M90 156C74 158 66 170 69 186"
            fill="none"
            stroke={`url(#${mountMetalId})`}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <ellipse
            cx="74"
            cy="188"
            rx="8"
            ry="12"
            fill="#eef2f6"
            stroke="#adb5bf"
            strokeWidth="4"
            transform="rotate(18 74 188)"
          />

          {/* ---- Right Handle ---- */}
          <path
            d="M274 150C302 148 312 170 301 192"
            fill="none"
            stroke="#262d36"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M270 156C286 158 294 170 291 186"
            fill="none"
            stroke={`url(#${mountMetalId})`}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <ellipse
            cx="286"
            cy="188"
            rx="8"
            ry="12"
            fill="#eef2f6"
            stroke="#adb5bf"
            strokeWidth="4"
            transform="rotate(-18 286 188)"
          />

          {/* ---- Pot Body ---- */}
          <path
            d="M98 118H262C271 118 278 125 277 134L266 232C263 255 244 272 221 272H139C116 272 97 255 94 232L83 134C82 125 89 118 98 118Z"
            fill={`url(#${potMetalId})`}
            stroke="#545960"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Bottom shadow overlay */}
          <path
            d="M94 220H266L263 240C260 259 243 272 222 272H138C117 272 100 259 97 240L94 220Z"
            fill={`url(#${potShadeId})`}
          />

          {/* Gloss highlight on the left side of the pot */}
          <path
            d="M111 130C121 120 150 118 168 122C142 148 138 194 142 246C118 236 106 212 102 174C100 154 102 140 111 130Z"
            fill={`url(#${potGlossId})`}
            opacity="0.88"
          />

          {/* ---- Pot Rim ---- */}
          <ellipse cx="180" cy="118" rx="98" ry="24" fill="#adadb2" />
          <ellipse cx="180" cy="119" rx="86" ry="18" fill="#666a70" />

          {/* ---- Water Surface (animated rocking) ---- */}
          <g className="water-surface">
            <ellipse cx="180" cy="119" rx="82" ry="15" fill={`url(#${waterFillId})`} />
            <ellipse
              className="water-sheen"
              cx="174"
              cy="116"
              rx="62"
              ry="9"
              fill="rgba(255,255,255,0.18)"
            />
          </g>

          {/* ---- Ripples on the Water ---- */}
          <ellipse
            className="ripple ripple-one"
            cx="126"
            cy="121"
            rx="18"
            ry="6"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
          />
          <ellipse
            className="ripple ripple-two"
            cx="230"
            cy="122"
            rx="21"
            ry="7"
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="2"
          />
          <ellipse
            className="ripple ripple-three"
            cx="246"
            cy="126"
            rx="12"
            ry="4"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
          />

          {/* ---- Bubbles ---- */}
          <circle className="bubble bubble-one" cx="124" cy="116" r="11" fill="rgba(255,255,255,0.5)" />
          <circle className="bubble bubble-two" cx="156" cy="111" r="14" fill="rgba(255,255,255,0.52)" />
          <circle className="bubble bubble-three" cx="200" cy="122" r="9" fill="rgba(255,255,255,0.48)" />
          <circle className="bubble bubble-four" cx="238" cy="116" r="13" fill="rgba(255,255,255,0.48)" />
          <circle className="bubble bubble-five" cx="252" cy="122" r="10" fill="rgba(255,255,255,0.44)" />

          {/* ---- Steam Wisps (rise and fade) ---- */}
          <path
            className="steam-path steam-plume steam-zero"
            d="M118 116C96 92 96 66 112 38C122 20 123 4 116 -12"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <path
            className="steam-path steam-one"
            d="M146 106C128 84 128 58 142 30C150 12 150 -4 144 -16"
            fill="none"
            stroke="rgba(255,255,255,0.58)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            className="steam-path steam-two"
            d="M180 100C162 78 164 50 178 22C186 6 186 -8 180 -20"
            fill="none"
            stroke="rgba(255,255,255,0.66)"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            className="steam-path steam-three"
            d="M214 106C198 84 200 58 214 30C224 12 224 -4 218 -16"
            fill="none"
            stroke="rgba(255,255,255,0.54)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            className="steam-path steam-plume steam-four"
            d="M242 116C224 94 226 70 240 44C250 26 250 10 244 -8"
            fill="none"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          <path
            className="steam-path steam-five"
            d="M176 112C162 94 168 74 186 50C198 34 200 16 194 2"
            fill="none"
            stroke="rgba(255,255,255,0.48)"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Loading message text */}
      <p>Loading recipes...</p>
      <span className="loading-note">The pot is boiling on the stove.</span>
    </div>
  );
}

export default PotLoader;
