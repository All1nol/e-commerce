import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
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
  const { user, loading: userContextLoading } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  console.log('Profile component rendering, user:', user);
  console.log('userContextLoading:', userContextLoading);

  useEffect(() => {
    const fetchProfileData = async () => {
      console.log('fetchProfileData called, user:', user);
      if (user && user._id) {
        try {
          setLoading(true);
          console.log('Fetching profile data...');
          const data = await getUserProfile();
          console.log('Profile data fetched:', data);
          setProfileData(data);
        } catch (err) {
          console.error('Error fetching profile data:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.log('User or user._id not available, skipping profile fetch');
        setLoading(false);
      }
    };

    if (!userContextLoading) {
      fetchProfileData();
    }
  }, [user, userContextLoading]);

  if (userContextLoading || loading) {
    return <div className="flex justify-center items-center p-8">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading profile: {error}</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">Please log in to view your profile</p>
        <Button onClick={() => navigate('/login')}>
          Log In
        </Button>
      </div>
    );
  }

  // Use user data if profileData is not available
  const displayData = profileData || user;

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={displayData?.avatar || null} alt={displayData?.name || 'User'} />
              <AvatarFallback>{getInitials(displayData?.name)}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-2">{displayData?.name || 'User'}</h2>
            <p className="text-gray-500 mb-4">{displayData?.email}</p>
            <div className="w-full mt-4">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Member since</span>
                <span>{displayData?.createdAt ? new Date(displayData.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Products</span>
                <span>{displayData?.productCount || 0}</span>
              </div>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  className="w-full"
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
            <TabsList className="w-full">
              <TabsTrigger 
                value="products" 
                active={activeTab === "products"}
                onClick={handleTabChange}
                className="flex-1"
              >
                My Products
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                active={activeTab === "orders"}
                onClick={handleTabChange}
                className="flex-1"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                active={activeTab === "settings"}
                onClick={handleTabChange}
                className="flex-1"
              >
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="products" activeTab={activeTab} className="mt-4">
              <UserProducts />
            </TabsContent>
            <TabsContent value="orders" activeTab={activeTab} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Your purchase history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Order history will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="settings" activeTab={activeTab} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Account settings will be displayed here.</p>
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