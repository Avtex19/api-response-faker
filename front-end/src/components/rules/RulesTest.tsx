import type {Method} from "./FakeRuleModel/rule.ts";
import {METHODS} from "../../common/methods.ts";
import {PATHS} from "../../common/paths.ts";
import {useState} from "react";
import {filterPathBasedOnMethod} from "../../common/filterPathBasedOnMethod.ts";
import {Button} from "@mui/material";
import {axiosSwitchRequest} from "../../common/axiosSwitchRequest.ts";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import {type JsonData, JsonEditor} from "json-edit-react";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";

export const RulesTest = () => {
    const [formData, setFormData] = useState<{
        method: Method,
        path: string,
        body: unknown
        identifier: string | null
    }>({
        method: 'POST',
        path: '/users',
        body: {},
        identifier: null
    })
    const [loading, setLoading] = useState<boolean>(false);

    const [dataToDisplay, setDataToDisplay] = useState<IFakerRuleForm[]>([])

    return <div className={'flex items-center flex-col'}>
        <form className={'flex items-end justify-center my-5 gap-3'}
              onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                      const {method, path, identifier, body} = formData

                      const pathWithId = identifier ? path.replace(':id', identifier) : path
                      setLoading(true)
                      const data =  (await axiosSwitchRequest(method, pathWithId, body)).data as IFakerRuleForm[]
                      toast('Response for this rule exist in the database!')
                      setDataToDisplay(data)
                      setLoading(false)
                  } catch (err: any) {
                      if (err.response.status === 404) {
                          toast.error('Response for this rule doesnt exist in the database!')
                      }
                      setDataToDisplay([])
                      setLoading(false)

                  }
              }}
        >
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

            <Button type={'submit'}>Call API</Button>
        </form>

        <div className={'flex flex-col gap-3 items-center my-10'}>
            <h1 className={'font-bold'}>Result</h1>
            <ClipLoader
                className={'m-auto'}
                color={'blue'}
                size={30}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="spinner"
            />
            {!loading && <div className={'flex justify-center items-center m-auto p-3'}>
                <JsonEditor rootName={'Response JSON'}
                            data={JSON.parse(dataToDisplay[0]?.response as string ?? "{}")}></JsonEditor>

            </div>}
        </div>
    </div>

}

