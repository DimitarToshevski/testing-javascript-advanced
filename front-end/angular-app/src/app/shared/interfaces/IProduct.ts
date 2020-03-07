import { IBaseDTO } from "./IBaseDTO";

export interface IProduct extends IBaseDTO {
  name: string;
  quantity: number;
}
