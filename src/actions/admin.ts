"use server"

import { prisma } from "@/lib/prisma"

export async function getOnboardingSessions() {
    try {
        const sessions = await prisma.onboardingSession.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                company: true // Include company name for the list
            }
        })
        return { success: true, sessions }
    } catch (error) {
        console.error("Error fetching sessions:", error)
        return { success: false, error: "Failed to fetch sessions" }
    }
}

export async function getOnboardingSessionById(id: string) {
    try {
        const session = await prisma.onboardingSession.findUnique({
            where: { id },
            include: {
                company: { include: { address: true } },
                legalRepresentatives: { include: { address: true } },
                beneficialOwners: { include: { address: true } },
                transactionProfile: true,
                documents: true,
                managementStructure: { include: { members: true } },
                shareholders: true,
                patrimonialLinks: true
            }
        })
        return { success: true, session }
    } catch (error) {
        console.error("Error fetching session details:", error)
        return { success: false, error: "Failed to fetch session" }
    }
}

import { generateOnboardingPDF } from "@/lib/pdfGenerator"

export async function updateSessionStatus(id: string, status: string) {
    try {
        const result = await prisma.onboardingSession.update({
            where: { id },
            data: { status }
        })

        if (status === 'APPROVED') {
            // Generate PDF
            const sessionData = await getOnboardingSessionById(id)
            if (sessionData.success && sessionData.session) {
                const pdfResult: any = await generateOnboardingPDF(sessionData.session)
                
                if (pdfResult.success) {
                    // Save as a document
                    await prisma.document.create({
                        data: {
                            onboardingSessionId: id,
                            type: "FORMATO_GENERADO",
                            fileUrl: pdfResult.filePath,
                            originalName: pdfResult.fileName,
                            mimeType: "application/pdf",
                            size: 0,
                            status: "GENERATED"
                        }
                    })
                }
            }
        }

        return { success: true }
    } catch (error) {
        console.error("Error updating status:", error)
        return { success: false, error: "Failed to update status" }
    }
    }


export async function regeneratePDF(id: string) {
    try {
        const sessionData = await getOnboardingSessionById(id)
        if (!sessionData.success || !sessionData.session) {
            return { success: false, error: "Session not found" }
        }

        const pdfResult: any = await generateOnboardingPDF(sessionData.session)
        
        if (pdfResult.success) {
             const existing = await prisma.document.findFirst({
                 where: {
                     onboardingSessionId: id,
                     type: "FORMATO_GENERADO"
                 }
             })

             if (existing) {
                 await prisma.document.update({
                     where: { id: existing.id },
                     data: {
                         fileUrl: pdfResult.filePath,
                         originalName: pdfResult.fileName,
                         status: "GENERATED_UPDATED"
                     }
                 })
             } else {
                await prisma.document.create({
                    data: {
                        onboardingSessionId: id,
                        type: "FORMATO_GENERADO",
                        fileUrl: pdfResult.filePath,
                        originalName: pdfResult.fileName,
                        mimeType: "application/pdf",
                        size: 0,
                        status: "GENERATED"
                    }
                })
             }
             return { success: true }
        }
        return { success: false, error: "PDF Generation failed" }

    } catch (error) {
        console.error("Error regenerating PDF:", error)
        return { success: false, error: "Failed to regenerate PDF" }
    }
}
