import { useState } from "react";
import { Plus, Search, Edit, Trash2, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserModal } from "@/components/modals/UserModal";
import { DeleteConfirmModal } from "@/components/modals/DeleteConfirmModal";

const users = [
  { id: "1", name: "Admin User", email: "admin@8point.com", role: "admin", status: "active", lastActive: "Just now" },
  { id: "2", name: "John Manager", email: "john@8point.com", role: "manager", status: "active", lastActive: "5 min ago" },
  { id: "3", name: "Sarah Editor", email: "sarah@8point.com", role: "editor", status: "active", lastActive: "1 hour ago" },
  { id: "4", name: "Mike Viewer", email: "mike@8point.com", role: "viewer", status: "active", lastActive: "2 hours ago" },
  { id: "5", name: "Lisa Designer", email: "lisa@8point.com", role: "editor", status: "inactive", lastActive: "3 days ago" },
];

const roleColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
  admin: "destructive",
  manager: "default",
  editor: "secondary",
  viewer: "outline",
};

const Users = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEdit = (user: any) => {
    setModalMode("edit");
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">User Management</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage users and assign roles
          </p>
        </div>
        <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedUser(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Total Users</p>
          <p className="text-3xl font-dela text-foreground mt-2">{users.length}</p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Active</p>
          <p className="text-3xl font-dela text-success mt-2">
            {users.filter(u => u.status === "active").length}
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Admins</p>
          <p className="text-3xl font-dela text-destructive mt-2">
            {users.filter(u => u.role === "admin").length}
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Managers</p>
          <p className="text-3xl font-dela text-primary mt-2">
            {users.filter(u => u.role === "manager").length}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users by name or email..." className="pl-9" />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">All Users</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">User</TableHead>
              <TableHead className="font-montserrat">Email</TableHead>
              <TableHead className="font-montserrat">Role</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Last Active</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-montserrat font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={roleColors[user.role as keyof typeof roleColors]}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(user)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Role Descriptions */}
      <Card className="p-6 animate-fade-in">
        <h2 className="text-2xl font-dela text-foreground mb-4">Role Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { role: "Admin", permissions: "Full system access, user management, all modules" },
            { role: "Manager", permissions: "Module access, reports, limited user management" },
            { role: "Editor", permissions: "Content editing, basic reports, limited access" },
            { role: "Viewer", permissions: "Read-only access to assigned modules" },
          ].map((item, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <h3 className="font-montserrat font-semibold mb-2">{item.role}</h3>
              <p className="text-sm text-muted-foreground font-quicksand">{item.permissions}</p>
            </div>
          ))}
        </div>
      </Card>

      <UserModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        user={selectedUser}
      />

      <DeleteConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          console.log("Delete user:", selectedUser);
          setDeleteOpen(false);
        }}
        title="Delete User"
        description={`Are you sure you want to remove ${selectedUser?.name} from your team? This action cannot be undone.`}
      />
    </div>
  );
};

export default Users;
