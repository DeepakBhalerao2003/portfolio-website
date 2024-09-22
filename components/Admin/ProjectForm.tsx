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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useParams, useRouter } from "next/navigation"; // Use useRouter from next/navigation
import Loader from "./Loader";
import { Messagebox } from "./Messagebox";

const baseSchema = z.object({
  title: z.string(),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  description: z.string().max(500),
  github: z.string().max(500),
  visit: z.string().max(500),
  technologies: z.string().max(500),
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

export function ProjectForm({ projectId }: { projectId?: number }) {
  const router = useRouter(); // Use useRouter from next/navigation

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Track form submission success

  const formSchema = projectId
    ? baseSchema.extend({ coverImage: coverImageSchema.optional() })
    : baseSchema.extend({ coverImage: coverImageSchema });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      startDate: "",
      endDate: "",
      description: "",
      visit: "",
      github: "",
    },
  });

  const fetchProject = async () => {
    const res = await fetch(`/api/projects?id=${projectId}`, {
      method: "GET",
    });

    if (res.ok) {
      const projectData = await res.json();
      form.setValue("title", projectData.title);
      form.setValue("startDate", projectData.startDate);
      form.setValue("endDate", projectData.endDate);
      form.setValue("description", projectData.description);
      form.setValue("technologies", projectData.technologies);
      form.setValue("github", projectData.github);
      form.setValue("visit", projectData.visit);
      setImagePreview(projectData.coverImage); // Set the image preview to the URL
      // Do not set coverImage to undefined
    } else {
      console.error("Failed to fetch project data");
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting project", values); // Debug log
      alert("Submitting project");
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("description", values.description);
      formData.append("technologies", values.technologies);
      formData.append("visit", values.visit);
      formData.append("github", values.github);
      if (values.coverImage instanceof File) {
        formData.append("coverImage", values.coverImage);
      } else if (imagePreview) {
        formData.append("coverImage", imagePreview); // Append existing image URL if no new image is uploaded
      }

      if (!projectId) {
        const response = await fetch("/api/projects", {
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
      }

      if (projectId) {
        const response = await fetch(`/api/projects?id=${projectId}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          console.log("Project submitted successfully");
          setIsSuccess(true); // Set success state
          setDialog(true);
        } else {
          console.error("Failed to submit project");
        }
      }
    } catch (error) {
      console.error("Failed to submit project", error);
    } finally {
      setIsSubmitting(false);
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
      router.push("/admin/projects"); // Redirect after closing the dialog
    }
  };

  return (
    <Form {...form}>
      <Messagebox
        success="Success"
        message="Project has saved successfully"
        buttonText="Done"
        open={dialog}
        onOpenChange={handleDialogClose} // Use the custom handler
      />

      {isSubmitting && <Loader />}
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
            <div className="flex  items-center justify-center w-80 h-60 border-slate-200 border-2 rounded-md mt-4 overflow-hidden">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 w-full"
              />
            </div>
          )}
        </div>
        <span className="flex gap-8">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="Start Date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="End Date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </span>

        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input
                  placeholder="Technologies (separated with comma)"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github Link</FormLabel>
                <FormControl>
                  <Input placeholder="Github Link" type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visit Link</FormLabel>
                <FormControl>
                  <Input placeholder="Visit Link" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} rows={8} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}