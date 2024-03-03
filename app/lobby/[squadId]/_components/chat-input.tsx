import React from "react";
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
import { kMaxLength } from "buffer";
import { Plus } from "lucide-react";

const ChatInput = () => {
  const formSchema = z.object({
    content: z.string().min(1).max(100),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-2 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute top-5 left-8 h-[28px] w-[26px] bg-gray-500 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-300 transition rounded-full p-1 flex items-center justify-center"
                  >
                    <Plus />
                  </button>
                  <Input className="px-16 py-6 bg-gray-200/90 dark:bg-gray-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-600 dark:text-gray-200" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
