"use client";

import React, { useEffect } from "react";
import GameCard from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useStoreUserEffect } from "@/components/useStoreUserEffect";

const Dashboard = () => {
  const generateUploadUrl = useMutation(api.game.generateUploadUrl);
  const createGame = useMutation(api.game.createGame);
  const games = useQuery(api.game.getGames);

  const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
    image: z.custom<File | null>((val) => val instanceof File, "Required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const uploadUrl = await generateUploadUrl();

      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": values.image!.type,
        },
        body: values.image,
      });

      const { storageId } = await response.json();

      await createGame({
        name: values.name,
        description: values.description,
        imageUrl: storageId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container pt-10 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Looking to play</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create game</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a game</DialogTitle>
              <DialogDescription>
                Games are where squads can be created
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image Upload</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="Image upload"
                          onChange={(e) => {
                            if (!e.target.files) return;

                            field.onChange(e.target.files[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-6">
        {games?.map((game) => (
          <GameCard
            id={game._id}
            key={game._id}
            name={game.name}
            storageId={game.imageUrl}
            activeSquads={game.activeSquads}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
