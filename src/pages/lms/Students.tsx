import { useState } from "react";
import { Plus, Search, Mail, User as UserIcon } from "lucide-react";
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
import { StudentModal } from "@/components/modals/StudentModal";
import { toast } from "@/hooks/use-toast";

const students = [
  { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", enrolled: 3, completed: 2, progress: 85, status: "active" },
  { id: "2", name: "Mike Davis", email: "mike.d@example.com", enrolled: 5, completed: 4, progress: 92, status: "active" },
  { id: "3", name: "Emily Brown", email: "emily.b@example.com", enrolled: 2, completed: 0, progress: 45, status: "active" },
  { id: "4", name: "John Smith", email: "john.s@example.com", enrolled: 4, completed: 3, progress: 78, status: "active" },
  { id: "5", name: "Lisa Wang", email: "lisa.w@example.com", enrolled: 6, completed: 5, progress: 95, status: "active" },
  { id: "6", name: "David Lee", email: "david.l@example.com", enrolled: 1, completed: 0, progress: 15, status: "inactive" },
];

const Students = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const handleView = (student: any) => {
    setModalMode("view");
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleEmail = (student: any) => {
    toast({
      title: "Email Composer",
      description: `Opening email to ${student.email}`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Student Management</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage learners and track their progress
          </p>
        </div>
        <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedStudent(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Enroll Student
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Total Students</p>
          <p className="text-3xl font-dela text-foreground mt-2">{students.length}</p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Active</p>
          <p className="text-3xl font-dela text-success mt-2">
            {students.filter(s => s.status === "active").length}
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Avg Progress</p>
          <p className="text-3xl font-dela text-primary mt-2">
            {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Completions</p>
          <p className="text-3xl font-dela text-foreground mt-2">
            {students.reduce((sum, s) => sum + s.completed, 0)}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students by name or email..." className="pl-9" />
        </div>
      </Card>

      {/* Students Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">All Students</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Student</TableHead>
              <TableHead className="font-montserrat">Email</TableHead>
              <TableHead className="font-montserrat">Enrolled</TableHead>
              <TableHead className="font-montserrat">Completed</TableHead>
              <TableHead className="font-montserrat">Progress</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-montserrat font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-quicksand text-muted-foreground">{student.email}</TableCell>
                <TableCell className="font-montserrat">{student.enrolled} courses</TableCell>
                <TableCell className="font-montserrat">{student.completed} courses</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-montserrat">{student.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleView(student)}>
                      <UserIcon className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleEmail(student)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <StudentModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        student={selectedStudent}
      />
    </div>
  );
};

export default Students;
