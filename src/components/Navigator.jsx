import React, {useState} from "react";

const Navigator = ({handleSortChange}) => {
    const [activeTag, setActiveTag] = useState("default");
    return (
        <nav class="w-full mt-8 bg-transparent">
            <div class="border-b-2 border-b-pink-300">
                    <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex w-full">
                            <div className={`${activeTag==='default'?'border-b-2 border-b-pink-800 text-pink-800':''} cursor-pointer text-pink-100 py-6 w-4/12 lg:w-2/12 md:w-4/12 sm:w-4/12 text-center hover:border-b-2 hover:border-b-pink-400 hover:text-pink-400 text-sm font-medium`}
                                onClick={() => {handleSortChange("default");setActiveTag("default")}}                            
                            >Mặc định</div>
                            <div className={`${activeTag==='date'?'border-b-2 border-b-pink-800 text-pink-800':''} cursor-pointer text-pink-100 py-6 w-4/12 lg:w-2/12 md:w-4/12 sm:w-4/12 text-center hover:border-b-2 hover:border-b-pink-400 hover:text-pink-400 text-sm font-medium`}
                                onClick={() => {handleSortChange("date"); setActiveTag("date")}}                        
                            >Ngày mới nhất</div>
                            <div className={`${activeTag==='interactions'?'border-b-2 border-b-pink-800 text-pink-800':''} cursor-pointer text-pink-100 py-6 w-4/12 lg:w-2/12 md:w-4/12 sm:w-4/12 text-center hover:border-b-2 hover:border-b-pink-400 hover:text-pink-400 text-sm font-medium`}
                                onClick={() => {handleSortChange("interactions");setActiveTag("interactions")}}                            
                            >Tương tác nhiều nhất</div>
                        </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigator