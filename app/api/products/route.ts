
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'products.json');

// Helper function to read data from JSON file
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

// Helper function to write data to JSON file
const writeData = (data: any) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

export async function GET() {
  const products = readData();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProduct = await request.json();
  const products = readData();
  products.push(newProduct);
  writeData(products);
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  const updatedProduct = await request.json();
  let products = readData();
  products = products.map((p: any) => (p.id === updatedProduct.id ? updatedProduct : p));
  writeData(products);
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  let products = readData();
  products = products.filter((p: any) => p.id !== id);
  writeData(products);
  return NextResponse.json({ id });
}
