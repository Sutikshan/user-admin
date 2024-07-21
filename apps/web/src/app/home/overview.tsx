import { UserList } from "../user/UserList";

export const Overview = () => {
  return (
    <div className="flex flex-1">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">User List</h1>
          <UserList />
        </div>
      </div>
    </div>
  );
};
