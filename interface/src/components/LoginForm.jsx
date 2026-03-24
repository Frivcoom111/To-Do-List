import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api.js"
import { Link, Navigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      const response = await api.post("auth/login", data);

      const token = response.data.token;

      // Armazene o token no localStorage ou em um cookie
      localStorage.setItem("token", token);

      <Navigate to="/dashboard" />;
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Faça login na sua conta</CardTitle>
          <CardDescription>
            Insira seu e-mail abaixo para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                <Button type="submit">Entrar</Button>
                <FieldDescription className="text-center">
                  Não tem uma conta? <Link to="/signup">Cadastrar-se</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
