import { NextResponse } from 'next/server';
import { MikroORM } from '@mikro-orm/core';
import config from '@/lib/database/mikro-orm.config';
import { Product } from '@/lib/database/entities/Product';

export async function GET() {
  try {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();
    const products = await em.find(Product, {});
    await orm.close();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
