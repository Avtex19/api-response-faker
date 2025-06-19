import {useEffect, useState} from "react";
import fakeAxios from "../../../axios.ts";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import {ClipLoader} from "react-spinners";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'

export const RulesTable = () => {
    const [rules, setRules] = useState<IFakerRuleForm[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getRules = async () => {
            try {
                setLoading(true)
                const request = await fakeAxios.get('/rules')
                const data = request.data as IFakerRuleForm[];
                setRules(data)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }

        getRules()
    }, []);

    if (loading) {
        return <div className={'flex justify-center items-center my-10 p-3'}><ClipLoader
            color={'blue'}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
    }

    return rules.length === 0 ? <div className={'text-center'}>There are no rules added, try adding one!</div> :
        <div className={'flex justify-center items-center w-full my-5'}>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rules.map((rule, id) => {
                        return {...rule, id}
                    })}
                    checkboxSelection={false}
                    autoPageSize={true}
                    columns={[{field: 'method', width: 300}, {field: 'path', width: 300}, {field: 'code', width: 300}]}
                />
            </Paper>
        </div>

}