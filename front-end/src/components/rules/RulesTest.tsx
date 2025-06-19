import type {Method} from "./FakeRuleModel/rule.ts";
import {METHODS} from "../../common/methods.ts";
import {PATHS} from "../../common/paths.ts";
import {useState} from "react";
import {filterPathBasedOnMethod} from "../../common/filterPathBasedOnMethod.ts";
import {Button} from "@mui/material";

export const RulesTest = () => {
    const [formData, setFormData] = useState<{
        method: Method,
        path: string,
        identifier: string | null
    }>({
        method: 'POST',
        path: '/users',
        identifier: null
    })
    return <form className={'flex items-center justify-center my-5 gap-3'}>
        <div className={'flex justify-start items-center'}>
            <select className={'bg-gray-50 text-zinc-500  font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({
                        ...formData, method: e.target.value as Method,
                        path: filterPathBasedOnMethod(e.target.value as Method, Object.values(PATHS))[0]
                    })}
            >
                {Object.values(METHODS).map(option => <option key={option}>{option}</option>)}
            </select>
        </div>

        <div className={' bg-gray-50 flex items-center justify-start items-center'}>
            <select className={'text-zinc-500 font-bold p-2 rounded-xl'}
                    onChange={(e) => setFormData({...formData, path: e.target.value as string})}

            >
                {filterPathBasedOnMethod(formData.method, Object.values(PATHS)).map(option =>
                    <option key={option}>{option}</option>)}

            </select>
        </div>

        {formData.path.includes(':id') &&
            <div className={'bg-gray-50 flex items-center justify-start items-center gap-3'}>
                <input className={'text rounded border-2 border-zinc-500 text-zinc-500'} required
                       onChange={(e) => setFormData({...formData, identifier: e.target.value as string})}
                ></input>
            </div>}

        <Button type={'submit'} >Call API</Button>
    </form>

}

