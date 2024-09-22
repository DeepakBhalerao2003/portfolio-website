"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Messagebox } from "./Messagebox";

const baseSchema = z.object({
  title: z.string(),
});

const coverImageSchema = z
  .instanceof(File)
  .refine(
    (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
    {
      message: "Only JPEG, PNG, and GIF images are allowed.",
    }
  )
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "File size must be less than 5 MB.",
  });

export function SkillsForm({ skillid }: { skillid?: number }) {
  const router = useRouter(); // Use useRouter from next/navigation

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useParams();
  const [dialog, setDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track form submission success

  const formSchema = skillid
    ? baseSchema.extend({ coverImage: coverImageSchema.optional() })
    : baseSchema.extend({ coverImage: coverImageSchema });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      coverImage: undefined,
    },
  });

  const fetchProject = async () => {
    const res = await fetch(`/api/skills?id=${skillid}`, {
      method: "GET",
    });

    if (res.ok) {
      const projectData = await res.json();
      form.setValue('title', projectData.title);
      setImagePreview(projectData.coverImage); // Set the image preview to the URL
      // form.setValue('coverImage', projectData.coverImage); // Set coverImage to the URL
    } else {
      console.error("Failed to fetch project data");
    }
  };

  useEffect(() => {
    if (skillid) {
      fetchProject();
    }
  }, [skillid]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Submitting project", values); // Debug log
    // alert("Submitting project");
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.coverImage instanceof File) {
      formData.append("coverImage", values.coverImage);
    } else if (imagePreview) {
      // If coverImage is not a File, use the previous image URL
      formData.append("coverImage", imagePreview);
    }

    const response = skillid
      ? await fetch(`/api/skills?id=${skillid}`, {
          method: "PUT",
          body: formData,
        })
      : await fetch("/api/skills", {
          method: "POST",
          body: formData,
        });

    if (response.ok) {
      console.log("Project submitted successfully");
      setIsSuccess(true); // Set success state
      setDialog(true);
    } else {
      console.error("Failed to submit project");
    }
  };

  const imageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue("coverImage", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialog(open);
    if (!open && isSuccess) {
      router.push("/admin/skills"); // Redirect after closing the dialog
    }
  };

  return (
    <Form {...form}>
      <Messagebox
        success="Success"
        message="Skill has been saved successfully"
        buttonText="Done"
        open={dialog}
        onOpenChange={handleDialogClose} // Use the custom handler
      />

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*" onChange={imageChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {imagePreview && (
            <div className="flex items-center justify-center w-80 h-60 border-slate-200 border-2 rounded-md mt-4 overflow-hidden">
              <img src={imagePreview} alt="Image Preview" className="mt-4 w-full" />
            </div>
          )}
        </div>
       
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}