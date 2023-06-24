'use client'
import { Fragment } from "react";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(segment => segment !== "");
    let breadcrumb1 = "";
    let breadcrumb2 = "";
    
    if (segments.length >= 1) {
        breadcrumb1 = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
    }
    
    if (segments.length >= 2) {
        breadcrumb2 = segments[1].charAt(0).toUpperCase() + segments[1].slice(1);
    }
    
    return (
        <nav aria-label="Breadcrumbs" className="order-first flex space-x-2 text-sm font-semibold">
            {breadcrumb1 && (
                <Fragment>
                    <a
                        className="text-slate-500 hover:text-slate-600"
                        href={`/${breadcrumb1.toLowerCase()}`}
                    >
                        {breadcrumb1}
                    </a>
                    {breadcrumb2 && (
                        <Fragment>
                            <div aria-hidden="true" className="select-none text-slate-400">/</div>
                            <a
                                className="text-slate-500 hover:text-slate-600"
                                href={`/${breadcrumb1.toLowerCase()}/${breadcrumb2.toLowerCase()}`}
                            >
                                {breadcrumb2}
                            </a>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </nav>
    );
};

export default Breadcrumbs;
