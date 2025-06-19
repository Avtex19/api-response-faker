import {Button} from "./html/Button.tsx";
import classNames from "classnames";
import type {Dispatch, SetStateAction} from "react";

type HeaderProps = {
    rulesView: "CREATE" | "PREVIEW" | "TEST",
    setRulesView: Dispatch<SetStateAction<"CREATE" | "PREVIEW" | "TEST">>
}

export const Header = ({rulesView, setRulesView}:HeaderProps) => {

    return <div className={'flex items-center justify-center gap-5 flex-col'}>
        <h1 className={'text-center text-3xl font-medium p-3'}>API Response Faker</h1>

        <div className={'flex gap-3 items-center'}>
            <Button
                onClick={() => setRulesView('CREATE')}
                className={classNames({
                    'bg-zinc-500': rulesView === 'CREATE',
                    'text-white': rulesView === 'CREATE',
            })}>Create Rule</Button>
            <Button
                onClick={() => {
                    setRulesView('PREVIEW')
                }}

                className={classNames({
                    'bg-zinc-500': rulesView === 'PREVIEW',
                    'text-white': rulesView === 'PREVIEW',
                })}>Show Existing Rules</Button>

            <Button
                onClick={() => {
                    setRulesView('TEST')
                }}

                className={classNames({
                    'bg-zinc-500': rulesView === 'TEST',
                    'text-white': rulesView === 'TEST',
                })}>Test Rule</Button>

        </div>
    </div>
}

export default Header;