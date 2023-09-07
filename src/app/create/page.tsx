import { CreateForm } from "@/components/CreateForm";

export default function Create() {
  return (
    <main className="">
      <div className="pt-8 w-full text-center text-xl mb-4">
        Enter details of your certificate below:
      </div>
      <div className="w-[512px] border border-black bg-[#e6e6e6] m-auto flex">
        <CreateForm />
      </div>
    </main>
  );
}
