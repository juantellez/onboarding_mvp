import { PDFDocument, rgb } from 'pdf-lib'
import fs from 'fs/promises'
import path from 'path'

export async function generateOnboardingPDF(session: any) {
    try {
        const templatePath = path.join(process.cwd(), 'public', 'template_apertura.pdf')
        const templateBytes = await fs.readFile(templatePath)

        const pdfDoc = await PDFDocument.load(templateBytes)
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const secondPage = pages[1] // Assuming multi-page form

        const { company, legalRepresentatives, transactionProfile } = session
        console.log("PDF Generator Session Data:", { 
            companyName: company?.razonSocial, 
            rfc: company?.rfc, 
            hasAddress: !!company?.address,
            repName: legalRepresentatives?.[0]?.nombre
        })

        const rep = legalRepresentatives?.[0] || {}

        // Helper to draw text
        const draw = (text: string, x: number, y: number, page = firstPage) => {
            if (!text && text !== "0") { 
                 return
            }
            try {
                page.drawText(String(text), {
                    x,
                    y,
                    size: 10,
                    color: rgb(0, 0, 0), // Revert to Black
                })
            } catch (e) {
                console.error("Error drawing text:", text, e)
            }
        }

        // Page 1: General Info
        // Razon Social (Row 1)
        draw(company?.razonSocial, 330, 645) 
        // RFC (Row 2)
        draw(company?.rfc, 330, 620)
        // Giro (Row 5 - Sector)
        draw(company?.sectorGiro, 330, 545)

        // Address - commenting out as it doesn't match visible Page 1 fields
        /*
        const addr = company?.address || {}
        draw(addr.calle, 130, 470) 
        draw(addr.numExt, 480, 470)
        draw(addr.colonia, 130, 445)
        draw(addr.cp, 480, 445)
        draw(addr.ciudad, 130, 420)
        draw(addr.estado, 400, 420)
        */

        // Contact Area (Approx Y=485)
        draw(company?.telefono, 330, 485)
        draw(company?.email, 330, 460)

        // Page 2: Transactional
        if (transactionProfile) {
            draw(transactionProfile.depositoInicial, 330, 650, secondPage)
            draw(transactionProfile.depositosMensualesCant, 330, 630, secondPage)
        }

        // Legal Rep
        if (rep) {
            draw(rep.nombre, 330, 300)
            draw(rep.rfc, 330, 275)
        }
        
        // Serialize
        const pdfBytes = await pdfDoc.save()
        
        // Save to uploads with TIMESTAMP to avoid caching
        const timestamp = Date.now()
        const fileName = `Formato_Apertura_${session.company?.razonSocial?.replace(/[^a-zA-Z0-9]/g, '_') || 'Empresa'}_${timestamp}.pdf`
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', session.id)
        
        // Ensure dir exists (it should if docs were uploaded, but safety check)
        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        const filePath = path.join(uploadDir, fileName)
        await fs.writeFile(filePath, pdfBytes)

        return { 
            success: true, 
            filePath: `/uploads/${session.id}/${fileName}`,
            fileName 
        }

    } catch (error) {
        console.error("PDF Generation Error:", error)
        return { success: false, error }
    }
}
