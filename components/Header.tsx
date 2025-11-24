"use client";

import React from 'react';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-900 bg-transparent">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo1.svg" alt="logo" className="w-8 h-8" />
            <div className="text-white font-semibold">AXIOM Pro</div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-sm text-gray-300">
            <a className="text-[#2d7cfb]">Discover</a>
            <a className="text-white font-semibold">Pulse</a>
            <a className="hover:text-white">Trackers</a>
            <a className="hover:text-white">Perpetuals</a>
            <a className="hover:text-white">Yield</a>
            <a className="hover:text-white">Vision</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input placeholder="Search by token or CA..." className="bg-[#0b0f14] placeholder-gray-500 text-sm px-3 py-2 rounded-md border border-gray-800 text-gray-200 w-64" />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">⌕</div>
            </div>
            <div className="rounded border border-gray-800 p-1 px-2 text-sm text-gray-300">SOL ⌄</div>
            <button className="bg-[#4b7aff] text-white px-4 py-2 rounded-full text-sm">Deposit</button>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">U</div>
        </div>
      </div>
    </header>
  );
}
