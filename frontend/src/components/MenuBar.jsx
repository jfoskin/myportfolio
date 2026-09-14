import { useEffect, useState } from "react"
import bonsaiIcon from "../assets/bonsai-50.png"

// macOS-style static top menu bar, ~12px tall
export default function MenuBar() {
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
        <span className="mac-menubar-title">Portfolio</span>
      </span>
      <span className="mac-menubar-clock">{formattedDate} {formattedTime}</span>
    </div>
  )
}
