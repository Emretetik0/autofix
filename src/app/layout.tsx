import type { Metadata } from "next";
import "./globals.css";
import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';

export const metadata: Metadata = {
  title: "AutoFix - Profesyonel Araç Bakım ve Tamir",
  description: "Aracınız için en iyi fiyatı hesaplayın ve hemen randevu alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <div className="page-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <header style={{ padding: '24px 0', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                AutoFix<span style={{ color: 'var(--text-main)' }}>.</span>
              </Link>
              <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <ThemeToggle />
                <Link href="/" className="nav-link">Hizmetler</Link>
                <Link href="/admin" className="nav-link" style={{ color: 'var(--text-muted)' }}>Admin Paneli</Link>
              </nav>
            </div>
          </header>
          
          <main style={{ flex: 1 }}>
            {children}
          </main>

          <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 0', backgroundColor: 'var(--surface)', marginTop: 'auto' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>AutoFix.</div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Profesyonel araç onarım merkezi.</p>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                © 2026 AutoFix. Github Portfolio Projesidir.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
