import { Controller, useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
    username: z.string().min(3, "Mínimo de 3 caracteres.").max(100, "Máximo de 100 caracteres."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres.")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"] // Passa o caminho no campo confirmPassword
})

function SignupForm() {

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Nome:</FieldLabel>
                                <Controller
                                    name="username"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="username"
                                                type="text"
                                                placeholder="John.."
                                                required
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="email">Email:</FieldLabel>
                                <Controller
                                    name="email"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Senha:</FieldLabel>
                                <Controller
                                    name="password"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="password"
                                                type="password"
                                                required
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirme a senha:</FieldLabel>
                                <Controller
                                    name="confirmPassword"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <Input
                                                {...field}
                                                id="confirmPassword"
                                                type="password"
                                                required
                                            />
                                            {fieldState.error && (
                                                <p className="text-red-500 text-sm">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </>
                                    )}
                                />
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignupForm;