import { cn } from "@/lib/utils"
// import { CheckCircle2, Circle } from "lucide-react"

// Steps definition
const steps = [
  { id: 1, title: "Información General", description: "Datos de la empresa" },
  { id: 2, title: "Transaccionalidad", description: "Perfil transaccional" },
  { id: 3, title: "Apoderados", description: "Representantes legales" },
  { id: 4, title: "Propietario Real", description: "Beneficiarios finales" },
  { id: 5, title: "Documentos", description: "Carga de archivos" },
  { id: 6, title: "Revisión", description: "Confirmar datos" },
]

interface SidebarProps {
  currentStep: number
}

export function Sidebar({ currentStep }: SidebarProps) {
  return (
    <div className="hidden w-64 flex-col border-r bg-card p-6 md:flex">
      <div className="mb-8 flex items-center gap-2 font-semibold text-lg text-primary">
        <span>KybOnboarding</span>
      </div>
      <nav className="flex flex-col gap-4">
        {steps.map((step) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep

          return (
            <div
              key={step.id}
              className={cn(
                "group flex items-start gap-3 rounded-lg p-2 transition-colors",
                isActive ? "bg-accent" : "hover:bg-accent/50"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCompleted
                    ? "border-primary text-primary"
                    : "border-muted-foreground text-muted-foreground"
                )}
              >
                {isCompleted ? "✓" : step.id}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-medium",
                    isActive || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step.description}
                </span>
              </div>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
