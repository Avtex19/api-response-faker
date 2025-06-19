export interface IFakerRuleForm {
    method: "POST" | "PUT" | "DELETE" | "GET",
    code:  "200 OK"
        | "201 CREATED"
        | "404 NOT_FOUND"
        | "401 Unauthorized"
        | "403 Forbidden"
        | "500 Internal_Server_Error"
    ,
    path: string
    responseJson: Record<string, unknown> | null,
}



