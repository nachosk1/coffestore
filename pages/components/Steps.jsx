import { useRouter } from "next/router"
import { useEffect, useState } from "react";

const steps = [
    { step: 1, name: 'Menú', url: '/' },
    { step: 2, name: 'Resumen', url: '/summary' },
    { step: 3, name: 'Datos y Total', url: '/total' }
]

export default function Steps() {
    const router = useRouter()
    const [bar, setBar] = useState(0)

    const calculateProgress = () => {
        let value
        if (router.pathname === '/') {
            value = 2
        } else if (router.pathname === '/summary') {
            value = 50
        } else {
            value = 100
        }
        return value
    };

    useEffect(() => {
        if (router.pathname === '/') {
            setBar(2)
        } else if (router.pathname === '/summary') {
            setBar(50)
        } else {
            setBar(100)
        }
    }, [])

    return (
        <>
            <div className="flex justify-between mb-5">
                {steps.map(step => (
                    <button key={step.step} className="text-2xl font-bold" onClick={() => {
                        router.push(step.url)
                    }}>
                        {step.name}
                    </button>
                ))}
            </div>
            <div className="bg-gray-100 mb-10">
                <div
                    className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white transition duration-500 ease-in-out ${bar === 2 && 'w-[2%]'} ${bar === 50 && 'w-[50%]'} ${bar === 100 && 'w-[100%]'}`}
                />
            </div>
        </>
    )
}
