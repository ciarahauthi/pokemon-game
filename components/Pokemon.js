'use client'
import Image from "next/image";

export default function Pokemon({name, image, clicked, index, weight}) {
    return ( 
        <section>
            <section>
            <Image onClick= {() => clicked(index)} className="hover:scale-110"
                src = {image}
                width={250}
                height={250}
                alt= 'A pokemon!'
            />
            <h1>{name}</h1>
            
            </section>

        </section>
    )
}

export const dynamic = 'force-dynamic';