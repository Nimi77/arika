import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
