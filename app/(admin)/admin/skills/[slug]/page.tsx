import { SkillsForm } from "@/components/Admin/SkillsForm";



export default  function EditSkills({ params }: { params: { slug: number } }) {

    
    
    return (
       <SkillsForm skillid={params.slug} />
    );
}
