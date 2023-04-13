import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCars() {
  const cars = await prisma.cars.findMany();
  return cars;
}

async function getCar(id: number) {
  const car = await prisma.cars.findUnique({ where: { id: id } });
  return car;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = await prisma.cars.findFirst({
    where: {
      licensePlate: licensePlate,
    },
  });
  return data;
}

async function createCar(
  model: string,
  licensePlate: string,
  year: number,
  color: string
) {
  await prisma.cars.create({
    data: {
      model,
      licensePlate,
      year,
      color,
    },
  });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({ where: { id } });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
};

export default carRepository;
