'use client'
import { signOut, useSession } from "next-auth/react"
import { deleteAccount } from "@/controller/actions/auth/_deleteAccount"
import { useToast } from "@/components/ui/use-toast"

const BtnDeleteAccount = () => {
    const { toast } = useToast()
    const { data: session } = useSession()
    const user = session?.user

    const handleDeleteAccount = async () => {
        const deleteA = await deleteAccount(user)
        if (deleteA.success) {
            await signOut()
        }
        
        if (deleteA.error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: `${deleteA.error}`,
            })
        }
    }

    return (
        <button onClick={handleDeleteAccount} className="bg-red p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">Delete Account</h3>
            <p className="text-gray-600">Delete your account</p>
        </button>
    )
}

export default BtnDeleteAccount
