import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Upload, 
  Eye, 
  Settings, 
  Globe, 
  MessageSquare, 
  Home, 
  Search,
  FileText,
  Image,
  Palette,
  Bell
} from "lucide-react";
import { aboutContent } from "@/data/aboutContent";

export const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Content state
  const [content, setContent] = useState({
    // About Page
    about: {
      title: aboutContent.title,
      subtitle: aboutContent.subtitle,
      description: aboutContent.description,
      mission: {
        title: aboutContent.mission.title,
        content: aboutContent.mission.content
      },
      vision: {
        title: aboutContent.vision.title,
        content: aboutContent.vision.content
      },
      stats: aboutContent.stats,
      whyChooseUs: aboutContent.whyChooseUs
    },
    
    // Contact Information
    contact: {
      primaryPhone: "+62 812 3456 7890",
      secondaryPhone: "+62 813 9876 5432",
      primaryEmail: "elita@rumahprofit.com",
      secondaryEmail: "info@rumahprofit.com",
      address: "Jl. Raya Bekasi Timur No. 45\nBekasi Timur 17112\nJawa Barat, Indonesia",
      whatsapp: "+62 812 3456 7890",
      socialMedia: {
        facebook: "https://facebook.com/rumahprofit",
        instagram: "https://instagram.com/rumahprofit",
        whatsapp: "https://wa.me/6281234567890"
      }
    },

    // Hero Section
    hero: {
      title: "Jual Beli Properti Terpercaya",
      subtitle: "Rumah Profit Property Agent – Solusi Jual Beli Properti Milik Bu Elita",
      backgroundImage: "/hero-luxury-apartment.jpg",
      primaryButton: "Telusuri Properti",
      secondaryButton: "Hubungi Konsultan"
    },

    // SEO Settings
    seo: {
      metaTitle: "Rumah Profit Property Agent - Jual Beli Properti Terpercaya",
      metaDescription: "Solusi jual beli properti terpercaya milik Bu Elita. Layanan profesional dengan pengalaman 8+ tahun di industri properti.",
      keywords: "jual beli properti, rumah profit, properti bekasi, agen properti, jual rumah, beli rumah, properti jakarta",
      ogTitle: "Rumah Profit Property Agent",
      ogDescription: "Solusi properti terpercaya dengan pengalaman 8+ tahun",
      ogImage: "/og-image.jpg"
    },

    // Site Settings
    site: {
      name: "Rumah Profit Property Agent",
      tagline: "Solusi Jual Beli Properti Terpercaya",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#1e40af",
      secondaryColor: "#f59e0b",
      fontFamily: "Inter"
    },

    // Notifications
    notifications: {
      newLeadEmail: true,
      weeklyReports: true,
      propertyUpdates: true,
      systemAlerts: true,
      emailAddress: "admin@rumahprofit.com"
    }
  });

  const handleContentChange = (section: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleNestedContentChange = (section: string, subsection: string, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [subsection]: {
          ...(prev[section as keyof typeof prev] as any)[subsection],
          [field]: value
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving content:", content);
    setHasUnsavedChanges(false);
    // You could add a toast notification here
  };

  const handlePreview = () => {
    window.open("/", "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-gray-600">Edit website content and information</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview Website
          </Button>
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          {hasUnsavedChanges && (
            <Badge variant="outline" className="text-orange-600 border-orange-200">
              Unsaved Changes
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="about" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Hero
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Site
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Alerts
          </TabsTrigger>
        </TabsList>

        {/* About Page Content */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                About Page Content
              </CardTitle>
              <p className="text-sm text-gray-600">Edit the about page content and company information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="about-title">Page Title</Label>
                  <Input
                    id="about-title"
                    value={content.about.title}
                    onChange={(e) => handleContentChange("about", "title", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">Subtitle</Label>
                  <Input
                    id="about-subtitle"
                    value={content.about.subtitle}
                    onChange={(e) => handleContentChange("about", "subtitle", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="about-description">Description</Label>
                <Textarea
                  id="about-description"
                  value={content.about.description}
                  onChange={(e) => handleContentChange("about", "description", e.target.value)}
                  rows={6}
                  placeholder="Describe your company..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Mission</h3>
                  <div>
                    <Label htmlFor="mission-title">Mission Title</Label>
                    <Input
                      id="mission-title"
                      value={content.about.mission.title}
                      onChange={(e) => handleNestedContentChange("about", "mission", "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mission-content">Mission Content</Label>
                    <Textarea
                      id="mission-content"
                      value={content.about.mission.content}
                      onChange={(e) => handleNestedContentChange("about", "mission", "content", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Vision</h3>
                  <div>
                    <Label htmlFor="vision-title">Vision Title</Label>
                    <Input
                      id="vision-title"
                      value={content.about.vision.title}
                      onChange={(e) => handleNestedContentChange("about", "vision", "title", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vision-content">Vision Content</Label>
                    <Textarea
                      id="vision-content"
                      value={content.about.vision.content}
                      onChange={(e) => handleNestedContentChange("about", "vision", "content", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div>
                <h3 className="font-semibold mb-4">Company Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {content.about.stats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <Label htmlFor={`stat-${index}-number`}>Number</Label>
                      <Input
                        id={`stat-${index}-number`}
                        value={stat.number}
                        onChange={(e) => {
                          const newStats = [...content.about.stats];
                          newStats[index].number = e.target.value;
                          handleContentChange("about", "stats", newStats);
                        }}
                      />
                      <Label htmlFor={`stat-${index}-label`}>Label</Label>
                      <Input
                        id={`stat-${index}-label`}
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...content.about.stats];
                          newStats[index].label = e.target.value;
                          handleContentChange("about", "stats", newStats);
                        }}
                      />
                      <Label htmlFor={`stat-${index}-description`}>Description</Label>
                      <Input
                        id={`stat-${index}-description`}
                        value={stat.description}
                        onChange={(e) => {
                          const newStats = [...content.about.stats];
                          newStats[index].description = e.target.value;
                          handleContentChange("about", "stats", newStats);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Contact Information
              </CardTitle>
              <p className="text-sm text-gray-600">Update contact details and office information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-phone">Primary Phone</Label>
                  <Input
                    id="primary-phone"
                    value={content.contact.primaryPhone}
                    onChange={(e) => handleContentChange("contact", "primaryPhone", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="secondary-phone">Secondary Phone</Label>
                  <Input
                    id="secondary-phone"
                    value={content.contact.secondaryPhone}
                    onChange={(e) => handleContentChange("contact", "secondaryPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-email">Primary Email</Label>
                  <Input
                    id="primary-email"
                    type="email"
                    value={content.contact.primaryEmail}
                    onChange={(e) => handleContentChange("contact", "primaryEmail", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="secondary-email">Secondary Email</Label>
                  <Input
                    id="secondary-email"
                    type="email"
                    value={content.contact.secondaryEmail}
                    onChange={(e) => handleContentChange("contact", "secondaryEmail", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={content.contact.whatsapp}
                  onChange={(e) => handleContentChange("contact", "whatsapp", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Office Address</Label>
                <Textarea
                  id="address"
                  value={content.contact.address}
                  onChange={(e) => handleContentChange("contact", "address", e.target.value)}
                  rows={4}
                />
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold mb-4">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="facebook">Facebook URL</Label>
                    <Input
                      id="facebook"
                      value={content.contact.socialMedia.facebook}
                      onChange={(e) => handleNestedContentChange("contact", "socialMedia", "facebook", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram URL</Label>
                    <Input
                      id="instagram"
                      value={content.contact.socialMedia.instagram}
                      onChange={(e) => handleNestedContentChange("contact", "socialMedia", "instagram", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp-link">WhatsApp URL</Label>
                    <Input
                      id="whatsapp-link"
                      value={content.contact.socialMedia.whatsapp}
                      onChange={(e) => handleNestedContentChange("contact", "socialMedia", "whatsapp", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Hero Section
              </CardTitle>
              <p className="text-sm text-gray-600">Edit the main hero section content</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Hero Title</Label>
                <Input
                  id="hero-title"
                  value={content.hero.title}
                  onChange={(e) => handleContentChange("hero", "title", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={content.hero.subtitle}
                  onChange={(e) => handleContentChange("hero", "subtitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="hero-background">Background Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="hero-background"
                    value={content.hero.backgroundImage}
                    onChange={(e) => handleContentChange("hero", "backgroundImage", e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-button">Primary Button Text</Label>
                  <Input
                    id="primary-button"
                    value={content.hero.primaryButton}
                    onChange={(e) => handleContentChange("hero", "primaryButton", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="secondary-button">Secondary Button Text</Label>
                  <Input
                    id="secondary-button"
                    value={content.hero.secondaryButton}
                    onChange={(e) => handleContentChange("hero", "secondaryButton", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                SEO Settings
              </CardTitle>
              <p className="text-sm text-gray-600">Configure SEO and meta information for better search engine visibility</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={content.seo.metaTitle}
                  onChange={(e) => handleContentChange("seo", "metaTitle", e.target.value)}
                  placeholder="Keep under 60 characters"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content.seo.metaTitle.length}/60 characters
                </p>
              </div>
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={content.seo.metaDescription}
                  onChange={(e) => handleContentChange("seo", "metaDescription", e.target.value)}
                  rows={3}
                  placeholder="Keep under 160 characters"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content.seo.metaDescription.length}/160 characters
                </p>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={content.seo.keywords}
                  onChange={(e) => handleContentChange("seo", "keywords", e.target.value)}
                  placeholder="Separate keywords with commas"
                />
              </div>

              {/* Open Graph */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Open Graph (Social Media)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input
                      id="og-title"
                      value={content.seo.ogTitle}
                      onChange={(e) => handleContentChange("seo", "ogTitle", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="og-image">OG Image URL</Label>
                    <Input
                      id="og-image"
                      value={content.seo.ogImage}
                      onChange={(e) => handleContentChange("seo", "ogImage", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="og-description">OG Description</Label>
                  <Textarea
                    id="og-description"
                    value={content.seo.ogDescription}
                    onChange={(e) => handleContentChange("seo", "ogDescription", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings */}
        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Site Settings
              </CardTitle>
              <p className="text-sm text-gray-600">Configure basic website settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={content.site.name}
                    onChange={(e) => handleContentChange("site", "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="site-tagline">Site Tagline</Label>
                  <Input
                    id="site-tagline"
                    value={content.site.tagline}
                    onChange={(e) => handleContentChange("site", "tagline", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={content.site.logo}
                      onChange={(e) => handleContentChange("site", "logo", e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="favicon"
                      value={content.site.favicon}
                      onChange={(e) => handleContentChange("site", "favicon", e.target.value)}
                    />
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={content.site.primaryColor}
                      onChange={(e) => handleContentChange("site", "primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={content.site.primaryColor}
                      onChange={(e) => handleContentChange("site", "primaryColor", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={content.site.secondaryColor}
                      onChange={(e) => handleContentChange("site", "secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={content.site.secondaryColor}
                      onChange={(e) => handleContentChange("site", "secondaryColor", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select 
                    value={content.site.fontFamily} 
                    onValueChange={(value) => handleContentChange("site", "fontFamily", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <p className="text-sm text-gray-600">Configure email notifications and alerts</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="notification-email">Notification Email</Label>
                <Input
                  id="notification-email"
                  type="email"
                  value={content.notifications.emailAddress}
                  onChange={(e) => handleContentChange("notifications", "emailAddress", e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Lead Notifications</Label>
                    <p className="text-sm text-gray-500">Get notified when new leads are submitted</p>
                  </div>
                  <Switch
                    checked={content.notifications.newLeadEmail}
                    onCheckedChange={(checked) => handleContentChange("notifications", "newLeadEmail", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Receive weekly performance reports</p>
                  </div>
                  <Switch
                    checked={content.notifications.weeklyReports}
                    onCheckedChange={(checked) => handleContentChange("notifications", "weeklyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Property Updates</Label>
                    <p className="text-sm text-gray-500">Notifications for property status changes</p>
                  </div>
                  <Switch
                    checked={content.notifications.propertyUpdates}
                    onCheckedChange={(checked) => handleContentChange("notifications", "propertyUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>System Alerts</Label>
                    <p className="text-sm text-gray-500">Important system notifications</p>
                  </div>
                  <Switch
                    checked={content.notifications.systemAlerts}
                    onCheckedChange={(checked) => handleContentChange("notifications", "systemAlerts", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
