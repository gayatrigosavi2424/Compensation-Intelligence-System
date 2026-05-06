import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const data = [
    {
      companyName: 'google',
      originalCompanyName: 'Google',
      role: 'Software Engineer',
      levelStandardized: 'L4',
      location: 'Bangalore, India',
      experienceYears: 3,
      baseSalary: 4500000,
      bonus: 800000,
      stock: 3000000,
      totalCompensation: 8300000,
      confidenceScore: 90,
    },
    {
      companyName: 'google',
      originalCompanyName: 'Google',
      role: 'Software Engineer',
      levelStandardized: 'L5',
      location: 'Bangalore, India',
      experienceYears: 6,
      baseSalary: 7500000,
      bonus: 1500000,
      stock: 5000000,
      totalCompensation: 14000000,
      confidenceScore: 85,
    },
    {
      companyName: 'amazon',
      originalCompanyName: 'Amazon',
      role: 'SDE II',
      levelStandardized: 'L5',
      location: 'Hyderabad, India',
      experienceYears: 4,
      baseSalary: 5000000,
      bonus: 0,
      stock: 2500000,
      totalCompensation: 7500000,
      confidenceScore: 95,
    },
    {
      companyName: 'uber',
      originalCompanyName: 'Uber',
      role: 'Software Engineer II',
      levelStandardized: 'L4',
      location: 'Bangalore, India',
      experienceYears: 3.5,
      baseSalary: 5500000,
      bonus: 550000,
      stock: 4000000,
      totalCompensation: 10050000,
      confidenceScore: 80,
    },
    {
      companyName: 'microsoft',
      originalCompanyName: 'Microsoft',
      role: 'Software Engineer',
      levelStandardized: 'L61',
      location: 'Noida, India',
      experienceYears: 2,
      baseSalary: 3000000,
      bonus: 300000,
      stock: 1200000,
      totalCompensation: 4500000,
      confidenceScore: 88,
    }
  ];

  for (const item of data) {
    await prisma.salary.create({
      data: item,
    });
  }

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
