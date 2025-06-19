import type {Code, Method} from "./rule.ts";
import type {JsonData} from "json-edit-react";

export interface IFakerRuleForm {
    method: Method,
    code: Code,
    path: string
    response: JsonData | null,
}