'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetHour?: number
}

function getSecondsUntil(targetHour: number): number {
  const now = new Date()
  const target = new Date(now)
  target.setHours(targetHour, 0, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  return Math.floor((target.getTime() - now.getTime()) / 1000)
}

function formatTime(seconds: number): { h: string; m: string; s: string } {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return {
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  }
}

export default function CountdownTimer({ targetHour = 20 }: CountdownTimerProps) {
  const [seconds, setSeconds] = useState<number | null>(null)

  useEffect(() => {
    setSeconds(getSecondsUntil(targetHour))
    const interval = setInterval(() => {
      setSeconds((s) =>
        s === null || s <= 1 ? getSecondsUntil(targetHour) : s - 1
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [targetHour])

  const time = seconds === null ? null : formatTime(seconds)

  return (
    <div className="inline-flex items-center gap-3 bg-ink text-cream px-4 py-2 rounded">
      <span className="font-body text-[11px] uppercase tracking-widest">
        Next cutoff in
      </span>
      <span className="font-body text-sm font-medium tabular-nums">
        {time ? `${time.h}h ${time.m}m ${time.s}s` : '--h --m --s'}
      </span>
    </div>
  )
}
