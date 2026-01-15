import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Step2FormData } from "@/schemas/onboarding"

const RANGES = [
  "$0 - $500,000 MXN",
  "$500,001 - $2,000,000 MXN",
  "$2,000,001 - $5,000,000 MXN",
  "> $5,000,000 MXN"
]

export function Step2Transaction() {
  const { register, watch, formState: { errors } } = useFormContext<Step2FormData>()
  
  const depositosCant = watch("depositosMensualesCant")
  const retirosCant = watch("retirosMensualesCant")
  const operarDivisas = watch("operarDivisas")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaccionalidad - Depósitos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
             <div className="space-y-2">
                 <Label htmlFor="depositoInicial">Depósito inicial*</Label>
                 <Input id="depositoInicial" {...register("depositoInicial")} />
                 {errors.depositoInicial && <p className="text-destructive text-xs">{errors.depositoInicial.message}</p>}
             </div>
             
             <div>
                 <Label className="mb-2 block">Cantidad aproximada de depósitos al mes*</Label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                     {RANGES.map(opt => (
                         <label key={opt} className="flex items-center gap-2">
                            <input type="radio" value={opt} {...register("depositosMensualesCant")} className="accent-primary" />
                            <span>{opt}</span>
                         </label>
                     ))}
                 </div>
                 {errors.depositosMensualesCant && <p className="text-destructive text-xs">{errors.depositosMensualesCant.message}</p>}
             </div>
             
             {depositosCant === "> $5,000,000 MXN" && (
                 <div className="space-y-2">
                     <Label htmlFor="depositosMensualesMonto">Monto aproximado</Label>
                     <Input id="depositosMensualesMonto" {...register("depositosMensualesMonto")} />
                     {errors.depositosMensualesMonto && <p className="text-destructive text-xs">{errors.depositosMensualesMonto.message}</p>}
                 </div>
             )}

             <div className="space-y-2">
                 <Label htmlFor="depositosMensualesNum">Número de depósitos aproximados al mes*</Label>
                 <Input id="depositosMensualesNum" {...register("depositosMensualesNum")} type="number" />
                 {errors.depositosMensualesNum && <p className="text-destructive text-xs">{errors.depositosMensualesNum.message}</p>}
             </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaccionalidad - Retiros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
             <div>
                 <Label className="mb-2 block">Cantidad aproximada de retiros al mes*</Label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                     {RANGES.map(opt => (
                         <label key={opt} className="flex items-center gap-2">
                            <input type="radio" value={opt} {...register("retirosMensualesCant")} className="accent-primary" />
                            <span>{opt}</span>
                         </label>
                     ))}
                 </div>
                 {errors.retirosMensualesCant && <p className="text-destructive text-xs">{errors.retirosMensualesCant.message}</p>}
             </div>
             
             {retirosCant === "> $5,000,000 MXN" && (
                 <div className="space-y-2">
                     <Label htmlFor="retirosMensualesMonto">Monto aproximado</Label>
                     <Input id="retirosMensualesMonto" {...register("retirosMensualesMonto")} />
                     {errors.retirosMensualesMonto && <p className="text-destructive text-xs">{errors.retirosMensualesMonto.message}</p>}
                 </div>
             )}

             <div className="space-y-2">
                 <Label htmlFor="retirosMensualesNum">Número de retiros aproximados al mes*</Label>
                 <Input id="retirosMensualesNum" {...register("retirosMensualesNum")} type="number" />
                 {errors.retirosMensualesNum && <p className="text-destructive text-xs">{errors.retirosMensualesNum.message}</p>}
             </div>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Operaciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
               <div>
                 <Label className="mb-2 block">¿Desean operar fondos exentos?</Label>
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" {...register("operarFondosExentos")} className="accent-primary h-4 w-4" />
                        <span>Sí</span>
                    </label>
                 </div>
               </div>

               <div>
                 <Label className="mb-2 block">¿Desea realizar operaciones con divisas?</Label>
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                         <input type="checkbox" {...register("operarDivisas")} className="accent-primary h-4 w-4" />
                        <span>Sí</span>
                    </label>
                 </div>
               </div>
               
               {operarDivisas && (
                   <div className="ml-4 space-y-2 border-l-2 pl-4">
                       <Label className="block">Tipo de operación:</Label>
                       <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <Checkbox {...register("divisasFXPayments")} />
                                <span>FX for Payments</span>
                            </label>
                             <label className="flex items-center gap-2">
                                <Checkbox {...register("divisasInversion")} />
                                <span>Inversión en divisas</span>
                            </label>
                       </div>
                   </div>
               )}
          </CardContent>
      </Card>
    </div>
  )
}
