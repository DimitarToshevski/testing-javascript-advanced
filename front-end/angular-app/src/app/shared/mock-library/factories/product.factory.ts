import { IProduct } from "@shared/interfaces";

export function createProduct({
  id = "1234-678-9101",
  name = "Milk",
  quantity = 23
}: IProduct): IProduct {
  return { id, name, quantity };
}
