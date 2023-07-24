import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button,Table } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import AddSubjects from './AddSubjects';
import './subject.css'


const SubjectList = () => {
    const [SubjectList, setSubjectList] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState({});
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('/api/subjects');
            setSubjectList(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleEdit = (subject) => {
        setSelectedSubject(subject);
        setShowEditPopup(true);
    };

    const handleCloseEditPopup = () => {
        setSelectedSubject({});
        setShowEditPopup(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const { _id, ...subjectData } = selectedSubject;
            await axios.put(`/api/subjects/${_id}`, subjectData);
            setSuccessMessage('Subject updated successfully.');
            fetchSubjects();
            // setShowEditPopup(false);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to update Subject');
        }
    };
    const handleDelete = (subject) => {
        setSelectedSubject(subject);
        setShowDeletePopup(true);
    };

    const handleCloseDeletePopup = () => {
        setSelectedSubject({});
        setShowDeletePopup(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const confirmDelete = async () => {
        try {
            const { _id } = selectedSubject;
            await axios.delete(`/api/subjects/${_id}`);
            setShowDeletePopup(false);
            fetchSubjects();
            setSuccessMessage('Subject deleted successfully.');
            setSuccessMessage(true);
        } catch (error) {
            console.error(error);
            setErrorMessage('Failed to delete subject.');
        }
    };

    return (
        <div>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <Table striped hover className="mt-4">
                <thead>
                    <tr>
                        <th>
                            <AddSubjects/>
                        </th>
                    </tr>
                    <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {SubjectList.map((subject) => (
                        <tr key={subject._id}>
                            <td>{subject.subject_id}</td>
                            <td>{subject.subject_name}</td>
                            <td>
                                <Button variant="success" onClick={() => handleEdit(subject)} className="m-1" style={{ width: '100px' }}>
                                    Edit
                                </Button><br />
                                <Button variant="danger" onClick={() => handleDelete(subject)} className="m-1" style={{ width: '100px' }}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Popup open={showEditPopup} onClose={handleCloseEditPopup}>
                {selectedSubject && (
                    <div className="popup-container-subjects" style={{ backgroundColor: 'white', border: '2px solid green', padding: '25px' }}>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <Form.Label>Subject ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="subject_id"
                                    name="subject_id"
                                    value={selectedSubject.subject_id}
                                    onChange={(e) => setSelectedSubject({ ...selectedSubject, subject_id: e.target.value })}
                                />
                            </div>
                            <div>
                                <Form.Label>Subject Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="subject_name"
                                    name="subject_name"
                                    value={selectedSubject.subject_name}
                                    onChange={(e) => setSelectedSubject({ ...selectedSubject, subject_name: e.target.value })}
                                />
                            </div>

                            <Button variant="primary" type="submit" className='mt-5'>
                                Update
                            </Button>
                            <Button variant="secondary" onClick={handleCloseEditPopup} className="mx-3 mt-5">
                                Cancel
                            </Button>

                        </form>
                    </div>
                )}
            </Popup>


            <Popup open={showDeletePopup} onClose={handleCloseDeletePopup}>
                {selectedSubject && (
                    <div className="popup-container-delete">
                        <h5>Are you sure you want to delete this Subject?</h5>
                        Subject ID : {selectedSubject.subject_id}<br />
                        Subject Name   : {selectedSubject.subject_name}<br />
                        <Button variant="danger" onClick={confirmDelete} className='mx-3 mt-3'>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDeletePopup} className="ml-3 mt-3">
                            Cancel
                        </Button>
                    </div>
                )}
            </Popup>

        </div>
    );
};

export default SubjectList;