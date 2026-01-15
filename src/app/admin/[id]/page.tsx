import { getOnboardingSessionById } from "@/actions/admin"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { DataViewer } from "./DataViewer"
import { DocumentViewer } from "./DocumentViewer"
import { AdminActions } from "./AdminActions"

export default async function AdminSessionDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { session } = await getOnboardingSessionById(id)

  if (!session) {
      notFound()
  }

  return (
    <div className="flex flex-col h-screen bg-muted/20">
      {/* Header */}
      <div className="h-16 border-b bg-background px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
              <Link href="/admin">
                  <Button variant="ghost" size="sm">← Volver</Button>
              </Link>
              <div>
                  <h1 className="text-lg font-semibold">{session.company?.razonSocial || "Solicitud sin nombre"}</h1>
                  <p className="text-xs text-muted-foreground">ID: {session.id} • {new Date(session.createdAt).toLocaleDateString()}</p>
              </div>
          </div>
          <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-bold mr-4
                  ${session.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                    session.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                  {session.status}
              </span>
              <AdminActions sessionId={session.id} currentStatus={session.status} />
          </div>
      </div>

      {/* Split Screen Content */}
      <div className="flex-1 flex overflow-hidden">
          {/* Left: Data (Scrollable) */}
          <div className="w-1/2 border-r bg-background overflow-y-auto p-6">
              <h2 className="text-xl font-bold mb-6">Datos Capturados</h2>
              <DataViewer session={session} />
          </div>

          {/* Right: Docs (Fixed/Scrollable panel) */}
          <div className="w-1/2 bg-slate-50 overflow-y-auto p-6">
               <h2 className="text-xl font-bold mb-6">Documentos</h2>
               <DocumentViewer documents={session.documents} />
          </div>
      </div>
    </div>
  )
}
