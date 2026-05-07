import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { company: string } }
) {
  try {
    const companyName = params.company.toLowerCase();

    const salaries = await prisma.salary.findMany({
      where: { companyName },
      orderBy: { totalCompensation: "desc" },
    });

    if (salaries.length === 0) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    // Calculate median compensation
    const sortedComps = salaries.map((s) => s.totalCompensation).sort((a, b) => a - b);
    const mid = Math.floor(sortedComps.length / 2);
    const medianCompensation =
      sortedComps.length % 2 !== 0
        ? sortedComps[mid]
        : (sortedComps[mid - 1] + sortedComps[mid]) / 2;

    // Calculate level distribution
    const levelCounts: Record<string, number> = {};
    const levelAvgComp: Record<string, number[]> = {};

    salaries.forEach((s) => {
      levelCounts[s.levelStandardized] = (levelCounts[s.levelStandardized] || 0) + 1;
      if (!levelAvgComp[s.levelStandardized]) {
        levelAvgComp[s.levelStandardized] = [];
      }
      levelAvgComp[s.levelStandardized].push(s.totalCompensation);
    });

    const levelDistribution = Object.entries(levelCounts).map(([level, count]) => {
      const comps = levelAvgComp[level];
      const avg = comps.reduce((a, b) => a + b, 0) / comps.length;
      return { level, count, averageCompensation: avg };
    });

    return NextResponse.json({
      data: {
        company: salaries[0].originalCompanyName,
        medianCompensation,
        totalEntries: salaries.length,
        levelDistribution,
        recentSalaries: salaries.slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Fetch company error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
