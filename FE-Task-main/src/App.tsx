import React, { useState } from 'react';
import Users from './components/Users.component';
import AddUser from './components/AddUser.modal';
import { User } from './components/interfaces/d'; 


const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  return (
    <div className="container">
     
      {showForm && (
        <AddUser editUser={editUser} setShowForm={setShowForm} />
      )}
      <Users setEditingUser={setEditUser} setShowForm={setShowForm} />
    </div>
  );
};

export default App;