import {type JsonData, JsonEditor} from "json-edit-react";
import {useState} from "react";
import {Button} from "../html/Button.tsx";

const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}


const PATHS = {
    USERS: "/users",
    PRODUCTS: "/products",
}

const RESPONSE_CODES = {
    200: "200 OK",
    201: "201 CREATED",
    404: "404 NOT_FOUND",
    401: "401 Unauthorized",
    403: "403 Forbidden",
    500: "500 Internal_Server_Error",
}


export const RulesForm = () => {
    const [responseJSON, setResponseJSON] = useState<JsonData>({

    })

    return <form className={'w-fit my-5 m-auto flex flex-col gap-3 p-5 bg-neutral-50'}
        onSubmit={(e) => {
            e.preventDefault();
        }}
    >
        <div className={'flex justify-start items-center'}>
            <label className={'text-zinc-500'}>Choose Method:</label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}>
                {Object.values(METHODS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
        <div className={'flex items-center justify-start items-center'}>


            <label className={'text-zinc-500'}>Choose Path: </label>
            <select className={'text-zinc-500 font-bold p-2 rounded-xl'}>
                {Object.values(PATHS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>

        <div className={'flex items-center justify-start items-center'}>


            <label className={'text-zinc-500'}>Response Code: </label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}>
                {Object.values(RESPONSE_CODES).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>


        <div className={'flex flex-col'}>
            <label className={'text-zinc-500'}>Response JSON</label>
            <JsonEditor
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