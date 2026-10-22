import { useEffect } from "react"

// Generic mac-window style modal: traffic lights, overlay click, escape to close
export default function Modal({ isOpen, onClose, title, className = "", children }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`panel modal-window ${className}`} onClick={(event) => event.stopPropagation()}>
        {/* Title bar stays put while the body scrolls, so close is always reachable */}
        <div className="modal-titlebar">
          <div className="modal-traffic-lights">
            <button
              type="button"
              className="traffic-light traffic-light-red"
              onClick={onClose}
              aria-label={`Close ${title ?? "modal"}`}
            />
            <button
              type="button"
              className="traffic-light traffic-light-yellow"
              aria-label={`Minimize ${title ?? "modal"}`}
            />
            <button
              type="button"
              className="traffic-light traffic-light-green"
              aria-label={`Maximize ${title ?? "modal"}`}
            />
          </div>
        </div>

        <div className="modal-body">
          {title && <h2>{title}</h2>}

          {children}
        </div>
      </div>
    </div>
  )
}
