import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const sessionId = formData.get("sessionId") as string;
    const fieldName = formData.get("fieldName") as string;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!sessionId) {
        return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique directory for session if not exists
    const uploadDir = path.join(process.cwd(), "public", "uploads", sessionId);
    
    if (!existsSync(uploadDir)) {
        await fs.mkdir(uploadDir, { recursive: true });
    }

    // Sanitize filename to prevent issues
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    // Add timestamp to prevent overwrites or just use fieldname if we want strict 1:1
    // Using original name is better for user visibility, but maybe prefix with fieldName
    const finalName = `${fieldName}_${Date.now()}_${safeName}`;
    const filePath = path.join(uploadDir, finalName);

    await fs.writeFile(filePath, buffer);

    // Return the relative path for public access
    const publicPath = `/uploads/${sessionId}/${finalName}`;

    return NextResponse.json({ 
        success: true, 
        filePath: publicPath,
        originalName: file.name
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
