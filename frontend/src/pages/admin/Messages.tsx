import React, { useEffect, useState } from 'react';
import { MessageSquare, Trash2, Eye, Filter } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date_sent: string;
}

const API_BASE_URL = 'http://localhost:5000/api';

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMessages();
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-accent-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-accent-500">Messages Management</h1>
          <p className="text-accent-400 mt-1">Review contact form messages</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-dark-900 rounded-lg p-6 border border-primary-500/20">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-primary-500" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-dark-800 border border-primary-500/20 rounded-lg text-accent-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-dark-900 rounded-lg border border-primary-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-accent-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-500/20">
              {filteredMessages.map((message) => (
                <tr key={message.id} className="hover:bg-dark-800/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-accent-500">
                        {message.name}
                      </div>
                      <div className="text-sm text-accent-400">
                        {message.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-accent-500">
                      {message.subject || 'No subject'}
                    </div>
                    <div className="text-sm text-accent-400 truncate max-w-xs">
                      {message.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-400">
                    {new Date(message.date_sent).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-primary-400 hover:text-primary-300"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-24 w-24 text-accent-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-accent-500 mb-2">No Messages Found</h3>
          <p className="text-accent-400">
            {messages.length === 0 ? 'No messages received yet.' : 'Try adjusting your search.'}
          </p>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-accent-500">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-accent-400 hover:text-accent-300"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">From</label>
                <p className="text-accent-500">{selectedMessage.name}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Email</label>
                <p className="text-accent-500">{selectedMessage.email}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Subject</label>
                <p className="text-accent-500">{selectedMessage.subject || 'No subject'}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Message</label>
                <p className="text-accent-500 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-accent-400 mb-1">Received</label>
                <p className="text-accent-500">{new Date(selectedMessage.date_sent).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;