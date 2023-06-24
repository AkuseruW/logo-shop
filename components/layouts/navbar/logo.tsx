'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Logo() {
    const [showLogo, setShowLogo] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset;
            if (position > 0) {
                setShowLogo(true);
            } else {
                setShowLogo(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {showLogo ? (
                <div className="flex items-center">
                    <Link href="/">
                        <span className="text-2xl font-bold text-gray-800">LOGO</span>
                    </Link>
                </div>
            ) :
                <div className="flex items-center">
                </div>
            }
        </>
    )
}
