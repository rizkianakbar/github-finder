"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { NoResultsMessage, WelcomeMessage } from "@/components/Message";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import UserAccordion from "@/components/UserAccordion";

interface User {
  name: string;
  login: string;
  repositories: Repository[];
  avatar_url: string | undefined;
}

interface Repository {
  stargazers_count: number;
  html_url: string | undefined;
  description: string;
  id: number;
  name: string;
}

const formSchema = z.object({
  username: z.string(),
});

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const getUserDetails = async (
    username: string
  ): Promise<User | undefined> => {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      const json = await res.json();

      const repositoriesRes = await fetch(`${json.repos_url}?per_page=5`);
      const repositoriesJson = await repositoriesRes.json();
      json.repositories = repositoriesJson;

      return json;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${values.username}&per_page=5`
      );
      const json = await res.json();

      const userPromises = json.items.slice(0, 5).map((item: User) => {
        return getUserDetails(item.login);
      });

      const userDetails = await Promise.all(userPromises);
      setUsers(userDetails.filter((user) => user !== undefined) as User[]);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold text-center">Github Finder</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Input username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.getValues("username") === ""}
            isLoading={form.formState.isSubmitting}
          >
            Search
          </Button>
        </form>
      </Form>

      {form.formState.isSubmitted && (
        <p className="text-sm">
          Showing results for: &quot;{form.getValues("username")}&quot;
        </p>
      )}

      {form.formState.isSubmitting && (
        <div className="mt-2 space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="flex gap-3 items-center px-4 py-[15px] border rounded-md"
              key={index}
            >
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-3 w-[300px]" />
                <Skeleton className="h-3.5 w-[250px]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!form.formState.isSubmitting && users.length !== 0 && (
        <UserAccordion
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}

      {form.formState.isSubmitted && users.length === 0 && <NoResultsMessage />}

      {!form.formState.isSubmitted && !form.formState.isSubmitting && (
        <WelcomeMessage />
      )}
    </div>
  );
}
