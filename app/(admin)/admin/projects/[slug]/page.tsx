import { ProjectForm } from "@/components/Admin/ProjectForm";



export default  function EditProject({ params }: { params: { slug: number } }) {

    
    
    return (
       <ProjectForm projectId={params.slug} />
    );
}
