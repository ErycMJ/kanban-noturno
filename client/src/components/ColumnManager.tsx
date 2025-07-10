import { useState } from 'react';
import { X, Plus, Edit2, Trash2, Check } from 'lucide-react';
import type { Column } from '../types/project';

interface ColumnManagerProps {
  columns: Column[];
  onCreateColumn: (column: { name: string; color: string }) => void;
  onUpdateColumn: (id: string, updates: Partial<Column>) => void;
  onDeleteColumn: (id: string) => void;
  onClose: () => void;
}

const ColumnManager: React.FC<ColumnManagerProps> = ({
  columns,
  onCreateColumn,
  onUpdateColumn,
  onDeleteColumn,
  onClose
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newColumn, setNewColumn] = useState({ name: '', color: 'gray' });
  const [editForm, setEditForm] = useState({ name: '', color: 'gray' });

  const colors = [
    { value: 'gray', label: 'Cinza', class: 'bg-gray-400' },
    { value: 'blue', label: 'Azul', class: 'bg-blue-400' },
    { value: 'green', label: 'Verde', class: 'bg-green-400' },
    { value: 'red', label: 'Vermelho', class: 'bg-red-400' },
    { value: 'yellow', label: 'Amarelo', class: 'bg-yellow-400' },
    { value: 'purple', label: 'Roxo', class: 'bg-purple-400' },
    { value: 'pink', label: 'Rosa', class: 'bg-pink-400' },
    { value: 'indigo', label: 'Índigo', class: 'bg-indigo-400' },
  ];

  const handleCreateColumn = () => {
    if (newColumn.name.trim()) {
      onCreateColumn(newColumn);
      setNewColumn({ name: '', color: 'gray' });
      setIsCreating(false);
    }
  };

  const handleEditColumn = (column: Column) => {
    setEditingId(column.id);
    setEditForm({ name: column.name, color: column.color });
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.name.trim()) {
      onUpdateColumn(editingId, editForm);
      setEditingId(null);
      setEditForm({ name: '', color: 'gray' });
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', color: 'gray' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-96 overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Gerenciar Colunas</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-80">
          <div className="space-y-3 mb-6">
            {columns.map((column) => (
              <div key={column.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                {editingId === column.id ? (
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {colors.map((color) => (
                        <option key={color.value} value={color.value}>
                          {color.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSaveEdit}
                      className="text-green-600 hover:text-green-700 p-1"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-400 hover:text-gray-500 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${colors.find(c => c.value === column.color)?.class}`}></div>
                      <span className="font-medium text-gray-900">{column.name}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEditColumn(column)}
                        className="text-gray-400 hover:text-blue-500 p-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDeleteColumn(column.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {isCreating ? (
            <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome da Coluna
                  </label>
                  <input
                    type="text"
                    value={newColumn.name}
                    onChange={(e) => setNewColumn({ ...newColumn, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Digite o nome da coluna"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cor
                  </label>
                  <select
                    value={newColumn.color}
                    onChange={(e) => setNewColumn({ ...newColumn, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {colors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateColumn}
                    className="px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Criar Coluna
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
              <Plus className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm font-medium">Adicionar Nova Coluna</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColumnManager;