import { IResponse } from "@shared/interfaces";

export function createServerResponse({
  message = "some message from the server",
  data = "some data"
}: IResponse): IResponse {
  return { message, data };
}
