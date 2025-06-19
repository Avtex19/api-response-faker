import {type JsonData, JsonEditor} from "json-edit-react";
import {useState} from "react";
import {Button} from "../html/Button.tsx";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import type {Code, Method} from "./FakeRuleModel/rule.ts";

const METHODS: Method[] = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
]


const PATHS = {
    USERS: "/users",
    PRODUCTS: "/products",
}

const RESPONSE_CODES: Code[] = [
    "200 OK",
    "201 CREATED",
    "404 NOT_FOUND",
    "401 Unauthorized",
    "403 Forbidden",
    "500 Internal_Server_Error"
]


export const RulesForm = () => {
    const [responseJSON, setResponseJSON] = useState<JsonData>({})

    const [formData, setFormData] = useState<IFakerRuleForm>({
        code: "200 OK",
        path: '/users',
        method: 'GET',
        responseJson: {}
    })


    return <form className={'w-fit my-5 m-auto flex flex-col gap-3 p-5 bg-neutral-50'}
                 onSubmit={(e) => {
                     e.preventDefault();
                     console.log(formData)
                 }}
    >
        <div className={'flex justify-start items-center'}>
            <label className={'text-zinc-500'}>Choose Method:</label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({...formData, method: e.target.value as Method})}
            >
                {Object.values(METHODS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
        <div className={'flex items-center justify-start items-center'}>


            <label className={'text-zinc-500'}>Choose Path: </label>
            <select className={'text-zinc-500 font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({...formData, path: e.target.value as string})}

            >
                {Object.values(PATHS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>

        <div className={'flex items-center justify-start items-center'}>


            <label className={'text-zinc-500'}>Response Code: </label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({...formData, code: e.target.value as Code})}
            >
                {Object.values(RESPONSE_CODES).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>


        <div className={'flex flex-col'}>
            <label className={'text-zinc-500'}>Response JSON</label>
            <JsonEditor
                rootName={''}
                data={responseJSON}
                setData={(data: JsonData) => {
                    setResponseJSON(data)
                }}
            />
        </div>

        <Button
            className={'bg-green-300 rounded p-3 cursor-pointer hover:brightness-90'}>Submit Rule</Button>
    </form>
}