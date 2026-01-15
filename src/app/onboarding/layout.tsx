import { Sidebar } from "@/components/layout/Sidebar"

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app we might determine step from URL or DB here, 
  // but for client-side wizard, the page handles it. 
  // We'll pass a default step to sidebar or make sidebar client-side aware.
  
  // For now, Sidebar is client aware or static. 
  // We will make Sidebar take 'currentStep' which requires page interaction. 
  // Actually, better to put Sidebar INSIDE the Page if it needs tight coupling with wizard state, 
  // OR make Sidebar read from URL/Context.
  
  // Let's keep it simple: The Layout provides structure. 
  // The Sidebar will be smart (Client Component) reading useSearchParams if needed, 
  // or just passed down.
  // Since Layout wraps children, I can't easily pass props TO children.
  
  // I will make the Sidebar a dumb component here and maybe just render the structure,
  // BUT actually, I'll move the Sidebar usage into the page for easier state sharing in this MVP
  // or keep it here and make it read URL.
  
  return (
    <div className="flex h-screen w-full bg-secondary/30">
        {children}
    </div>
  )
}
