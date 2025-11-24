"use client";

import React from 'react';

type SparkProps = { change: number; id: string };

// Quick deterministic pseudo-random small sparkline based on token id
function seededRandom(seed: number) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function Sparkline({ change, id }: SparkProps) {
  const color = change >= 0 ? '#2ecc71' : '#ff6b6b';
  const seed = id.split('').reduce((p, c) => p + c.charCodeAt(0), 0);
  const points = Array.from({ length: 8 }).map((_, i) => {
    const y = Math.round(10 + seededRandom(seed + i) * 20);
    const x = Math.round((i / 7) * 100);
    return `${x},${y}`;
  });
  const polylinePoints = points.join(' ');
  return (
    <svg width="100" height="20" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points={polylinePoints} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
