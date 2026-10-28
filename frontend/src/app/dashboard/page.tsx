import AnimatedSidebarPreview from "@/components/ui/animated-sidebar-demo";

export const metadata = {
  title: "Dashboard - HextaStudio",
  description: "User workspace and dashboard overview",
};

export default function DashboardPage() {
  return (
    <main className="w-screen h-screen overflow-hidden">
      <AnimatedSidebarPreview />
    </main>
  );
}
