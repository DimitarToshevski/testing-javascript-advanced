import { Pipe, PipeTransform } from "@angular/core";

const errorMessagesMap = {
  max: "Enter a number less than ",
  required: "The field is required.",
  customError: "The value you entered is invalid."
};

@Pipe({
  name: "errorMessage"
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: Array<string>, maximumAmount: number): string {
    return errorMessagesMap[value[0]]
      ? errorMessagesMap[value[0]] + (value[0] === "max" ? maximumAmount : "")
      : errorMessagesMap["customError"];
  }
}
