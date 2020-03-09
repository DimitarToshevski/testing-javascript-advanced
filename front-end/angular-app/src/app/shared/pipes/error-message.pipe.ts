import { Pipe, PipeTransform } from "@angular/core";

const errorMessagesMap = {
  max: "Enter a number less than ",
  required: "The field is required.",
  customError: "The value you entered is invalid"
};

@Pipe({
  name: "errorMessage"
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: string, maximumAmount: string): string {
    return errorMessagesMap[value]
      ? errorMessagesMap[value] + (value === "max" ? maximumAmount : "")
      : errorMessagesMap["customError"];
  }
}
