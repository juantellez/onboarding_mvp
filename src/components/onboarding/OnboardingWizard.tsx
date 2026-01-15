"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  step1Schema, Step1FormData, 
  step2Schema, Step2FormData, 
  step3Schema, Step3FormData, 
  step4Schema, Step4FormData, 
  step5Schema, Step5FormData 
} from "@/schemas/onboarding"
import { Sidebar } from "@/components/layout/Sidebar"
import { Step1General } from "./steps/Step1General"
import { Step2Transaction } from "./steps/Step2Transaction"
import { Step3LegalRep } from "./steps/Step3LegalRep"
import { Step4BeneficialOwner } from "./steps/Step4BeneficialOwner"
import { Step5Documents } from "./steps/Step5Documents"
import { Button } from "@/components/ui/Button"
import { saveOnboardingStep } from "@/actions/onboarding"

type FormData = Step1FormData & Step2FormData & Step3FormData & Step4FormData & Step5FormData

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [sessionId, setSessionId] = useState<string | null>(null)
  
  // Create a map or switch for schema
  const currentSchema = 
      currentStep === 1 ? step1Schema : 
      currentStep === 2 ? step2Schema : 
      currentStep === 3 ? step3Schema :
      currentStep === 4 ? step4Schema :
      currentStep === 5 ? step5Schema :
      step1Schema 
  
  const methods = useForm<FormData>({
    resolver: zodResolver(currentSchema) as any,
    mode: "onChange",
    defaultValues: {
      // Step 1
      declaraImpuestosEUA: false,
      cotizaBolsa: false,
      noCuenta: false,
      cobertura: [],
      usoDestino: [],
      procedenciaRecursos: [],
      tipoManejo: [],
      // Step 2
      operarFondosExentos: false,
      operarDivisas: false,
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
        const result = await saveOnboardingStep(sessionId, currentStep, data)
        if (result.success && result.sessionId) {
            setSessionId(result.sessionId)
        }

        if (currentStep < 6) {
           setCurrentStep(prev => prev + 1)
           window.scrollTo(0, 0)
        } else {
           console.log("Final Submission:", data)
           alert("Proceso de onboarding completado. Datos guardados en SQLite.")
        }
    } catch (error) {
        console.error("Error saving data:", error)
        alert("Error al guardar datos. Revise la consola.")
    }
  }

  const handleNext = async () => {
      const valid = await methods.trigger()
      if (valid) {
          onSubmit(methods.getValues())
      }
  }

  return (
    <div className="flex w-full h-full">
      <Sidebar currentStep={currentStep} />
      <main className="flex-1 overflow-y-auto p-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-primary">
                    {currentStep === 1 && "Información General"}
                    {currentStep === 2 && "Transaccionalidad"}
                    {currentStep === 3 && "Apoderados"}
                    {currentStep === 4 && "Propietario Real"}
                    {currentStep === 5 && "Documentos"}
                    {currentStep === 6 && "Revisión"}
                </h1>
                <div className="text-sm text-muted-foreground">
                    Paso {currentStep} de 6
                </div>
            </div>

            <FormProvider {...methods}>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {currentStep === 1 && <Step1General />}
                    {currentStep === 2 && <Step2Transaction />}
                    {currentStep === 3 && <Step3LegalRep />}
                    {currentStep === 4 && <Step4BeneficialOwner />}
                    {currentStep === 5 && <Step5Documents sessionId={sessionId} />}

                    {currentStep === 6 && (
                         <div className="p-12 text-center border rounded-lg bg-card">
                            <p className="text-muted-foreground">Revisión Final</p>
                            <p className="text-sm mt-2">Listo para enviar.</p>
                        </div>
                    )}
                </form>
            </FormProvider>

            <div className="flex justify-between pt-6 border-t">
                <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    disabled={currentStep === 1}
                >
                    Anterior
                </Button>
                <Button onClick={handleNext}>
                    {currentStep === 6 ? "Finalizar" : "Siguiente"}
                </Button>
            </div>
        </div>
      </main>
    </div>
  )
}
