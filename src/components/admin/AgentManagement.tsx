import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  TrendingUp,
  Star,
  UserCheck,
  Search
} from "lucide-react";
import { agents } from "@/data/agents";

interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatar: string;
  deals: number;
  rating: number;
  description: string;
}

export const AgentManagement = () => {
  const [agentsList, setAgentsList] = useState<Agent[]>(agents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    avatar: "",
    deals: "",
    rating: "",
    description: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAgent: Agent = {
      id: editingAgent?.id || Date.now().toString(),
      name: formData.name,
      title: formData.title,
      phone: formData.phone,
      email: formData.email,
      avatar: formData.avatar || generateInitials(formData.name),
      deals: parseInt(formData.deals) || 0,
      rating: parseFloat(formData.rating) || 5,
      description: formData.description
    };

    if (editingAgent) {
      setAgentsList(prev => prev.map(a => a.id === editingAgent.id ? newAgent : a));
    } else {
      setAgentsList(prev => [...prev, newAgent]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const generateInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      phone: "",
      email: "",
      avatar: "",
      deals: "",
      rating: "",
      description: ""
    });
    setEditingAgent(null);
  };

  const handleEdit = (agent: Agent) => {
    setEditingAgent(agent);
    setFormData({
      name: agent.name,
      title: agent.title,
      phone: agent.phone,
      email: agent.email,
      avatar: agent.avatar,
      deals: agent.deals.toString(),
      rating: agent.rating.toString(),
      description: agent.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (agentId: string) => {
    if (confirm("Are you sure you want to delete this agent?")) {
      setAgentsList(prev => prev.filter(a => a.id !== agentId));
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredAgents = agentsList.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Agents Management</h2>
          <p className="text-gray-600">Manage your team of agents</p>
        </div>
        <Button onClick={handleAddNew} className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search agents..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" alt={agent.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                    {agent.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                  <p className="text-gray-600">{agent.title}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < agent.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-500">({agent.rating})</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(agent)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(agent.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{agent.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{agent.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">{agent.deals} deals completed</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{agent.description}</p>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center">
                  <UserCheck className="w-3 h-3 mr-1" />
                  Active
                </Badge>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{agent.deals} Deals</div>
                  <div className="text-xs text-gray-500">This month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or add a new agent</p>
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Agent
          </Button>
        </div>
      )}

      {/* Add/Edit Agent Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAgent ? "Edit Agent" : "Add New Agent"}
            </DialogTitle>
            <DialogDescription>
              {editingAgent ? "Update agent information" : "Add a new agent to your team"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Senior Property Consultant"
                  required
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="e.g., +62 812 3456 7890"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g., john@rumahprofit.com"
                  required
                />
              </div>
            </div>

            {/* Avatar and Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="avatar">Avatar Initials</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => handleInputChange("avatar", e.target.value.toUpperCase())}
                  placeholder="e.g., JD"
                  maxLength={3}
                />
                <p className="text-sm text-gray-500 mt-1">Leave empty to auto-generate from name</p>
              </div>
              <div>
                <Label htmlFor="deals">Completed Deals</Label>
                <Input
                  id="deals"
                  type="number"
                  value={formData.deals}
                  onChange={(e) => handleInputChange("deals", e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", e.target.value)}
                placeholder="5"
                min="1"
                max="5"
                step="0.1"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the agent's experience and specialties..."
                rows={3}
                required
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingAgent ? "Update Agent" : "Add Agent"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
