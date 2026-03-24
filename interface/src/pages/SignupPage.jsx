import SignupForm from "@/components/SignupForm";
import { GalleryVerticalEnd } from "lucide-react"

function SignupPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-slate-100">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    To Do List
                </a>
                <SignupForm />
            </div>
        </div>
    )
}

export default SignupPage;