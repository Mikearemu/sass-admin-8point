import { useState } from "react";
import { Send, Search, MoreVertical, Paperclip, Smile, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const channels = [
  { id: "1", name: "General", unread: 3, active: true },
  { id: "2", name: "Support", unread: 0, active: false },
  { id: "3", name: "Sales Team", unread: 5, active: false },
  { id: "4", name: "Development", unread: 1, active: false },
];

const messages = [
  { id: "1", sender: "John Doe", message: "Hey team, how's the new dashboard coming along?", time: "10:30 AM", isOwn: false },
  { id: "2", sender: "You", message: "Looking great! Just finishing up the analytics section.", time: "10:32 AM", isOwn: true },
  { id: "3", sender: "Sarah Smith", message: "Can someone review the latest sales report?", time: "10:35 AM", isOwn: false },
  { id: "4", sender: "You", message: "I'll take a look at it now.", time: "10:36 AM", isOwn: true },
  { id: "5", sender: "Mike Johnson", message: "Thanks everyone! Great work today.", time: "10:40 AM", isOwn: false },
];

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-dela text-foreground">Team Chat</h1>
        <p className="text-muted-foreground font-quicksand mt-2">
          Communicate with your team in real-time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Channels List */}
        <Card className="lg:col-span-1 p-4 animate-slide-in-left">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search channels..." className="pl-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-montserrat font-semibold text-sm text-muted-foreground px-2">
                CHANNELS
              </h3>
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    channel.active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-montserrat font-medium"># {channel.name}</span>
                    {channel.unread > 0 && !channel.active && (
                      <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full font-montserrat" variant="outline">
              + New Channel
            </Button>
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-16rem)] animate-slide-in-right">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-dela text-foreground"># General</h2>
              <p className="text-sm text-muted-foreground font-quicksand">
                12 members
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.isOwn ? "flex-row-reverse" : "flex-row"
                  } animate-fade-in`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {msg.sender === "You" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        msg.sender.charAt(0)
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col ${
                      msg.isOwn ? "items-end" : "items-start"
                    } max-w-[70%]`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-montserrat font-semibold text-foreground">
                        {msg.sender}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isOwn
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="font-quicksand">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && message.trim()) {
                    setMessage("");
                  }
                }}
              />
              <Button
                className="font-montserrat"
                disabled={!message.trim()}
                onClick={() => setMessage("")}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
