import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../Context/AuthContext.jsx';
import { getAllLeads, createLead, updateLead, deleteLead } from '../Services/Api.js';
import Navbar from '../Components/Navbar.jsx';
import LeadModal from "../Components/LeadModal.jsx";



const Dashboard = () => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const data = await getAllLeads(token);
      if (Array.isArray(data)) {
        setLeads(data);
      }
    } catch (err) {
      showMessage('Failed to fetch leads', 'error');
    }
  };

  const showMessage = (msg, type = 'error') => {
    if (type === 'error') {
      setError(msg);
      setTimeout(() => setError(''), 4000);
    } else {
      setSuccess(msg);
      setTimeout(() => setSuccess(''), 4000);
    }
  };

  const handleCreateLead = async (formData) => {
    try {
      const data = await createLead(token, formData);
      if (data.lead) {
        showMessage('Lead created successfully!', 'success');
        setShowModal(false);
        fetchLeads();
      } else {
        showMessage(data.message || 'Failed to create lead', 'error');
      }
    } catch (err) {
      showMessage('Network error. Please try again.', 'error');
    }
  };

  const handleUpdateLead = async (formData) => {
    try {
      const data = await updateLead(token, editingLead._id, formData);
      if (data.lead) {
        showMessage('Lead updated successfully!', 'success');
        setShowModal(false);
        setEditingLead(null);
        fetchLeads();
      } else {
        showMessage(data.message || 'Failed to update lead', 'error');
      }
    } catch (err) {
      showMessage('Network error. Please try again.', 'error');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await deleteLead(token, id);
      showMessage('Lead deleted successfully!', 'success');
      fetchLeads();
    } catch (err) {
      showMessage('Failed to delete lead', 'error');
    }
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setShowModal(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Contacted':
        return 'bg-green-100 text-green-800';
      case 'Lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            All Leads ({leads.length})
          </h2>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <Plus size={20} />
            Add Lead
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">
              No leads yet. Click "Add Lead" to create your first lead.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openEditModal(lead)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <LeadModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingLead(null);
        }}
        onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
        editingLead={editingLead}
      />
    </div>
  );
};

export default Dashboard;