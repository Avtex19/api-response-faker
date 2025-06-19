import Header from "./components/Header.tsx";
import {useState} from "react";
import {RulesForm} from "./components/rules/RulesForm.tsx";

function App() {
    const [rulesView, setRulesView] = useState<"CREATE" | "PREVIEW">("CREATE");

    return (<div className={'w-full'}>
            <Header rulesView={rulesView} setRulesView={setRulesView} />
            {
                rulesView === "CREATE" && <RulesForm/>
            }
        </div>
  )
}

export default App
