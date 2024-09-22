import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    console.log("Received request:", request);
    const cookieStore = cookies();
    const supabase = createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log("Received query params:", id);

    if(id){
        console.log("Fetching skill with id:", id);
        try {
            const { data: skill, error } = await supabase.from("skills").select().eq("id", id).single();

            if (error) {
                console.error("Error fetching data:", error);
                return new Response(JSON.stringify({ error: error.message }), { status: 500 });
            }

            console.log("Fetched data:", skill);
            return new Response(JSON.stringify(skill), { status: 200 });
        } catch (err) {
            console.error("Unexpected error:", err);
            return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
        }
    }

    try {
        const { data: skills, error } = await supabase.from("skills").select();

        if (error) {
            console.error("Error fetching data:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log("Fetched data:", skills);
        return new Response(JSON.stringify(skills), { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
    }
}


export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient();
    let formData;

    try {
        formData = await request.formData();
    } catch (err) {
        console.error("Error parsing form data:", err);
        return new Response(JSON.stringify({ error: "Invalid form data" }), { status: 400 });
    }

    // console.log("Received data:", formData);

    const title = formData.get("title");
    const coverImage = formData.get("coverImage") as File;

    let coverImageUrl = null;

    if (coverImage) {
        console.log("Uploading Image")
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, coverImage);

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            return new Response(JSON.stringify({ error: uploadError.message }), { status: 500 });
        }

        coverImageUrl = `${supabase.storage.from('project-images').getPublicUrl(filePath).data.publicUrl}`;
    }

    try {
        const { data: insertData, error } = await supabase.from("skills").insert({
            title,
            coverImage: coverImageUrl,
        }).select().single();

        if (error) {
            console.error("Error inserting data:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log("Insert successful:", insertData);
        return new Response(JSON.stringify(insertData), { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
    }
}

export async function PUT(request: Request) {

    const cookieStore = cookies();
    const supabase = createClient();
    let formData;

    try {
        formData = await request.formData();
        console.log(formData);
    } catch (err) {
        console.error("Error parsing form data:", err);
        return new Response(JSON.stringify({ error: "Invalid form data" }), { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log("Received query params:", id);
    if (!id) {
        return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    console.log("Updating");

    const title = formData.get("title");
    const coverImage = formData.get("coverImage") as File;

    let coverImageUrl = null;

    if (coverImage) {
        const fileExt = coverImage.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(filePath, coverImage);

        if (uploadError) {
            console.error("Error uploading image:", uploadError);
            return new Response(JSON.stringify({ error: uploadError.message }), { status: 500 });
        }

        coverImageUrl = `${supabase.storage.from('project-images').getPublicUrl(filePath).data.publicUrl}`;
    }

    try {
        const { data: updateData, error } = await supabase.from("skills").update({
            title,
            coverImage: coverImageUrl,
        }).eq("id", id).select().single();

        if (error) {
            console.error("Error updating data:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log("Update successful:", updateData);
        return new Response(JSON.stringify(updateData), { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
    }
}



export async function DELETE(request: Request) {
    // const cookieStore = cookies(); // Unused variable
    const supabase = createClient(); // Ensure this is correctly initialized
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log("Received query params:", id);

    if (!id) {
        return new Response(JSON.stringify({ error: "ID is required" }), { status: 400 });
    }

    try {
        const { data: deleteData, error } = await supabase
            .from("skills")
            .delete()
            .eq("id", id)
            .single();

        if (error) {
            console.error("Error deleting data:", error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log("Delete successful:", deleteData);
        return new Response(JSON.stringify(deleteData), { status: 200 });
    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(JSON.stringify({ error: "Unexpected error occurred" }), { status: 500 });
    }
}