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
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { userInputSchema } from "../../../../api/types";

export const Signup: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const createUserMutation = trpc.user.create.useMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userInputSchema>>({
    resolver: zodResolver(userInputSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof userInputSchema>) => {
    setLoading(true);

    try {
      const userCreated = await createUserMutation.mutateAsync(values);

      if (!userCreated) {
        form.setError("root.serverError", {
          type: "deps",
          message: "An error occurred",
        });

        return;
      }

      navigate("/home");

      return;
    } catch {
      form.setError("root.serverError", {
        type: "deps",
        message: "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-32 flex item-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Few details to register</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormDescription>
                      The way you want us to call you.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Id</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@xyz.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      You will use this id to login.
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
                  navigate("/login");
                }}
                variant="link"
                type="reset"
                aria-busy={loading}
              >
                Already a member? Login
              </Button>
              <Button type="submit" aria-busy={loading}>
                Sign up
              </Button>
            </CardFooter>
          </form>
          {form.formState.errors.root?.serverError
            ? form.formState.errors.root?.serverError?.message
            : ""}
        </Form>
      </Card>
    </section>
  );
};
