import React, { useEffect, useState } from 'react';
import Header from './Header';
import AdminPage from './AdminPage';
import AddProduct from './AddProduct';
import axios from 'axios';
import { use } from 'react';

function AdminLayout() {
  const [activePage, setActivePage] = useState("AdminPage");
  const [userdata, setUserdata] = useState(null);
  const [isBusiness, setIsBusiness] = useState(false);


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`/api/user/getUserProfile`, {
          withCredentials: true
        });

        const user = res.data.data;
        setUserdata(user);

        if (user.isBussiness === true) {
          setIsBusiness(true);
        } else {
          alert("You Are Not A Business Account");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchdata();
  }, []);

  if (!userdata) return null; 

  return (
    isBusiness ? (
      <div className="overFlow w-full min-h-screen bg-gray-900">
        <div className="w-full h-[12vh]">
          <Header setActivePage={setActivePage} user={userdata} />
        </div>
        <div className="w-full min-h-[88vh]">
          {activePage === "AdminPage" ? <AdminPage user={userdata}/> : <AddProduct user={userdata} />}
        </div>
      </div>
    ) : (
      <div className="text-white text-center mt-10">
        You do not have permission to access the admin panel.
      </div>
    )
  );
}

export default AdminLayout;
