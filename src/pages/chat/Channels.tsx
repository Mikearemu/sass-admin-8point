import { useState } from "react";
import { Plus, Search, Hash, Lock, Users, MoreVertical, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChannelModal } from "@/components/modals/ChannelModal";

const channels = [
  { id: "1", name: "general", type: "public", members: 45, unread: 0, description: "General discussion for the team" },
  { id: "2", name: "announcements", type: "public", members: 45, unread: 3, description: "Important company announcements" },
  { id: "3", name: "product-team", type: "private", members: 12, unread: 5, description: "Product development discussions" },
  { id: "4", name: "sales", type: "public", members: 18, unread: 0, description: "Sales team coordination" },
  { id: "5", name: "support", type: "public", members: 23, unread: 8, description: "Customer support channel" },
  { id: "6", name: "engineering", type: "private", members: 15, unread: 2, description: "Engineering team discussions" },
];

const Channels = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const handleEdit = (channel: any) => {
    setModalMode("edit");
    setSelectedChannel(channel);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-dela text-foreground">Channels</h1>
          <p className="text-muted-foreground font-quicksand mt-2">
            Organize conversations by topics and teams
          </p>
        </div>
        <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedChannel(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Channel
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Total Channels</p>
          <p className="text-3xl font-dela text-foreground mt-2">{channels.length}</p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Public Channels</p>
          <p className="text-3xl font-dela text-primary mt-2">
            {channels.filter(c => c.type === "public").length}
          </p>
        </Card>
        <Card className="p-6 animate-scale-in">
          <p className="text-sm text-muted-foreground font-quicksand">Unread Messages</p>
          <p className="text-3xl font-dela text-warning mt-2">
            {channels.reduce((sum, c) => sum + c.unread, 0)}
          </p>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search channels..." className="pl-9" />
        </div>
      </Card>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map((channel) => (
          <Card key={channel.id} className="p-6 animate-slide-in-left hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {channel.type === "private" ? (
                    <Lock className="h-5 w-5 text-primary" />
                  ) : (
                    <Hash className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-dela text-foreground">#{channel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {channel.type}
                    </Badge>
                    {channel.unread > 0 && (
                      <Badge variant="default" className="text-xs">
                        {channel.unread} unread
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => handleEdit(channel)}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground font-quicksand mb-4">
              {channel.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-montserrat">{channel.members} members</span>
              </div>
              <Button size="sm" variant="outline">
                Open
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create New Channel CTA */}
      <Card className="p-8 text-center animate-fade-in bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-dela text-foreground mb-2">Create a New Channel</h3>
          <p className="text-muted-foreground font-quicksand mb-4">
            Start a new conversation space for your team
          </p>
          <Button className="font-montserrat" onClick={() => { setModalMode("add"); setSelectedChannel(null); setModalOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Create Channel
          </Button>
        </div>
      </Card>

      <ChannelModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        mode={modalMode}
        channel={selectedChannel}
      />
    </div>
  );
};

export default Channels;
