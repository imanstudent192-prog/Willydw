import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  DollarSign,
  Upload,
  X
} from "lucide-react";
import { properties } from "@/data/properties";
import { agents } from "@/data/agents";

interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  price: string;
  type: "JUAL" | "SEWA";
  area: string;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  agent: any;
  features: string[];
}

export const PropertyManagement = () => {
  const [propertiesList, setPropertiesList] = useState<Property[]>(properties);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "JUAL" as "JUAL" | "SEWA",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
    agentId: "",
    features: "",
    image: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProperty: Property = {
      id: editingProperty?.id || Date.now().toString(),
      image: formData.image || "/placeholder.svg",
      title: formData.title,
      location: formData.location,
      price: formData.price,
      type: formData.type,
      area: formData.area,
      bedrooms: parseInt(formData.bedrooms) || undefined,
      bathrooms: parseInt(formData.bathrooms) || undefined,
      description: formData.description,
      agent: agents.find(a => a.id === formData.agentId) || agents[0],
      features: formData.features.split(",").map(f => f.trim()).filter(f => f)
    };

    if (editingProperty) {
      setPropertiesList(prev => prev.map(p => p.id === editingProperty.id ? newProperty : p));
    } else {
      setPropertiesList(prev => [...prev, newProperty]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      price: "",
      type: "JUAL",
      area: "",
      bedrooms: "",
      bathrooms: "",
      description: "",
      agentId: "",
      features: "",
      image: ""
    });
    setEditingProperty(null);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      type: property.type,
      area: property.area,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      description: property.description,
      agentId: property.agent?.id || "",
      features: property.features.join(", "),
      image: property.image
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (propertyId: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      setPropertiesList(prev => prev.filter(p => p.id !== propertyId));
    }
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const filteredProperties = propertiesList.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Properties Management</h2>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <Button onClick={handleAddNew} className="w-fit">
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="JUAL">For Sale</SelectItem>
            <SelectItem value="SEWA">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 relative group">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={property.type === "JUAL" ? "default" : "secondary"}>
                  {property.type}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <Button variant="secondary" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleEdit(property)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(property.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </p>
              <p className="font-bold text-lg text-green-600 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                {property.price}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-4">
                  {property.bedrooms && (
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms}
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms}
                    </span>
                  )}
                  <span className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.area}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {property.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{property.features.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Property
          </Button>
        </div>
      )}

      {/* Add/Edit Property Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Edit Property" : "Add New Property"}
            </DialogTitle>
            <DialogDescription>
              {editingProperty ? "Update property information" : "Add a new property listing"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Property Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., Rumah Type 45 Strategis"
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., Bekasi Timur, Jawa Barat"
                  required
                />
              </div>
            </div>

            {/* Price and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="e.g., Rp 450.000.000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type *</Label>
                <Select value={formData.type} onValueChange={(value: "JUAL" | "SEWA") => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="JUAL">JUAL</SelectItem>
                    <SelectItem value="SEWA">SEWA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area and Rooms */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  value={formData.area}
                  onChange={(e) => handleInputChange("area", e.target.value)}
                  placeholder="e.g., 45 m²"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  placeholder="2"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            {/* Agent */}
            <div>
              <Label htmlFor="agentId">Assigned Agent *</Label>
              <Select value={formData.agentId} onValueChange={(value) => handleInputChange("agentId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name} - {agent.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe the property..."
                rows={4}
                required
              />
            </div>

            {/* Features */}
            <div>
              <Label htmlFor="features">Features</Label>
              <Input
                id="features"
                value={formData.features}
                onChange={(e) => handleInputChange("features", e.target.value)}
                placeholder="e.g., Lokasi Strategis, Dekat Stasiun, Carport (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">Separate features with commas</p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProperty ? "Update Property" : "Add Property"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
