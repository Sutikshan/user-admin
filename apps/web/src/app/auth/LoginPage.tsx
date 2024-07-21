import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginInputSchema } from "../../../../api/types";
import { useAuth } from "./AuthContext";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginInputSchema>>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const loginMutation = trpc.user.validateLogin.useMutation();

  const onSubmit = async (values: z.infer<typeof loginInputSchema>) => {
    const data = await loginMutation.mutateAsync(values);

    if (data.success) {
      const { id, userName, firstName, lastName } = data.user;

      login({ id, firstName, lastName, userName }, data.token);
      navigate("/home");
      return;
    }

    form.setError("root.serverError", {
      type: "deps",
      message: data?.message || "An error occurred",
    });
  };

  return (
    <section className="my-32 flex item-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Authenticate to access the application
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent>
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@xyz.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      This unique user name is used with sign up.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => {
                  navigate("/signup");
                }}
                variant="outline"
                type="reset"
              >
                Sign up
              </Button>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
          {form.formState.errors ? (
            <Alert variant="destructive">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                {form.formState.errors?.root?.serverError?.message}
              </AlertDescription>
            </Alert>
          ) : null}
        </Form>
      </Card>
    </section>
  );
};
