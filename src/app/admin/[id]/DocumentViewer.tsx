"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FileText, Download, ExternalLink, Eye } from "lucide-react"

export function DocumentViewer({ documents }: { documents: any[] }) {
  const [selectedDoc, setSelectedDoc] = useState<any>(documents && documents.length > 0 ? documents[0] : null)

  if (!documents || documents.length === 0) {
      return (
          <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
              <FileText className="w-12 h-12 mb-4 opacity-50" />
              <p>No se han subido documentos.</p>
          </div>
      )
  }

  const getDocTypeName = (type: string) => {
      switch(type) {
          case "ACTA_CONSTITUTIVA": return "Acta Constitutiva"
          case "ACTAS_ASAMBLEA": return "Actas Asamblea"
          case "COMPROBANTE_DOMICILIO_EMPRESA": return "Comp. Domicilio"
          case "IDENTIFICACION_REP_LEGAL": return "ID Rep. Legal"
          case "COMPROBANTE_DOMICILIO_REP_LEGAL": return "Comp. Dom. Rep"
          case "CONSTANCIA_SITUACION_FISCAL": return "CSF"
          default: return type
      }
  }

  return (
    <div className="flex flex-col gap-6">
        {/* Document Tabs */}
        <div className="flex flex-wrap gap-2">
            {documents.map((doc) => (
                <Button
                    key={doc.id}
                    variant={selectedDoc?.id === doc.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDoc(doc)}
                    className="text-xs"
                >
                    {getDocTypeName(doc.type)}
                </Button>
            ))}
        </div>

        {/* Viewer */}
        {selectedDoc && (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">{getDocTypeName(selectedDoc.type)}</h3>
                        <p className="text-xs text-muted-foreground">{selectedDoc.originalName}</p>
                    </div>
                    <a href={selectedDoc.fileUrl} target="_blank" rel="noreferrer">
                         <Button size="sm" variant="ghost">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Abrir en nueva pestaña
                         </Button>
                    </a>
                </div>
                
                <div className="border rounded-lg bg-white h-[600px] relative overflow-hidden shadow-sm">
                    {selectedDoc.fileUrl.match(/\.(jpeg|jpg|png)$/i) ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                            src={selectedDoc.fileUrl} 
                            alt="Document Preview" 
                            className="w-full h-full object-contain p-4"
                        />
                    ) : (
                        <iframe 
                            src={selectedDoc.fileUrl} 
                            className="w-full h-full"
                            title="Document Preview"
                        />
                    )}
                </div>
            </div>
        )}
    </div>
  )
}
