import { Card } from "@/components/ui/card";
import { KPICard } from "@/components/KPICard";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const progressData = [
  { week: "Week 1", completed: 12, enrolled: 45 },
  { week: "Week 2", completed: 18, enrolled: 48 },
  { week: "Week 3", completed: 25, enrolled: 52 },
  { week: "Week 4", completed: 32, enrolled: 55 },
];

const courseCompletionData = [
  { course: "React Basics", completed: 85, inProgress: 12, notStarted: 3 },
  { course: "Advanced JS", completed: 65, inProgress: 25, notStarted: 10 },
  { course: "TypeScript", completed: 45, inProgress: 35, notStarted: 20 },
  { course: "Node.js", completed: 30, inProgress: 40, notStarted: 30 },
];

const Progress = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Learning Progress</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Track student progress and course completion rates
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard
          title="Total Students"
          value="55"
          subtitle="Active learners"
          icon={Users}
          className="animate-scale-in"
        />
        <KPICard
          title="Avg Progress"
          value="68%"
          subtitle="Overall completion"
          icon={TrendingUp}
          trend={{ value: "12%", isPositive: true }}
          className="animate-scale-in"
        />
        <KPICard
          title="Courses Active"
          value="12"
          subtitle="Currently running"
          icon={BookOpen}
          className="animate-scale-in"
        />
        <KPICard
          title="Certificates"
          value="87"
          subtitle="Issued this month"
          icon={Award}
          className="animate-scale-in"
        />
      </div>

      {/* Progress Trend Chart */}
      <Card className="p-6 animate-slide-in-left">
        <h2 className="text-2xl font-dela text-foreground mb-6">Weekly Progress Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="completed" stroke="hsl(var(--success))" strokeWidth={3} name="Completed" />
            <Line type="monotone" dataKey="enrolled" stroke="hsl(var(--primary))" strokeWidth={3} name="Enrolled" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Course Completion Chart */}
      <Card className="p-6 animate-slide-in-right">
        <h2 className="text-2xl font-dela text-foreground mb-6">Course Completion Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseCompletionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="course" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Bar dataKey="completed" fill="hsl(var(--success))" name="Completed" radius={[8, 8, 0, 0]} />
            <Bar dataKey="inProgress" fill="hsl(var(--warning))" name="In Progress" radius={[8, 8, 0, 0]} />
            <Bar dataKey="notStarted" fill="hsl(var(--muted))" name="Not Started" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Top Performers */}
      <Card className="p-6 animate-fade-in">
        <h2 className="text-2xl font-dela text-foreground mb-6">Top Performers</h2>
        <div className="space-y-4">
          {[
            { name: "Lisa Wang", courses: 6, completion: 95, certificates: 5 },
            { name: "Mike Davis", courses: 5, completion: 92, certificates: 4 },
            { name: "Sarah Johnson", courses: 3, completion: 85, certificates: 2 },
          ].map((student, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-dela">
                  {index + 1}
                </div>
                <div>
                  <p className="font-montserrat font-semibold">{student.name}</p>
                  <p className="text-sm text-muted-foreground font-quicksand">
                    {student.courses} courses • {student.certificates} certificates
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-dela text-success">{student.completion}%</p>
                <p className="text-sm text-muted-foreground font-quicksand">completion</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Progress;
