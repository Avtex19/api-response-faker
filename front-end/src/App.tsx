import Header from "./components/Header.tsx";
import {useState} from "react";
import {RulesForm} from "./components/rules/RulesForm.tsx";
import {ToastContainer} from "react-toastify";
import {RulesTable} from "./components/rules/RulesTable.tsx";
import {RulesTest} from "./components/rules/RulesTest.tsx";

function App() {
    const [rulesView, setRulesView] = useState<"CREATE" | "PREVIEW" | "TEST">("CREATE");

    return (<div className={'w-full'}>
            <ToastContainer toastStyle={{
                color: 'black'
            }}
            />

            <Header rulesView={rulesView} setRulesView={setRulesView}/>
            {
                rulesView === "CREATE" && <RulesForm/>
            }
            {
                rulesView === "PREVIEW" && <RulesTable/>
            }
            {rulesView === "TEST" && <RulesTest/>}
        </div>
    )
}

export default App
