import React from "react";
import { User, Mail, Calendar } from "lucide-react";
import { useAuth } from "../Context/AuthProvider";

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-purple-800 mb-2">
            {user?.email?.split("@")[0] || "User"}
          </h1>
          <p className="text-purple-600">Book Enthusiast</p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-[#F3E8FF] rounded-lg">
            <Mail className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-800">Email</p>
              <p className="text-purple-600">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[#F3E6FF] rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-800">Member Since</p>
              <p className="text-purple-600">
                {user?.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Recently joined"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-[#F3E8FF] rounded-lg">
          <h3 className="font-semibold text-purple-800 mb-4">Reading Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-purple-600 text-sm">Books Read</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">0</p>
              <p className="text-purple-600 text-sm">Reviews Written</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
