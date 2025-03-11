import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile } from '../../services/userService';
import UserProducts from '../user/UserProducts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user: userProfile, loading: userContextLoading } = useUser();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isAuthenticated) {
        try {
          setLoading(true);
          const data = await getUserProfile();
          setProfileData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (!authLoading && !userContextLoading) {
      fetchProfileData();
    }
  }, [isAuthenticated, authLoading, userContextLoading]);

  // Show loading state while either context is initializing
  if (authLoading || userContextLoading || loading) {
    return (
      <div className="flex justify-center items-center p-12 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md">
          <p className="font-medium mb-1">Error loading profile</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-600 mb-4">Please log in to view your profile</p>
        <Button 
          onClick={() => navigate('/login')}
          className="bg-gray-800 hover:bg-gray-700 text-white"
        >
          Log In
        </Button>
      </div>
    );
  }

  // Use profile data if available, otherwise fall back to user context data
  const displayData = profileData || userProfile;

  // Get initials for avatar fallback
  const getInitials = (name) => {
    if (!name) {
      // Use email if name is not available
      if (displayData.email) {
        return displayData.email.substring(0, 2).toUpperCase();
      }
      return 'U';
    }
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleTabChange = (e, value) => {
    setActiveTab(value);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <Card className="lg:col-span-1 border border-gray-200 shadow-sm bg-white">
          <CardHeader className="bg-white border-b border-gray-100">
            <CardTitle className="text-gray-900">Profile</CardTitle>
            <CardDescription className="text-gray-600">Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6">
            <Avatar className="h-24 w-24 mb-4 border-2 border-gray-200">
              <AvatarImage src={displayData?.avatar || null} alt={displayData?.name || 'User'} />
              <AvatarFallback className="bg-gray-100 text-gray-700">{getInitials(displayData?.name)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-2 text-gray-900">{displayData?.name || 'User'}</h2>
            <p className="text-gray-500 mb-4">{displayData?.email}</p>
            <div className="w-full mt-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Member since</span>
                <span className="text-gray-600">{displayData?.createdAt ? new Date(displayData.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Products</span>
                <span className="text-gray-600">{displayData?.productCount || 0}</span>
              </div>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Products and other sections */}
        <div className="lg:col-span-2">
          <Tabs className="w-full">
            <TabsList className="w-full bg-white p-1 rounded-md border border-gray-200">
              <TabsTrigger 
                value="products" 
                active={activeTab === "products"}
                onClick={handleTabChange}
                className="flex-1 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600"
              >
                My Products
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                active={activeTab === "orders"}
                onClick={handleTabChange}
                className="flex-1 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                active={activeTab === "settings"}
                onClick={handleTabChange}
                className="flex-1 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-900 data-[state=active]:shadow-sm text-gray-600"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="products" activeTab={activeTab} className="mt-6">
              <UserProducts />
            </TabsContent>
            <TabsContent value="orders" activeTab={activeTab} className="mt-6">
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="bg-white border-b border-gray-100">
                  <CardTitle className="text-gray-900">Orders</CardTitle>
                  <CardDescription className="text-gray-600">Your purchase history</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600">Order history will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" activeTab={activeTab} className="mt-6">
              <Card className="border border-gray-200 bg-white">
                <CardHeader className="bg-white border-b border-gray-100">
                  <CardTitle className="text-gray-900">Account Settings</CardTitle>
                  <CardDescription className="text-gray-600">Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600">Account settings will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile; 