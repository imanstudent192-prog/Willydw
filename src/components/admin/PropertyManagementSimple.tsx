import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, MapPin, Bed, Bath, Square } from "lucide-react";
import { properties } from "@/data/properties";

export const PropertyManagementSimple = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Properties Management</h2>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
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
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </p>
              <p className="font-bold text-lg text-green-600 mb-3">{property.price}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {property.bedrooms} bed • {property.bathrooms} bath • {property.area}
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
