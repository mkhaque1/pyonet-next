import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaLock, FaEdit, FaSave } from 'react-icons/fa';

interface ClientData {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

interface ClientProfileProps {
  clientData: ClientData;
}

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function ClientProfile({ clientData }: ClientProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const { 
    register: registerProfile, 
    handleSubmit: handleSubmitProfile, 
    formState: { errors: profileErrors } 
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      company: clientData.company,
      address: clientData.address,
    },
  });
  
  const { 
    register: registerPassword, 
    handleSubmit: handleSubmitPassword, 
    formState: { errors: passwordErrors },
    reset: resetPassword
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });
  
  const onSubmitProfile = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Profile data:', data);
    
    setIsSubmitting(false);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };
  
  const onSubmitPassword = async (data: PasswordFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Password data:', data);
    
    setIsSubmitting(false);
    setIsChangingPassword(false);
    resetPassword();
    toast.success('Password changed successfully!');
  };
  
  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-sm btn-outline flex items-center"
          >
            {isEditing ? (
              <>
                <FaSave className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <FaEdit className="mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-dark-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    {...registerProfile('name')}
                    className={`glass-input pl-10 pr-4 py-2 w-full rounded-lg ${profileErrors.name ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                </div>
                {profileErrors.name && (
                  <p className="mt-1 text-sm text-error-500">{profileErrors.name.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-dark-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    {...registerProfile('email')}
                    className={`glass-input pl-10 pr-4 py-2 w-full rounded-lg ${profileErrors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                </div>
                {profileErrors.email && (
                  <p className="mt-1 text-sm text-error-500">{profileErrors.email.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-dark-400" />
                  </div>
                  <input
                    id="phone"
                    type="text"
                    {...registerProfile('phone')}
                    className={`glass-input pl-10 pr-4 py-2 w-full rounded-lg ${profileErrors.phone ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                </div>
                {profileErrors.phone && (
                  <p className="mt-1 text-sm text-error-500">{profileErrors.phone.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-dark-400" />
                  </div>
                  <input
                    id="company"
                    type="text"
                    {...registerProfile('company')}
                    className={`glass-input pl-10 pr-4 py-2 w-full rounded-lg ${profileErrors.company ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                  />
                </div>
                {profileErrors.company && (
                  <p className="mt-1 text-sm text-error-500">{profileErrors.company.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-dark-400" />
                </div>
                <input
                  id="address"
                  type="text"
                  {...registerProfile('address')}
                  className={`glass-input pl-10 pr-4 py-2 w-full rounded-lg ${profileErrors.address ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
              </div>
              {profileErrors.address && (
                <p className="mt-1 text-sm text-error-500">{profileErrors.address.message}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-ghost mr-3"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaSave className="mr-2" />
                    Save Changes
                  </span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <p className="text-sm text-dark-400 mb-1">Full Name</p>
              <p className="font-medium">{clientData.name}</p>
            </div>
            
            <div>
              <p className="text-sm text-dark-400 mb-1">Email Address</p>
              <p className="font-medium">{clientData.email}</p>
            </div>
            
            <div>
              <p className="text-sm text-dark-400 mb-1">Phone Number</p>
              <p className="font-medium">{clientData.phone}</p>
            </div>
            
            <div>
              <p className="text-sm text-dark-400 mb-1">Company</p>
              <p className="font-medium">{clientData.company}</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm text-dark-400 mb-1">Address</p>
              <p className="font-medium">{clientData.address}</p>
            </div>
            
            <div>
              <p className="text-sm text-dark-400 mb-1">Client Since</p>
              <p className="font-medium">{new Date(clientData.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6 rounded-xl"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold">Security Settings</h2>
          
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="btn btn-sm btn-outline flex items-center"
          >
            {isChangingPassword ? (
              <>
                <FaLock className="mr-2" />
                Cancel
              </>
            ) : (
              <>
                <FaLock className="mr-2" />
                Change Password
              </>
            )}
          </button>
        </div>
        
        {isChangingPassword ? (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  {...registerPassword('currentPassword')}
                  className={`glass-input px-4 py-2 w-full rounded-lg ${passwordErrors.currentPassword ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-sm text-error-500">{passwordErrors.currentPassword.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  {...registerPassword('newPassword')}
                  className={`glass-input px-4 py-2 w-full rounded-lg ${passwordErrors.newPassword ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-sm text-error-500">{passwordErrors.newPassword.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...registerPassword('confirmPassword')}
                  className={`glass-input px-4 py-2 w-full rounded-lg ${passwordErrors.confirmPassword ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                />
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-error-500">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsChangingPassword(false)}
                className="btn btn-ghost mr-3"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Updating...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaSave className="mr-2" />
                    Update Password
                  </span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-dark-400">
              Your password was last updated on {new Date().toLocaleDateString()}.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Two-Factor Authentication</h3>
              <div className="flex items-center">
                <button className="btn btn-sm btn-outline mr-3">
                  Enable 2FA
                </button>
                <span className="text-sm text-dark-400">
                  Not enabled
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}