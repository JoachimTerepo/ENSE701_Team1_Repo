import NavLink from "@/app/lib/components/NavLink";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-100 border-b border-neutral-400 shadow flex justify-between items-center">
        <div className="w-1/2 flex justify-start items-center px-2">
          <h1 className="text-xl font-bold py-4">SPEED</h1>
        </div>
        <div className="w-1/2 flex justify-end items-center px-2">
          <NavLink href="/app">Home</NavLink>
          <NavLink href="/app/claims">Claims</NavLink>
          <NavLink href="/app/submission">Submit New Entry</NavLink>
          <NavLink href="/app/analysis">Analysis</NavLink>
        </div>
      </div>
      <div className="w-100 h-dvh">{children}</div>
    </>
  );
}
