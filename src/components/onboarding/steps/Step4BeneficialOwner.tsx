"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Step4FormData } from "@/schemas/onboarding"

export function Step4BeneficialOwner() {
  const { register, formState: { errors } } = useFormContext<Step4FormData>()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información del Propietario Real</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
           <div className="space-y-2">
               <Label htmlFor="nombre">Nombre completo*</Label>
               <Input id="nombre" {...register("nombre")} />
               {errors.nombre && <p className="text-destructive text-xs">{errors.nombre.message}</p>}
           </div>
           
           <div className="space-y-2">
               <Label htmlFor="porcentajePropiedad">% Propiedad / Control</Label>
               <Input id="porcentajePropiedad" {...register("porcentajePropiedad")} placeholder="Ej. 25%" />
           </div>

           <div className="space-y-2">
               <Label htmlFor="genero">Género*</Label>
               <select {...register("genero")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                   <option value="">Seleccione</option>
                   <option value="M">Masculino</option>
                   <option value="F">Femenino</option>
                   <option value="X">Otro</option>
               </select>
               {errors.genero && <p className="text-destructive text-xs">{errors.genero.message}</p>}
           </div>
           
           <div className="space-y-2">
               <Label htmlFor="fechaNacimiento">Fecha de Nacimiento*</Label>
               <Input id="fechaNacimiento" type="date" {...register("fechaNacimiento")} />
               {errors.fechaNacimiento && <p className="text-destructive text-xs">{errors.fechaNacimiento.message}</p>}
           </div>
           
           <div className="space-y-2">
               <Label htmlFor="entidadNacimiento">Entidad de Nacimiento*</Label>
               <Input id="entidadNacimiento" {...register("entidadNacimiento")} />
               {errors.entidadNacimiento && <p className="text-destructive text-xs">{errors.entidadNacimiento.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="paisNacimiento">País de Nacimiento*</Label>
               <Input id="paisNacimiento" {...register("paisNacimiento")} />
               {errors.paisNacimiento && <p className="text-destructive text-xs">{errors.paisNacimiento.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="nacionalidad">Nacionalidad*</Label>
               <Input id="nacionalidad" {...register("nacionalidad")} />
               {errors.nacionalidad && <p className="text-destructive text-xs">{errors.nacionalidad.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="curp">CURP*</Label>
               <Input id="curp" {...register("curp")} />
               {errors.curp && <p className="text-destructive text-xs">{errors.curp.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="rfc">RFC*</Label>
               <Input id="rfc" {...register("rfc")} />
               {errors.rfc && <p className="text-destructive text-xs">{errors.rfc.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="estadoCivil">Estado Civil*</Label>
               <Input id="estadoCivil" {...register("estadoCivil")} />
               {errors.estadoCivil && <p className="text-destructive text-xs">{errors.estadoCivil.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="email">Correo Electrónico*</Label>
               <Input id="email" type="email" {...register("email")} />
               {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
           </div>

           <div className="space-y-2">
               <Label htmlFor="telefono">Teléfono*</Label>
               <Input id="telefono" {...register("telefono")} />
               {errors.telefono && <p className="text-destructive text-xs">{errors.telefono.message}</p>}
           </div>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <CardTitle>Domicilio del Propietario Real</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="calle">Calle*</Label>
                    <Input id="calle" {...register("calle")} />
                    {errors.calle && <p className="text-destructive text-xs">{errors.calle.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="numeroExterior">No. Exterior*</Label>
                    <Input id="numeroExterior" {...register("numeroExterior")} />
                    {errors.numeroExterior && <p className="text-destructive text-xs">{errors.numeroExterior.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="numeroInterior">No. Interior</Label>
                    <Input id="numeroInterior" {...register("numeroInterior")} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="colonia">Colonia*</Label>
                    <Input id="colonia" {...register("colonia")} />
                    {errors.colonia && <p className="text-destructive text-xs">{errors.colonia.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="codigoPostal">Código Postal*</Label>
                    <Input id="codigoPostal" {...register("codigoPostal")} />
                    {errors.codigoPostal && <p className="text-destructive text-xs">{errors.codigoPostal.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="ciudad">Ciudad*</Label>
                    <Input id="ciudad" {...register("ciudad")} />
                    {errors.ciudad && <p className="text-destructive text-xs">{errors.ciudad.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="municipio">Municipio/Alcaldía*</Label>
                    <Input id="municipio" {...register("municipio")} />
                    {errors.municipio && <p className="text-destructive text-xs">{errors.municipio.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="estado">Estado*</Label>
                    <Input id="estado" {...register("estado")} />
                    {errors.estado && <p className="text-destructive text-xs">{errors.estado.message}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pais">País*</Label>
                    <Input id="pais" {...register("pais")} />
                    {errors.pais && <p className="text-destructive text-xs">{errors.pais.message}</p>}
                </div>
          </CardContent>
      </Card>
    </div>
  )
}
