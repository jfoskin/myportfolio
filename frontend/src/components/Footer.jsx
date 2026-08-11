
// import jollyRoger from "../assets/jollyRoger.png"
import whitejollyRoger from "../assets/one-piece-jolly-roger.png"

export default function Footer() {
  return (
    <footer className="panel footer-panel">
      <p>Est: 2026</p>
      <img className="jolly" src={whitejollyRoger} alt="Jolly Roger for straw hat pirates from one piece" />

      <p id='percent'>92%</p>
    </footer>
  )
}
