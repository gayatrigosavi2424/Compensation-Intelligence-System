import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id1 = searchParams.get("id1");
    const id2 = searchParams.get("id2");

    if (!id1 || !id2) {
      return NextResponse.json(
        { error: "Must provide both id1 and id2" },
        { status: 400 }
      );
    }

    const [salary1, salary2] = await Promise.all([
      prisma.salary.findUnique({ where: { id: id1 } }),
      prisma.salary.findUnique({ where: { id: id2 } }),
    ]);

    if (!salary1 || !salary2) {
      return NextResponse.json({ error: "Salary not found" }, { status: 404 });
    }

    // Try to extract level numbers to compute difference
    const levelNum1 = parseInt(salary1.levelStandardized.replace(/[^0-9]/g, "")) || 0;
    const levelNum2 = parseInt(salary2.levelStandardized.replace(/[^0-9]/g, "")) || 0;
    const levelDifference = Math.abs(levelNum1 - levelNum2);

    return NextResponse.json({
      data: {
        salary1,
        salary2,
        comparison: {
          baseDifference: salary1.baseSalary - salary2.baseSalary,
          bonusDifference: salary1.bonus - salary2.bonus,
          stockDifference: salary1.stock - salary2.stock,
          totalDifference: salary1.totalCompensation - salary2.totalCompensation,
          levelDifference,
        },
      },
    });
  } catch (error) {
    console.error("Compare error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
