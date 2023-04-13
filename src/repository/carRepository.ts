import db from "../config/database.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getCars() {
  const cars = prisma.cars.findMany();
  return cars;
}

async function getCar(id: number) {
  const car = prisma.cars.findUnique({ where: { id: id } });
  return car;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = prisma.cars.findUnique({
    where: { licensePlate: licensePlate },
  });
  return data;
}

async function createCar(
  model: string,
  licensePlate: string,
  year: number,
  color: string
) {
  await db.query(
    `INSERT INTO cars (model, "licensePlate", year, color)
     VALUES ($1, $2, $3, $4)`,
    [model, licensePlate, year, color]
  );
}

async function deleteCar(id: number) {
  await db.query(`DELETE FROM cars WHERE id = $1`, [id]);
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar,
};

export default carRepository;
