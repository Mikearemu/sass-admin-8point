import { Plus, Search, BookOpen, Users, BarChart3, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/KPICard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const courses = [
  { id: "1", title: "Advanced Sales Techniques", category: "Sales", instructor: "John Smith", enrolled: 45, status: "active", completion: 78 },
  { id: "2", title: "Customer Service Excellence", category: "Service", instructor: "Sarah Johnson", enrolled: 67, status: "active", completion: 92 },
  { id: "3", title: "Product Knowledge 101", category: "Training", instructor: "Mike Davis", enrolled: 89, status: "active", completion: 65 },
  { id: "4", title: "Leadership Development", category: "Management", instructor: "Emily Brown", enrolled: 23, status: "draft", completion: 0 },
];

const LMS = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Learning Management</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Manage courses, students, and track progress
          </p>
        </div>
        <Button className="font-montserrat">
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Courses"
          value="24"
          subtitle="4 in progress"
          icon={BookOpen}
          className="border-l-4 border-l-primary animate-scale-in"
        />
        <KPICard
          title="Active Students"
          value="224"
          subtitle="Across all courses"
          icon={Users}
          trend={{ value: "18%", isPositive: true }}
          className="animate-scale-in"
        />
        <KPICard
          title="Avg Completion"
          value="78.5%"
          subtitle="Overall progress rate"
          icon={BarChart3}
          trend={{ value: "5.2%", isPositive: true }}
          className="animate-scale-in"
        />
      </div>

      {/* Search & Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses..." className="pl-9" />
          </div>
          <Button variant="outline" className="font-montserrat">
            Filter by Category
          </Button>
        </div>
      </Card>

      {/* Courses Table */}
      <Card className="animate-slide-in-left">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-dela text-foreground">All Courses</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-montserrat">Course Title</TableHead>
              <TableHead className="font-montserrat">Category</TableHead>
              <TableHead className="font-montserrat">Instructor</TableHead>
              <TableHead className="font-montserrat">Enrolled</TableHead>
              <TableHead className="font-montserrat">Completion</TableHead>
              <TableHead className="font-montserrat">Status</TableHead>
              <TableHead className="font-montserrat">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} className="hover:bg-muted/50 transition-colors">
                <TableCell className="font-montserrat font-medium">{course.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{course.category}</Badge>
                </TableCell>
                <TableCell className="font-quicksand">{course.instructor}</TableCell>
                <TableCell className="font-montserrat">{course.enrolled} students</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-montserrat">{course.completion}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={course.status === "active" ? "default" : "secondary"}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-montserrat font-semibold text-foreground">Enroll User</h3>
              <p className="text-sm text-muted-foreground">Add students to courses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-montserrat font-semibold text-foreground">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Course performance</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all cursor-pointer animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-montserrat font-semibold text-foreground">Certificates</h3>
              <p className="text-sm text-muted-foreground">Generate and manage</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LMS;
