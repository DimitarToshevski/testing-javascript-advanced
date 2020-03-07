import { InjectionToken } from "@angular/core";

export const API_PREFIX = new InjectionToken("API_PREFIX", {
  factory: () => "http://localhost:3000/api",
  providedIn: "root"
});
