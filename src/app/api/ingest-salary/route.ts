import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { normalizeCompanyName } from "@/lib/utils";

const ingestSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  level_standardized: z.string().min(1, "Level is required"),
  location: z.string().min(1, "Location is required"),
  experience_years: z.number().min(0),
  base_salary: z.number().positive(),
  bonus: z.number().nonnegative().optional().default(0),
  stock: z.number().nonnegative().optional().default(0),
  confidence: z.number().min(1).max(100).optional().default(50),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ingestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const normalizedCompany = normalizeCompanyName(data.company);
    const total_compensation = data.base_salary + data.bonus + data.stock;

    // EDGE CASE MANDATORY: Prevent Duplicate entries
    const existingDuplicate = await prisma.salary.findFirst({
      where: {
        companyName: normalizedCompany,
        role: data.role.trim(),
        levelStandardized: data.level_standardized.trim(),
        experienceYears: data.experience_years,
        baseSalary: data.base_salary,
      }
    });

    if (existingDuplicate) {
      return NextResponse.json(
        { error: "This exact salary package has already been submitted." },
        { status: 409 }
      );
    }

    const salary = await prisma.salary.create({
      data: {
        companyName: normalizedCompany,
        originalCompanyName: data.company.trim(),
        role: data.role.trim(),
        levelStandardized: data.level_standardized.trim(),
        location: data.location.trim(),
        experienceYears: data.experience_years,
        baseSalary: data.base_salary,
        bonus: data.bonus,
        stock: data.stock,
        totalCompensation: total_compensation,
        confidenceScore: data.confidence,
      },
    });

    return NextResponse.json({ success: true, data: salary }, { status: 201 });
  } catch (error) {
    console.error("Ingest error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
