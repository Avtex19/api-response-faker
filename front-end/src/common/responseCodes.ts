import type {Code} from "../components/rules/FakeRuleModel/rule.ts";

export const RESPONSE_CODES: Code[] = [
    "200 OK",
    "201 CREATED",
    "204 NO_CONTENT",
    "400 BAD_REQUEST",
    "401 UNAUTHORIZED",
    "403 FORBIDDEN",
    "404 NOT_FOUND",
    "409 CONFLICT",
    "422 UNPROCESSABLE_ENTITY",
    "500 INTERNAL_SERVER_ERROR",
    "502 BAD_GATEWAY",
    "503 SERVICE_UNAVAILABLE"
];
