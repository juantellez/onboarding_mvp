import { getOnboardingSessions } from "@/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"
import { Button } from "@/components/ui/Button"

export default async function AdminDashboard() {
  const { sessions } = await getOnboardingSessions()

  return (
    <div className="p-8 space-y-8 bg-muted/20 min-h-screen">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold tracking-tight">Panel de Revisión (Admin)</h1>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Solicitudes de Onboarding</CardTitle>
        </CardHeader>
        <CardContent>
            {!sessions || sessions.length === 0 ? (
                <p className="text-muted-foreground p-4 text-center">No hay solicitudes registradas.</p>
            ) : (
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm border-collapse">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Empresa</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estatus</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {sessions.map((session: any) => (
                                <tr key={session.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{session.id.substring(0, 8)}...</td>
                                    <td className="p-4 align-middle">{session.company?.razonSocial || "N/A"}</td>
                                    <td className="p-4 align-middle">{new Date(session.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${session.status === 'APPROVED' ? 'bg-green-100 text-green-800 border-green-200' : 
                                              session.status === 'REJECTED' ? 'bg-red-100 text-red-800 border-red-200' : 
                                              'bg-yellow-100 text-yellow-800 border-yellow-200'
                                            }`}>
                                            {session.status}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <Link href={`/admin/${session.id}`}>
                                            <Button size="sm" variant="outline">Ver Detalles</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}
