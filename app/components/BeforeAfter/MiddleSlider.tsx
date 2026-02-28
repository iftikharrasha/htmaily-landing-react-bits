"use client"

import Image from "next/image"
import { ReactCompareSlider } from "react-compare-slider"
import AfterItem from "./AfterItem"
import BeforeItem from "./BeforeItem"

export default function MiddleSlider() {
    return (
        <div className="order-2 lg:order-2 flex">
            <div className="
                relative 
                w-full 
                rounded-3xl 
                bg-white 
                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
            ">
                <div className="rounded-lg">
                    <Image
                        src="/compose-top.svg"
                        alt="compose"
                        width={600}
                        height={114}
                        className="object-cover"
                    />
                    <div className="relative w-full h-auto overflow-hidden px-2 pt-3">
                        <ReactCompareSlider
                            changePositionOnHover
                            itemOne={<BeforeItem />}
                            itemTwo={<AfterItem />}
                            position={50}
                            className="w-full h-full"
                            transition="3s ease-in-out"
                        />
                    </div>
                    <Image
                        src="/compose-below.svg"
                        alt="compose"
                        width={600}
                        height={114}
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    )
}