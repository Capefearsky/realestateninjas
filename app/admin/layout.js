import '@/styles/admin.css';

export const metadata = { title: 'Ninjas HQ', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }) {
  return (
    <div className="adm">
      <header>
        <strong>Ninjas HQ</strong>
        <form action="/api/admin/logout" method="post"><button type="submit">Sign out</button></form>
      </header>
      <main>{children}</main>
    </div>
  );
}
