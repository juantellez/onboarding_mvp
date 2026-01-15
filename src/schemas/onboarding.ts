import { z } from "zod"

export const step1Schema = z.object({
  // General
  razonSocial: z.string().min(1, "La denominación o razón social es requerida"),
  rfc: z.string().min(12, "RFC inválido").max(13, "RFC inválido"),
  cobertura: z.array(z.string()).min(1, "Seleccione al menos una opción de cobertura"),
  estadosCobertura: z.string().optional(), // If Nacional/Estatal
  sectorGiro: z.string().min(1, "El sector/giro es requerido"),

  // Contact
  telefono: z.string().min(10, "Teléfono a 10 dígitos"),
  telefonoAdicional: z.string().optional(),

  // FATCA
  declaraImpuestosEUA: z.boolean().default(false),
  idFiscalEUA: z.string().optional(),

  // Procedencia (Multiple selection possible?) Usually single origin but squares suggest checkboxes.
  // I'll make it array for flexibility or string if radio behavior. 
  // Form says "Procedencia de recursos*", typically one main source. 
  // But checkboxes allow multiple. I'll use array.
  procedenciaRecursos: z.array(z.string()).min(1, "Seleccione procedencia de recursos"),

  // Uso/Destino
  usoDestino: z.array(z.string()).min(1, "Seleccione uso o destino"),

  // Tipo Manejo
  tipoManejo: z.array(z.string()).min(1, "Seleccione tipo de manejo"),

  // Public Company
  cotizaBolsa: z.boolean().default(false),
  paisBolsa: z.string().optional(),
  clavePizarra: z.string().optional(),

  // Bank (Optional if 'noCuenta' is checked)
  clabe: z.string().optional(),
  banco: z.string().optional(),
  noCuenta: z.boolean().default(false),
  
  // Address (Page 1 bottom)
  calle: z.string().min(1, "Calle requerida"),
  numeroExterior: z.string().min(1, "Número exterior requerido"),
  numeroInterior: z.string().optional(),
  colonia: z.string().min(1, "Colonia requerida"),
  codigoPostal: z.string().min(5, "CP requerido"),
  ciudad: z.string().min(1, "Ciudad requerida"),
  municipio: z.string().min(1, "Delegación/Municipio requerida"),
  estado: z.string().min(1, "Estado requerido"),
  pais: z.string().min(1, "País requerido"),
}).refine((data) => {
  if (data.declaraImpuestosEUA && !data.idFiscalEUA) return false
  return true
}, {
  message: "ID Fiscal es requerido si declara impuestos en EUA",
  path: ["idFiscalEUA"]
}).refine((data) => {
  if (data.cotizaBolsa && (!data.paisBolsa || !data.clavePizarra)) return false
  return true
}, {
  message: "País y Clave son requeridos si cotiza en bolsa",
  path: ["paisBolsa"]
})

export type Step1FormData = z.infer<typeof step1Schema>

export const step2Schema = z.object({
  depositoInicial: z.string().min(1, "Depósito inicial requerido"),
  
  depositosMensualesCant: z.string().min(1, "Seleccione un rango"),
  depositosMensualesMonto: z.string().optional(),
  depositosMensualesNum: z.string().min(1, "Número de depósitos requerido"), // Form asks for number, keep as string then parse or use string input

  retirosMensualesCant: z.string().min(1, "Seleccione un rango"),
  retirosMensualesMonto: z.string().optional(),
  retirosMensualesNum: z.string().min(1, "Número de retiros requerido"),

  operarFondosExentos: z.boolean().default(false),
  
  operarDivisas: z.boolean().default(false),
  divisasFXPayments: z.boolean().optional(),
  divisasInversion: z.boolean().optional(),
}).refine((data) => {
  if (data.depositosMensualesCant === "> $5,000,000 MXN" && !data.depositosMensualesMonto) return false
  return true
}, {
  message: "Indique monto aproximado",
  path: ["depositosMensualesMonto"]
}).refine((data) => {
  if (data.retirosMensualesCant === "> $5,000,000 MXN" && !data.retirosMensualesMonto) return false
  return true
}, {
   message: "Indique monto aproximado",
   path: ["retirosMensualesMonto"]
})

export type Step2FormData = z.infer<typeof step2Schema>

export const step5Schema = z.object({
  actaConstitutiva: z.string().min(1, "Archivo requerido"),
  actasAsamblea: z.string().optional(),
  comprobanteDomicilioEmpresa: z.string().min(1, "Archivo requerido"),
  identificacionRepLegal: z.string().min(1, "Archivo requerido"),
  comprobanteDomicilioRepLegal: z.string().min(1, "Archivo requerido"),
  constanciaSituacionFiscal: z.string().min(1, "Archivo requerido"),
})

export type Step5FormData = z.infer<typeof step5Schema>

export const step3Schema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  genero: z.string().min(1, "Género requerido"),
  fechaNacimiento: z.string().min(1, "Requerido"),
  entidadNacimiento: z.string().min(1, "Requerida"),
  paisNacimiento: z.string().min(1, "Requerido"),
  nacionalidad: z.string().min(1, "Requerida"),
  curp: z.string().min(1, "Requerida"),
  rfc: z.string().min(1, "Requerido"),
  estadoCivil: z.string().min(1, "Requerido"),
  email: z.string().email("Inválido").min(1, "Requerido"),
  telefono: z.string().min(1, "Requerido"),
  
  calle: z.string().min(1, "Requerida"),
  numeroExterior: z.string().min(1, "Requerido"),
  numeroInterior: z.string().optional(),
  colonia: z.string().min(1, "Requerida"),
  codigoPostal: z.string().min(5, "Inválido"),
  ciudad: z.string().min(1, "Requerida"),
  municipio: z.string().min(1, "Requerido"),
  estado: z.string().min(1, "Requerido"),
  pais: z.string().min(1, "Requerido"),
})

export type Step3FormData = z.infer<typeof step3Schema>

export const step4Schema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  genero: z.string().min(1, "Género requerido"),
  fechaNacimiento: z.string().min(1, "Requerido"),
  entidadNacimiento: z.string().min(1, "Requerida"),
  paisNacimiento: z.string().min(1, "Requerido"),
  nacionalidad: z.string().min(1, "Requerida"),
  curp: z.string().min(1, "Requerida"),
  rfc: z.string().min(1, "Requerido"),
  estadoCivil: z.string().min(1, "Requerido"),
  email: z.string().email("Inválido").min(1, "Requerido"),
  telefono: z.string().min(1, "Requerido"),

  calle: z.string().min(1, "Requerida"),
  numeroExterior: z.string().min(1, "Requerido"),
  numeroInterior: z.string().optional(),
  colonia: z.string().min(1, "Requerida"),
  codigoPostal: z.string().min(5, "Inválido"),
  ciudad: z.string().min(1, "Requerida"),
  municipio: z.string().min(1, "Requerido"),
  estado: z.string().min(1, "Requerido"),
  pais: z.string().min(1, "Requerido"),
  
  porcentajePropiedad: z.string().optional(),
})

export type Step4FormData = z.infer<typeof step4Schema>



