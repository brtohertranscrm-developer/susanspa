import { webUrl } from '../lib/publicLinks'

export function NavWebsiteLink() {
  return (
    <a
      id="nav-website"
      className="nav__link nav__link--external"
      href={webUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="nav__link-label">
        Buka website<span className="sr-only"> (tab baru)</span>
      </span>
    </a>
  )
}
