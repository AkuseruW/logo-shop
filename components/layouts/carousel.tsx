'use client'

import Image from 'next/image'
import { useMemo, useEffect, useState } from 'react'
import iphoneImage from '@/public/images/iphone-14-pro-model.jpeg'
import ps5Image from '@/public/images/sony-ps5.jpg'
import Link from 'next/link'


export default function Banner() {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = useMemo(() => [ps5Image, iphoneImage], []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((activeIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [activeIndex, images.length]);

    return (
        <>
            <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto py-2 px-2 sm:px-6 lg:px-2">
                <Image
                    className="aspect-[16/10] md:aspect-auto object-cover"
                    height={images[activeIndex].height}
                    width={images[activeIndex].width}
                    priority={true}
                    src={images[activeIndex].src}
                    alt="CarouselImage"
                />
                <Link href='/products' className="px-[15px] md:px-[40px] py-[10px] md:py-[25px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[30px] uppercase font-medium cursor-pointer hover:opacity-90">
                    Shop now
                </Link>
            </div>
        </>
    )
}
