import {type JsonData, JsonEditor} from "json-edit-react";
import {useState} from "react";
import {Button} from "../html/Button.tsx";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import type {Code, Method} from "./FakeRuleModel/rule.ts";
import fakeAxios from "../../../axios.ts";
import {ClipLoader} from "react-spinners";
import {toast} from "react-toastify";
import {METHODS} from "../../common/methods.ts";
import {PATHS} from "../../common/paths.ts";
import {RESPONSE_CODES} from "../../common/responseCodes.ts";
import {filterPathBasedOnMethod} from "../../common/filterPathBasedOnMethod.ts";


export const RulesForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<IFakerRuleForm>({
        code: "200 OK",
        path: '/users',
        identifier: null,
        method: 'POST',
        response: {
            statusText: "OK",
            statusCode: 200
        },
        body: {}
    })


    return <form className={'w-fit my-5 m-auto flex flex-col gap-3 p-5 bg-neutral-50'}
                 onSubmit={async (e) => {
                     e.preventDefault();
                     try {
                         const {code, method, response, path, identifier, body} = formData
                         const pathWithId = identifier ? path.replace(':id', identifier) : path
                         setLoading(true)
                         await fakeAxios.post('/rules', {code, method, response, pathWithId, body})
                         setLoading(false)
                         toast('Rule added successfully')
                     } catch (err) {
                         setLoading(false)
                         toast("Rule already exists!")
                     }
                 }}
    >
        <div className={'flex justify-start items-center'}>
            <label className={'text-zinc-500'}>Choose Method:</label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({
                        ...formData, method: e.target.value as Method,
                        path: filterPathBasedOnMethod(e.target.value as Method, Object.values(PATHS))[0]
                    })}
            >
                {Object.values(METHODS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>
        <div className={'flex items-center justify-start items-center'}>
            <label className={'text-zinc-500'}>Choose Path: </label>
            <select className={'text-zinc-500 font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({...formData, path: e.target.value as string})}

            >
                {filterPathBasedOnMethod(formData.method, Object.values(PATHS)).map(option =>
                    <option key={option}>{option}</option>)}
            </select>
        </div>
        {formData.path.includes(':id') && <div className={'flex items-center justify-start items-center gap-3'}>
            <label className={'text-zinc-500'}>Identifier: </label>
            <input className={'text rounded border-2 border-zinc-500 text-zinc-500'}
                   onChange={(e) => setFormData({...formData, identifier: e.target.value as string})}
            ></input>
        </div>}
        <div className={'flex items-center justify-start items-center'}>

            <label className={'text-zinc-500'}>Response Code: </label>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({
                        ...formData, response: {
                            ...formData.response ?? {},
                            statusCode: (e.target.value as Code).split(" ")[0],
                            statusText: (e.target.value as Code).split(" ")[1]
                        }, code: e.target.value as Code
                    })}
            >
                {Object.values(RESPONSE_CODES).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>

        {(['POST', 'PUT', 'PATCH'].includes(formData.method)) && <div className={'flex flex-col'}>
            <label className={'text-zinc-500'}>Body JSON</label>
            <JsonEditor
                rootName={''}
                data={formData.body}
                setData={(data: JsonData) => {
                    setFormData({
                        ...formData,
                        body: data
                    })
                }}
            />
        </div>}
        {<div className={'flex flex-col'}>
            <label className={'text-zinc-500'}>Response JSON</label>

            <JsonEditor
                rootName={''}
                data={formData.response}
                setData={(data: JsonData) => {
                    setFormData({
                        ...formData,
                        response: data
                    })
                }}
            />
        </div>}


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