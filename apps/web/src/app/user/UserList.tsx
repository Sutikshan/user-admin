import { trpc } from "@/trpc";

export const UserList = () => {
  const users = trpc.user.list.useQuery();

  return (
    <section className="container mx-auto my-16">
      <h1 className="">User List</h1>
      <div className="space-y-12 card">
        <p>{JSON.stringify(users.data, null, 2)}</p>
      </div>
    </section>
  );
};
