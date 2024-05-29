import React, { useState, useEffect} from "react"
import axios from 'axios';
import { User } from './interfaces/d';
import styled from 'styled-components';

interface UserFormProps {
  editUser: User | null;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const AddUser: React.FC<UserFormProps> = ({ editUser, setShowForm }) => {
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    email: '',
    phone: '',
    address: {
      city: '',
      zipcode: '',
      street:''
    }
  });
  const [message, setMessage] = useState<string | null>(null);

  

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    }
  }, [editUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setUser(prevUser => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value
        }
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editUser) {
      axios.put(`http://localhost:8000/users/${user.id}`, user)
      .then(() => {
        setMessage('User updated successfully!')
        setTimeout(() => {
          setShowForm(false);
          
        }, 2000);
        setTimeout(() => {
          window.location.reload();
          
        }, 2000);
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('http://localhost:8000/users', user)
        .then(() => {
        setMessage('User added successfully!')
        setTimeout(() => {
          setShowForm(false);
          
        }, 2000);
        setTimeout(() => {
          window.location.reload();
          
        }, 2000);
      })
        .catch(error => console.error('Error creating user:', error));
    }
  };

  return (
    <>
      <Page onClick={() => setShowForm(false)} />
      <Modal>
        <div style={{borderBottom:"solid #E7EAF3 1px",width:"100%"}}>
        <h2 style={{fontFamily:"Roboto",fontWeight:"700",fontSize:"18px",marginLeft:"40PX"}}>New User Info</h2>
        
        <CloseButton onClick={() => setShowForm(false)}>×</CloseButton>
        </div>
        <Form onSubmit={handleSubmit}>
         
          <FormGrid>
            <FormRow>
              <FormLabel>Full Name</FormLabel>
              <FormInput type="text" name="name" value={user.name} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>Address</FormLabel>
              <FormInput type="text" name="address.street" value={user.address.street} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>Username</FormLabel>
              <FormInput type="text" name="username" value={user.username} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>City</FormLabel>
              <FormInput type="text" name="address.city" value={user.address.city} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" name="email" value={user.email} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>Zip Code</FormLabel>
              <FormInput type="number" name="address.zipcode" value={user.address.zipcode} onChange={handleChange} required />
            </FormRow>
            <FormRow>
              <FormLabel>Phone Nr</FormLabel>
              <FormInput type="tel" name="phone" value={user.phone} onChange={handleChange} required />
            </FormRow>
            
           
          </FormGrid>
          <SubmitButton type="submit">Save</SubmitButton>
          {message && <Message>{message}</Message>}
        </Form>
      </Modal>
    </>
  );
};

export default AddUser;

const Page = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 
  z-index: 999;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 590px;
  width: 100%;
  height:490px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color:#CCD2E3
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
`;

const FormInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;
  font-size: 12px;
  width:100px;
  height:35px;

  &:hover {
    background-color: #d32f2f;
  }
`;



const Message = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #4caf50;
`;