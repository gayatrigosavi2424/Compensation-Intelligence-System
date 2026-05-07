import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get("company");
    const role = searchParams.get("role");
    const level = searchParams.get("level");
    const location = searchParams.get("location");
    const sortBy = searchParams.get("sortBy") || "totalCompensation";
    const order = searchParams.get("order") || "desc";

    const where: any = {};
    if (company) where.companyName = { contains: company.toLowerCase() };
    if (role) where.role = { contains: role };
    if (level) where.levelStandardized = level;
    if (location) where.location = { contains: location };

    const salaries = await prisma.salary.findMany({
      where,
      orderBy: {
        [sortBy]: order,
      },
      take: 100, // Pagination limit
    });

    return NextResponse.json({ data: salaries });
  } catch (error) {
    console.error("Fetch salaries error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
