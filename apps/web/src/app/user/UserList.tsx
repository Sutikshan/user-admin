import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/trpc";
import { useAuth } from "../auth/AuthContext";

export const UserList = () => {
  const users = trpc.user.list.useQuery();
  const deleteUserMutation = trpc.user.delete.useMutation();
  const authUser = useAuth();

  if (!users.data) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableCaption>List of users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>

          <TableHead>Branch</TableHead>

          <TableHead className="w-[100px]">User ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.map((user, index) => (
          <TableRow key={user.userName}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.branchId}</TableCell>
            <TableCell className="font-medium">{user.userName}</TableCell>
            <TableCell>
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell className="text-left">{user.position}</TableCell>
            <TableCell>
              {authUser.state?.userName !== user.userName ? (
                <Button
                  variant="outline"
                  onClick={async () => {
                    await deleteUserMutation.mutateAsync(user.userName);
                    alert(`User ${user.userName} is deleted`);
                    users.refetch();
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
