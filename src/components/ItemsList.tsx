// Example component showing API integration
import { useState, useEffect } from 'react';
import { api, type Item } from '../lib/api';

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.getItems({ page: 1, limit: 10 });
      if (response.success && response.data) {
        setItems(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      const response = await api.createItem({
        name: newItemName,
        description: 'Created from frontend',
        status: 'active',
      });
      
      if (response.success && response.data) {
        setItems([response.data, ...items]);
        setNewItemName('');
      }
    } catch (err) {
      alert('Failed to create item');
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      await api.deleteItem(id);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const handleToggleStatus = async (item: Item) => {
    try {
      const newStatus = item.status === 'active' ? 'inactive' : 'active';
      const response = await api.updateItem(item._id, { status: newStatus });
      
      if (response.success && response.data) {
        setItems(items.map(i => i._id === item._id ? response.data! : i));
      }
    } catch (err) {
      alert('Failed to update item');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Items Manager</h1>

      {/* Create Item Form */}
      <form onSubmit={handleCreateItem} className="mb-8 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </form>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No items yet. Create your first item above!
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                {item.description && (
                  <p className="text-gray-600 text-sm">{item.description}</p>
                )}
                <div className="flex gap-2 mt-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded ${
                      item.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(item)}
                  className="px-4 py-2 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Toggle
                </button>
                <button
                  onClick={() => handleDeleteItem(item._id)}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
