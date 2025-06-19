import Header from "./components/Header.tsx";
import {useState} from "react";
import {RulesForm} from "./components/rules/RulesForm.tsx";
import {ToastContainer} from "react-toastify";
import {RulesTable} from "./components/rules/RulesTable.tsx";

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
        </div>
    )
}

export default App
