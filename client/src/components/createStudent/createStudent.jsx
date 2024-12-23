import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./createStudent.css";
const apiUrl = process.env.REACT_APP_API_URL;

function CreateStudent({ editData, onClose, refreshList }) {
  const [file, setFile] = useState();
  const [student, setStudent] = useState({ 
    name: '', 
    email: '', 
    dob: '', 
    branch: 'CSE', 
    semester: 'first', 
    photo: '' 
  });

  const branches = ['CSE', 'IT', 'ME', 'CE', 'AE', 'BT', 'Other'];
  const semesters = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];

  useEffect(() => {
    if (editData) {
      setStudent(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', student.name);
      formData.append('email', student.email);
      formData.append('dob', student.dob);
      formData.append('branch', student.branch);
      formData.append('semester', student.semester);
      if (file) {
        formData.append('photo', file);
      }

      if (editData) {
        // formData.append('id', editData.id);

        await axios.put(
          `apiUrl/v1/update-detail/${editData.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data', 
            },
          }
        );
        alert('Student updated successfully');
        window.location.reload()
      } else {
        await axios.post(
          'http://localhost:3000/v1/create',
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        alert('Student added successfully');
      }

      refreshList((prev) => [...prev, student]);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error saving student details');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='title'>{editData ? 'Edit Student' : 'Add Student'}</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={student.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={student.email}
            onChange={handleChange}
          />
          <input
            type="date"
            name="dob"
            placeholder="DOB"
            value={student.dob}
            onChange={handleChange}
          />
          <select name="branch" value={student.branch} onChange={handleChange}>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <select name="semester" value={student.semester} onChange={handleChange}>
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester.charAt(0).toUpperCase() + semester.slice(1)}
              </option>
            ))}
          </select>

          <input 
            type="file" 
            name="image" 
            onChange={handleImageChange} 
          />
          
          <button type="submit">{editData ? 'Update Student' : 'Add Student'}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
