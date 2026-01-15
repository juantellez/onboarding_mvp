import { useFormContext } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Label } from "@/components/ui/Label"
import { Upload, FileText, X } from "lucide-react" 
import { useState } from "react"
import { Step5FormData } from "@/schemas/onboarding"

const DOCUMENTS = [
    { key: "actaConstitutiva", label: "Acta Constitutiva*" },
    { key: "actasAsamblea", label: "Actas de asambleas (en caso de existir)" },
    { key: "comprobanteDomicilioEmpresa", label: "Comprobante de domicilio a nombre de la empresa*" },
    { key: "identificacionRepLegal", label: "Identificación oficial del representante legal*" },
    { key: "comprobanteDomicilioRepLegal", label: "Comprobante de domicilio del representante legal*" },
    { key: "constanciaSituacionFiscal", label: "Constancia de situación fiscal*" },
]

export function Step5Documents({ sessionId }: { sessionId: string | null }) {
  const { register, formState: { errors }, watch, setValue } = useFormContext<Step5FormData>()

  return (
    <div className="space-y-6">
       <Card>
           <CardHeader>
               <CardTitle>Documentación Requerida</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
                {!sessionId && (
                    <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md border border-yellow-200 text-sm">
                        Nota: Se requiere una sesión activa para subir documentos. Complete los pasos anteriores si no se ha generado una.
                    </div>
                )}
               {DOCUMENTS.map((doc) => (
                   <div key={doc.key} className="space-y-2">
                       <Label>{doc.label}</Label>
                       <FileUploadField 
                            name={doc.key as any} 
                            register={register} 
                            errors={errors} 
                            watch={watch} 
                            setValue={setValue} 
                            sessionId={sessionId}
                       />
                   </div>
               ))}
           </CardContent>
       </Card>
    </div>
  )
}

function FileUploadField({ name, register, errors, watch, setValue, sessionId }: any) {
    const filePath = watch(name) // This is now a string path
    const [uploading, setUploading] = useState(false)
    const [fileName, setFileName] = useState<string | null>(null) // To show user what they uploaded since value is path

    const handleFile = async (files: FileList | null) => {
        if (!files || files.length === 0) return
        if (!sessionId) {
            alert("No hay sesión activa. Por favor guarde el paso 1 primero.")
            return
        }

        const file = files[0]
        setUploading(true)

        const formData = new FormData()
        formData.append("file", file)
        formData.append("sessionId", sessionId)
        formData.append("fieldName", name)

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            })

            if (!res.ok) throw new Error("Upload failed")

            const data = await res.json()
            if (data.success) {
                setValue(name, data.filePath, { shouldValidate: true })
                setFileName(file.name)
            } else {
                alert("Error subiendo archivo")
            }
        } catch (error) {
            console.error(error)
            alert("Error al subir el archivo")
        } finally {
            setUploading(false)
        }
    }
    
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        handleFile(e.dataTransfer.files)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files)
    }

    const removeFile = () => {
        setValue(name, "")
        setFileName(null)
    }

    return (
        <div 
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-colors relative
                ${errors[name] ? "border-destructive/50 bg-destructive/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-accent/50"}
                ${uploading ? "opacity-50 pointer-events-none" : ""}
            `}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input 
                type="file" 
                id={name} 
                className="hidden" 
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
            />
            
            {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                    <p className="text-sm font-medium animate-pulse">Subiendo...</p>
                </div>
            )}
            
            {!filePath ? (
                <label htmlFor={name} className="cursor-pointer flex flex-col items-center gap-2 w-full h-full">
                    <div className="p-3 bg-secondary rounded-full">
                        <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Click para subir o arrastra un archivo</p>
                        <p className="text-xs text-muted-foreground">PDF, JPG o PNG (Max 5MB)</p>
                    </div>
                </label>
            ) : (
                <div className="flex items-center gap-4 w-full p-2 bg-secondary/20 rounded-lg border">
                    <div className="p-2 bg-primary/10 rounded">
                        <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                        <p className="text-sm font-medium truncate">{fileName || filePath.split('/').pop()}</p>
                        <p className="text-xs text-muted-foreground text-green-600">Subido correctamente</p>
                    </div>
                    <button type="button" onClick={removeFile} className="p-1 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}
             {errors[name] && <p className="text-destructive text-xs mt-2 w-full text-left">{errors[name].message as string}</p>}
        </div>
    )
}
