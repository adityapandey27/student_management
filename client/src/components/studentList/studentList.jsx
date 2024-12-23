import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './studentList.css';
import CreateStudent from '../createStudent/createStudent';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await axios.get('http://localhost:3000/v1/students-list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (data.data.success) {
          setStudents(data.data.message.response);
        } else {
          alert('Something went wrong!');
        }

        console.log("students:::::::::::::::;",students)
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/v1/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        alert('Student deleted successfully');
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === id
              ? { ...student, deletedAt: new Date().toISOString() }
              : student
          )
        );
      } else {
        alert('Error deleting student');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting student');
    }
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setIsEditing(true);
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <button className="create-button" onClick={() => setIsCreating(true)}>
        Add New Student
      </button>
      <div className="table-parent">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Branch</th>
              <th>Semester</th>
              <th>Deleted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                  <td>
                    {student.photo ? (
                      <img src={`http://localhost:3000/`+student.photo} alt="Student" style={{ width: '100px', height: '100px' }} />
                    ) : (
                      'No Image'
                    )}
                  </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{new Date(student.dob).toLocaleDateString()}</td>
                <td>{student.branch}</td>
                <td>{student.semester}</td>
                <td>
                  {student.deletedAt
                    ? new Date(student.deletedAt).toLocaleString()
                    : 'NA'}
                </td>
                <td>
                  <button className="edit-button" onClick={() => openEditModal(student)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => deleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCreating && <CreateStudent onClose={() => setIsCreating(false)} refreshList={setStudents} />}
      {isEditing && (
        <CreateStudent
          editData={editStudent}
          onClose={() => setIsEditing(false)}
          refreshList={setStudents}
        />
      )}
    </div>
  );
}

export default StudentList;
