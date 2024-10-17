import NavLink from "@/lib/components/NavLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-100 border-b border-neutral-400 shadow flex justify-between items-center">
        <div className="w-full flex justify-end items-center px-2 py-4">
          <NavLink href="/admin/moderate">Moderate</NavLink>
          <NavLink href="/admin/analysis">Analysis</NavLink>
          <NavLink href="/admin/claims">Claims</NavLink>
          <NavLink href="/admin/logout">Logout</NavLink>
        </div>
      </div>
      <div className="w-100 h-dvh">{children}</div>
    </>
  );
}
