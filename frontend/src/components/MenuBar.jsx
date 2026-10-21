import { useEffect, useState } from "react"
import bonsaiIcon from "../assets/bonsai-50.png"
import batteryIcon from "../assets/battery.png"
import oldComputerIcon from "../assets/old-computer.png"

// macOS-style static top menu bar, ~12px tall
export default function MenuBar({ title = "Portfolio", onThemeToggle, isDark, onModeToggle }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timerId)
  }, [])

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).replace(",", "")

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="mac-menubar">
      <span className="mac-menubar-brand">
        <img src={bonsaiIcon} alt="" className="mac-menubar-icon" />
        <span className="mac-menubar-title">{title}</span>
      </span>
      <span className="mac-menubar-clock">
        <button
          type="button"
          className="mac-menubar-mode-toggle"
          onClick={onModeToggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span aria-hidden="true">{isDark ? "☀︎" : "☾"}</span>
        </button>
        <button
          type="button"
          className="mac-menubar-old-computer"
          onClick={onThemeToggle}
          aria-label="Switch to retro look"
          title="Switch to retro look"
        >
          <img src={oldComputerIcon} alt="" className="mac-menubar-old-computer-icon" />
        </button>
        <span className="mac-menubar-battery-wrap">
          <img src={batteryIcon} alt="" className="mac-menubar-battery" />
          <span className="mac-menubar-battery-label">92%</span>
        </span>
        {formattedDate} {formattedTime}
      </span>
    </div>
  )
}
