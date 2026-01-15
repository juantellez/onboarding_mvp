import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

export function DataViewer({ session }: { session: any }) {
  const Section = ({ title, data }: { title: string, data: any }) => {
      if (!data) return null
      return (
          <Card className="mb-6">
              <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium text-primary">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {Object.entries(data).map(([key, value]) => {
                          if (key === 'id' || key.endsWith('Id') || key === 'createdAt' || key === 'updatedAt' || typeof value === 'object') return null
                          
                          // Format boolean
                          let displayValue: any = value
                          if (typeof value === 'boolean') displayValue = value ? 'Sí' : 'No'
                          if (value === null || value === undefined) displayValue = '-' // Was 'N/A' but '-' is cleaner

                          // Format standard keys
                          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

                          return (
                              <div key={key}>
                                  <dt className="text-muted-foreground text-xs">{label}</dt>
                                  <dd className="font-medium text-gray-900 truncate" title={String(displayValue)}>{String(displayValue)}</dd>
                              </div>
                          )
                      })}
                  </dl>
                  
                  {/* Handle Nested Objects explicitly if needed or recursive */}
                  {data.address && (
                       <div className="mt-4 pt-4 border-t">
                           <h4 className="text-xs font-semibold mb-2">Dirección</h4>
                           <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                {Object.entries(data.address).map(([key, value]) => {
                                      if (key === 'id' || key.endsWith('Id')) return null
                                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
                                      return (
                                          <div key={key}>
                                              <dt className="text-muted-foreground text-xs">{label}</dt>
                                              <dd className="font-medium">{String(value || '-')}</dd>
                                          </div>
                                      )
                                })}
                           </dl>
                       </div>
                  )}
              </CardContent>
          </Card>
      )
  }

  return (
    <div className="space-y-4">
        <Section title="Información General" data={session.company} />
        
        {session.legalRepresentatives?.map((rep: any, idx: number) => (
             <Section key={rep.id} title={`Representante Legal ${idx + 1}`} data={rep} />
        ))}
        
        {session.beneficialOwners?.map((bo: any, idx: number) => (
             <Section key={bo.id} title={`Propietario Real ${idx + 1}`} data={bo} />
        ))}

        <Section title="Perfil Transaccional" data={session.transactionProfile} />
    </div>
  )
}
