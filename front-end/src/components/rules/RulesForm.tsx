import {type JsonData, JsonEditor} from "json-edit-react";
import {useState} from "react";
import {Button} from "../html/Button.tsx";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import type {Code, Method} from "./FakeRuleModel/rule.ts";
import fakeAxios from "../../../axios.ts";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";

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
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<IFakerRuleForm>({
        code: "200 OK",
        path: '/users',
        method: 'GET',
        responseJson: {}
    })


    return <form className={'w-fit my-5 m-auto flex flex-col gap-3 p-5 bg-neutral-50'}
                 onSubmit={async (e) => {
                     e.preventDefault();
                     try {
                         setLoading(true)
                         await fakeAxios.post('/rules', formData)
                         setLoading(false)
                         toast('rule added successfully')
                     } catch (err) {
                         setLoading(false)
                         toast("Rule already exists!")
                     }
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

        <div className={'flex justify-center items-center bg-green-300 p-3 hover:brightness-90'}>{loading ? <ClipLoader
            color={'green'}
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> : <Button
            className={'bg-inherit rounded-xl hover:cursor-pointer hover:brightness-100 '}>Submit Rule</Button>}</div>
    </form>
}