"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { updateSessionStatus, regeneratePDF } from "@/actions/admin"
import { useRouter } from "next/navigation"
import { Loader2, RefreshCcw } from "lucide-react"

export function AdminActions({ sessionId, currentStatus }: { sessionId: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleUpdate = async (newStatus: string) => {
        if (!confirm(`¿Estás seguro de cambiar el estatus a ${newStatus}?`)) return

        setLoading(true)
        try {
            await updateSessionStatus(sessionId, newStatus)
            router.refresh()
        } catch (error) {
            alert("Error actualizando estatus")
        } finally {
            setLoading(false)
        }
    }

    const handleRegenerate = async () => {
        setLoading(true)
        try {
            const res = await regeneratePDF(sessionId)
            if (res.success) {
                alert("PDF Regenerado correctamente")
                router.refresh()
            } else {
                alert("Error al regenerar PDF")
            }
        } catch (error) {
            alert("Error de conexión")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2 items-center">
            <Button 
                size="sm" 
                variant="outline"
                onClick={handleRegenerate}
                disabled={loading}
                title="Regenerar PDF con datos actuales"
            >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4 mr-2" />}
                Regenerar PDF
            </Button>

            {currentStatus !== "APPROVED" && (
                <Button 
                    size="sm" 
                    className="bg-green-600 hover:bg-green-700" 
                    onClick={() => handleUpdate("APPROVED")}
                    disabled={loading}
                >
                    Aprobar
                </Button>
            )}
            
            {currentStatus !== "REJECTED" && (
                <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleUpdate("REJECTED")}
                    disabled={loading}
                >
                    Rechazar
                </Button>
            )}
        </div>
    )
}
