import { IBaseDTO } from "@shared/interfaces";

export function createBaseDTO({ id = "1232131" }: IBaseDTO): IBaseDTO {
  return { id };
}
