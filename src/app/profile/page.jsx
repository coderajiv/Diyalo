"use client";

import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut, updateUserProfile } from '@/auth';
import { getOrdersForUser, deleteOrder } from '@/orders';
import { getAddressesForUser, addAddress, deleteAddress } from '@/addresses';
import { FaUserEdit, FaBoxOpen, FaMapMarkerAlt, FaSignOutAlt, FaSpinner, FaTrash } from 'react-icons/fa';

// --- Reusable UI Components for a Professional Look ---
const Card = ({ children }) => <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-shadow hover:shadow-xl">{children}</div>;
const Button = ({ children, onClick, type = "button", variant = 'primary', disabled = false }) => {
  const baseClasses = "px-5 py-2.5 font-semibold rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]}`}>{children}</button>;
};
const Input = (props) => <input {...props} className="w-full border border-gray-300 p-2 rounded-lg mt-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />;

// --- Profile Settings Component ---
function ProfileSettings({ user, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    mobile: user.mobile || '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(() => {
        const updates = {};
        if (formData.fullName && formData.fullName !== user.name) updates.fullName = formData.fullName;
        if (formData.email && formData.email !== user.email) updates.email = formData.email;
        if (formData.mobile !== user.mobile) updates.mobile = formData.mobile;
        if (formData.password) updates.password = formData.password;

        if (Object.keys(updates).length === 0) {
            setMessage({ type: 'info', text: "No changes to save." });
            return;
        }
        
        const result = updateUserProfile(user.email, updates);
        if (result.success) {
            setMessage({ type: 'success', text: "Profile updated successfully!" });
            onProfileUpdate();
        } else {
            setMessage({ type: 'error', text: result.error });
        }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <Input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email Address</label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Mobile Number (Optional)</label>
          <Input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? <FaSpinner className="animate-spin mx-auto" /> : 'Save Changes'}
        </Button>
        {message && <p className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-600' : message.type === 'error' ? 'text-red-600' : 'text-gray-600'}`}>{message.text}</p>}
      </form>
    </div>
  );
}

// --- Order History Component ---
function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOrders(getOrdersForUser(user.email).reverse());
      setIsLoading(false);
    }, 500);
  }, [user.email]);
  
  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order history? This action cannot be undone.")) {
      deleteOrder(orderId);
      setOrders(getOrdersForUser(user.email).reverse());
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-40"><FaSpinner className="animate-spin text-4xl text-blue-500"/></div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">Order History</h2>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border rounded-xl p-4 transition-all hover:shadow-md bg-gray-50">
              <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                <div>
                  <p className="font-semibold text-gray-800">Order #{order.id.split('_')[1]}</p>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-right font-bold text-xl text-gray-900">Total: ${order.total.toFixed(2)}</p>
                    <button 
                        onClick={() => handleDeleteOrder(order.id)} 
                        className="text-xs text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                        aria-label="Delete order"
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
              </div>
              <ul className="divide-y divide-gray-200 border-t pt-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-sm py-2">
                    <span className="font-medium">{item.name} <span className="text-gray-500">(x{item.quantity})</span></span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : <p>You have not placed any orders yet.</p>}
    </div>
  );
}

// --- Address Book Component ---
function AddressBook({ user }) {
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', zip: '' });

  useEffect(() => {
    setAddresses(getAddressesForUser(user.email));
  }, [user.email]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city) {
        alert("Please fill in the Street and City fields.");
        return;
    }
    addAddress(user.email, newAddress);
    setAddresses(getAddressesForUser(user.email));
    setNewAddress({ street: '', city: '', zip: '' });
    setIsAdding(false);
  };
  
  const handleDeleteAddress = (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      deleteAddress(addressId);
      setAddresses(getAddressesForUser(user.email));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Addresses</h2>
        {!isAdding && <Button onClick={() => setIsAdding(true)}>Add New</Button>}
      </div>
      
      {isAdding && (
         <form onSubmit={handleAddAddress} className="space-y-4 p-4 mb-8 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold">Add New Address</h3>
          <Input value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} placeholder="Street Address" required/>
          <Input value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} placeholder="City (e.g., Bharatpur)" required/>
          <Input value={newAddress.zip} onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})} placeholder="Postal Code (Optional)"/>
          <div className="flex gap-4 items-center">
            <Button type="submit">Save Address</Button>
            <button type="button" onClick={() => setIsAdding(false)} className="text-sm font-semibold text-gray-600 hover:text-gray-800">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {addresses.length > 0 ? addresses.map(addr => (
          <div key={addr.id} className="border p-4 rounded-lg flex justify-between items-center bg-white transition hover:border-gray-300">
            <p className="text-gray-700">{addr.street}, {addr.city}{addr.zip ? `, ${addr.zip}` : ''}</p>
            <button onClick={() => handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full">
              <FaTrash size={16}/>
            </button>
          </div>
        )) : !isAdding && <p>You have no saved addresses.</p>}
      </div>
    </div>
  );
}

// --- Main Profile Page Component ---
export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) router.push('/login');
    else setUser(currentUser);
  }, [router]);

  const handleProfileUpdate = () => setUser(getCurrentUser());
  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><FaSpinner className="animate-spin text-4xl text-blue-500"/></div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
              <nav className="space-y-2">
                <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-semibold transition-all duration-200 ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 hover:pl-5'}`}>
                  <FaUserEdit />
                  <span>Profile Settings</span>
                </button>
                <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-semibold transition-all duration-200 ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 hover:pl-5'}`}>
                  <FaBoxOpen />
                  <span>Order History</span>
                </button>
                <button onClick={() => setActiveTab('addresses')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left font-semibold transition-all duration-200 ${activeTab === 'addresses' ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-gray-100 hover:pl-5'}`}>
                  <FaMapMarkerAlt />
                  <span>My Addresses</span>
                </button>
                <div className="border-t pt-4 mt-4">
                  <button onClick={handleSignOut} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 font-semibold hover:bg-red-50 transition-all duration-200 hover:pl-5">
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <Card>
              {activeTab === 'profile' && <ProfileSettings user={user} onProfileUpdate={handleProfileUpdate} />}
              {activeTab === 'orders' && <OrderHistory user={user} />}
              {activeTab === 'addresses' && <AddressBook user={user} />}
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}