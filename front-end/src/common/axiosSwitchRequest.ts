import type {Method} from "../components/rules/FakeRuleModel/rule.ts";
import fakeAxios from "../../axios.ts";

export async function axiosSwitchRequest(method: Method, path: string, body: unknown) {

    switch (method) {
        case 'GET':
            return await fakeAxios.get(path)
        case 'POST':
            return await fakeAxios.post(path, body)
        case 'PUT':
            return await fakeAxios.put(path, body)
        case 'DELETE':
            return await fakeAxios.delete(path)
        case 'PATCH':
            return await fakeAxios.patch(path, body)
    }
}