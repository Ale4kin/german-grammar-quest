import Link from "next/link";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
  { href: "/profile", label: "Profile" },
];

export function AppChrome() {
  return (
    <header className="quest-topbar">
      <div className="quest-topbar-inner">
        <Link href="/" className="quest-brand">
          <span className="quest-brand-mark" aria-hidden="true">
            GG
          </span>
          <div>
            <p className="quest-brand-title">German Grammar Quest</p>
            <p className="quest-brand-subtitle">Grammar journey</p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Primary">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className="quest-nav-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
