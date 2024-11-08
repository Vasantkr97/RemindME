import { ReactNode } from "react";


function layout({children}: { children: ReactNode}) {
    return (
        <div className="flex min-h-screen w-full flex-col items-start justify-start">
            <div className="flex flex-grow w-full justify-start dark:bg-neutral-950">
                <div className=" flex flex-col flex-grow px-4 py-12">{children}</div>
            </div>
        </div>
    )
}

export default layout;
