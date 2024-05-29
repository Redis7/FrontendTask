import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from './interfaces/d';
import styled from 'styled-components';

interface UserListProps {
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Users: React.FC<UserListProps> = ({ setEditingUser, setShowForm }) => {
  const [users, setUsers] = useState<User[]>([]);
  

  useEffect(() => {
    axios.get('http://localhost:8000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const deleteUser = (id: number) => {
    axios.delete(`http://localhost:8000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.error('Error deleting user:', error));
  };
  useEffect(() => {
   
  }, []);
  return (
    <Container>
    
    <NewUserButton onClick={() => { setEditingUser(null); setShowForm(true); }}>
      + Create New User
    </NewUserButton>
    <Table>
      <TableHeaders>
        
        <TableRow>
          <TableHeader>ID</TableHeader>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Phone</TableHeader>
          <TableHeader>Actions</TableHeader>
        </TableRow>
        
      </TableHeaders>
      <TableBody>
        {users.map(user => (
          <RowWrapper key={user.id}>
            <TableRow >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <ActionButtons onClick={() => { setEditingUser(user); setShowForm(true);  }}>
                  <i className="fas fa-edit"></i>
                </ActionButtons>
                <ActionButtons onClick={() => deleteUser(user.id!)}>
                  <i className="fas fa-trash"></i>
                </ActionButtons>
              </TableCell>
            </TableRow>
          </RowWrapper>
        ))}
      </TableBody>
    </Table>
  </Container>
);
};

export default Users;

const Container = styled.div`
margin: 20px
padding: 20px;
background: white;
width:90vw;
`;



const NewUserButton = styled.button`
background-color: #f44336;
color: white;
padding: 10px;
border: none;
border-radius: 5px;
cursor: pointer;
float: right;
margin-bottom: 20px;
margin-top:30px;
height:35px;

`;

const Table = styled.table`
width: 100%;
border-collapse: collapse;
`;

const TableHeader = styled.th`
padding: 12px;
text-align: left;
width:210px;

&:last-child {
  text-align: right;
}
`;
const TableHeaders = styled.th`
padding: 12px;
text-align: left;
width:100%;

`;

const TableBody=styled.tbody`
width:100%`

const RowWrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  border: solid #E7EAF3 1px;
  border-radius: 5px;
`;

const TableRow = styled.tr`
  background: white;
 width:100%;
 
`;

const TableCell = styled.td`
padding: 12px;
text-align: left;
height:45px;
width:210px;
vertical-align: middle;
&:last-child {
  text-align: right;
}
`;

const ActionButtons = styled.button`
background: none;
border: none;
cursor: pointer;
padding: 5px;

i {
  font-size: 16px;
  color: #2196F3;
  margin-right: 5px;

  &:last-child {
    color: #CCD2E3;
  }
}
`;