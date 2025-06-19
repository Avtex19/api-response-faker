import {useEffect, useState} from "react";
import fakeAxios from "../../../axios.ts";
import type {IFakerRuleForm} from "./FakeRuleModel/FakeRuleForm.ts";
import {ClipLoader} from "react-spinners";
import {DataGrid, type GridRenderCellParams} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper'
import {JsonEditor} from "json-edit-react";


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


    return <>
        <div className={'flex justify-center items-center m-auto p-3'}>
            <ClipLoader
                color={'blue'}
                size={30}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="spinner"
            />
        </div>
        {rules.length === 0 && !loading && <div className={'text-center text-zinc-500'}>No rules present, try adding one</div>}
        {rules.length !== 0 && !loading &&
            <div className={'flex justify-center items-center w-full my-5'}>
                <Paper sx={{height: "600px", width: '95%'}}>
                    <DataGrid
                        disableRowSelectionOnClick
                        rows={rules.map((rule, id) => {
                            return {...rule, id}
                        })}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                alignItems: 'start',
                                whiteSpace: 'pre-wrap',
                                paddingTop: '12px',
                                paddingBottom: '12px',
                            },
                        }}
                        getRowHeight={() => 'auto'}
                        checkboxSelection={false}
                        autoPageSize={true}
                        columns={[{field: 'method', headerName: 'Method'}, {
                            field: 'path',
                            headerName: 'Path'
                        }, {field: 'code', headerName: 'Status Code', width: 300},
                            {
                                field: 'body', headerName: 'Body JSON', width: 300, flex: 1,

                                renderCell: (params: GridRenderCellParams) => {
                                    return <div><JsonEditor rootName={''} viewOnly={true}
                                                            data={JSON.parse(params.value === "" ? "{}" : params.value)}></JsonEditor></div>
                                }
                            },

                            {
                                field: 'response',
                                headerName: 'Response JSON',
                                width: 200,
                                flex: 1,

                                renderCell: (params: GridRenderCellParams) => {
                                    return <div><JsonEditor rootName={''} viewOnly={true}
                                                            data={JSON.parse(params.value === "" ? "{}" : params.value)}></JsonEditor></div>
                                }
                            }]}
                    />
                </Paper>
            </div>}
    </>

}