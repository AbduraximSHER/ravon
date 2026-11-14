"use client";

export function TongueGuide({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label="Til uchi yuqori tishlar orqasiga tegib, R tovushini chiqarayotgan sxema"
      className={className}
    >
      <defs>
        <linearGradient id="faceFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dff7ef" />
          <stop offset="100%" stopColor="#b8e8d8" />
        </linearGradient>
        <linearGradient id="airFlow" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#0f766e" stopOpacity="0" />
          <stop offset="45%" stopColor="#0f766e" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0f766e" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="168" cy="118" rx="118" ry="86" fill="url(#faceFill)" />
      <path
        d="M78 108 C92 72, 130 58, 168 58 C206 58, 244 72, 258 108"
        fill="none"
        stroke="#0b3d36"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M96 128 C120 148, 216 148, 240 128"
        fill="none"
        stroke="#0b3d36"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Upper teeth ridge */}
      <path
        d="M118 96 H218"
        stroke="#0b3d36"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.35"
      />
      <text
        x="168"
        y="86"
        textAnchor="middle"
        fill="#0b3d36"
        fontSize="11"
        fontFamily="var(--font-body), sans-serif"
        opacity="0.7"
      >
        qattiq tangay
      </text>

      {/* Tongue */}
      <path
        d="M120 156 C132 138, 148 118, 168 108 C186 118, 200 136, 214 156 C190 168, 146 168, 120 156 Z"
        fill="#2a9d8f"
        opacity="0.9"
      />
      <circle cx="168" cy="112" r="7" fill="#0b3d36">
        <animate
          attributeName="cy"
          values="112;108;112"
          dur="1.1s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.55;1"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="168"
        y="178"
        textAnchor="middle"
        fill="#0b3d36"
        fontSize="12"
        fontFamily="var(--font-body), sans-serif"
        fontWeight="600"
      >
        til uchi shu yerda
      </text>

      {/* Air arrows */}
      <path
        d="M48 132 C78 122, 108 122, 132 126"
        fill="none"
        stroke="url(#airFlow)"
        strokeWidth="8"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </path>
      <text
        x="58"
        y="118"
        fill="#0f766e"
        fontSize="11"
        fontFamily="var(--font-body), sans-serif"
        fontWeight="600"
      >
        havo →
      </text>
    </svg>
  );
}
