"use client";

import React, { useState, useEffect } from "react";
import SquadCard from "@/components/SquadCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { SocketIndicator } from "@/components/socket-indicator";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { z } from "zod";
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
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const Squads = () => {
  const params = useParams();

  const game = useQuery(api.game.getGame, {
    id: params!.gameId as Id<"games">,
  });

  const squads = useQuery(api.squad.getSquads, {
    gameId: params!.gameId as Id<"games">,
  });

  const createSquad = useMutation(api.squad.createSquad);

  const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createSquad({
        name: values.name,
        description: values.description,
        game: game!._id,
      });

      console.log("Squad created successfully");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft size="18" />
            </Link>
          </Button>
          <div className="text-lg font-bold">{game?.name}</div>
          <SocketIndicator />
        </div>
        <div className="flex items-center gap-2">
          <Input className="max-w-[200px]" placeholder="Search squads" />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Squad</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a squad</DialogTitle>
                <DialogDescription>
                  Squads are individual lobbies where you can talk to people
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
                        <FormDescription>
                          This is the name of your squad
                        </FormDescription>
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
                        <FormDescription>
                          This is the description of the squad
                        </FormDescription>
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
      </div>
      <div className="mt-20 flex gap-6">
        {squads?.map((squad) => (
          <SquadCard
          id={squad._id}
            name={squad.name}
            description={squad.description}
            playerCount={1}
            players={squad.players}
          />
        ))}
      </div>
    </div>
  );
};

export default Squads;
