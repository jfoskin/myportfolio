// Icon text colors per theme (hex without #, as icons8 expects)
export const ICON_COLORS = {
  retro: "f5f4ef",
  dark: "f2e9dc",
  light: "1e1b2e",
}

// icons8 renders an icon in whatever color the `color` query param asks for,
// so swap it to match the current theme. Other URLs are returned unchanged.
export function withIconColor(url, color) {
  if (!url?.startsWith("https://img.icons8.com/")) return url
  const iconUrl = new URL(url)
  iconUrl.searchParams.set("color", color)
  return iconUrl.toString()
}
