import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Paper, TableContainer, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Main() {

    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [student, setStudent] = useState(null)
    const [deleteRollNo, setDeleteRollNo] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [newStudent, setNewStudent] = useState({
        rollno: '',
        name: '',
        date:'',
        city: '',
        emailid: ''
    })

    const [editStudent, setEditStudent] = useState({
        rollno: null,
        name: '',
        date:'',
        city: '',
        emailid: ''
    })

    const handleClickOpenEdit = (student) => {
        setEditStudent(student)
        setOpenEdit(true)
    }

    const handleChange = (e) => {
        setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    }

    const handleChangeEdit = (e) => {
        setEditStudent({ ...editStudent, [e.target.name]: e.target.value });
    }

    const handleConfirmOpen = (rollno) => {
        setDeleteRollNo(rollno)
        setConfirmOpen(true)
    }
    const handleConfirmClose = (rollno) => {
        setDeleteRollNo(null)
        setConfirmOpen(false)
    }

    const hanldeClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleEditStudent = async () => {
        try {
            const response = await axios.put(`http://localhost:9010/student/${editStudent.rollno}`, {
                ...editStudent
            });
            setStudent(student.map(student =>
                student.rollno === editStudent.rollno ? response.data : student
            ));
            handleCloseEdit();
        } catch (error) {
            console.log("Error Occured while updating the student", error);
            alert('There was an error updating the student details, please try again');
        }
    }

    const handleAddStudent = async () => {
        try {
            const response = await axios.post('http://localhost:9010/students', {
                ...newStudent
            });
            setStudent([...student, response.data])
            setNewStudent({
                name: '',
                date:'',
                city: '',
                emailid: ''
            });
            handleClose();
        } catch (error) {
            console.log("There was an error adding the student.", error)
        }
    };

    const handleDelete = async (rollno) => {
        try {
            await axios.delete(`http://localhost:9010/student/${rollno}`);
            setStudent(student.filter(student => student.rollno !== rollno));
            handleConfirmClose()
        } catch (error) {
            console.log('Error occured deleting the student: ', error);
            alert('There was an error deleting the student. please try again');
        }
    };

    useEffect(() => {
        axios.get('http://localhost:9010/students').then(response => {
            setStudent(response.data)
            console.log(response.data)
        }, [])
    })

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            
            <TableContainer component={Paper} style={{ width: '70%'}}>
            <Box display="flex" justifyContent='flex-start'>
                <Button variant='contained' onClick={hanldeClickOpen} > Add New</Button>
            </Box>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}}>Roll_NO</TableCell>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}} align="left">Name</TableCell>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}} align="left">Date Of Birth</TableCell>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}} align="left">City</TableCell>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}} align="left">Email</TableCell>
                            <TableCell style={{fontSize:'17px',fontFamily:"'Poppins', sans-serif"}} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {student !== null ? student.map((student, index) => (
                            <TableRow
                                key={student.rollno}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell style={{fontSize:'15px'}} align="left">{student.rollno}</TableCell>
                                <TableCell style={{fontSize:'15px'}} align="left">{student.name}</TableCell>
                                <TableCell style={{fontSize:'15px'}} align="left">{student.date}</TableCell>
                                <TableCell style={{fontSize:'15px'}} align="left">{student.city}</TableCell>
                                <TableCell style={{fontSize:'15px'}} align="left">{student.emailid}</TableCell>
                                <TableCell align="center">
                                    <IconButton style={{ color: 'blue' }} onClick={() => handleConfirmOpen(student.rollno)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton style={{ color: 'green' }} onClick={() => handleClickOpenEdit(student)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        )) : (<div className='container' style={{ fontSize: '20px' }}>Loading...</div>)}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Deletion of the Student */}
            <Dialog open={confirmOpen} onClose={handleConfirmClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this student?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleDelete(deleteRollNo);

                    }}
                        color="secondary"
                        variant='contained'
                    >
                        Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Adding New Student */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        name='name'
                        label="Student Name"
                        type='text'
                        fullwidth
                        value={newStudent.name}
                        onChange={handleChange} />

                    <TextField
                        margin='dense'
                        name='city'
                        label="City"
                        type='text'
                        fullwidth
                        value={newStudent.city}
                        onChange={handleChange}
                    />

                    <TextField
                        margin='dense'
                        name='date'
                        type='date'
                        fullwidth
                        value={newStudent.date}
                        onChange={handleChange}
                    />

                    <TextField
                        margin='dense'
                        name='emailid'
                        label="EmailId"
                        type='email'
                        fullwidth
                        value={newStudent.emailid}
                        onChange={handleChange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleAddStudent} color='primary' variant='contained'>
                        Add Student
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Model For Editing Student */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogContent>
                    <TextField
                        margin='dense'
                        name='name'
                        label="Student Name"
                        type='text'
                        fullwidth
                        value={editStudent.name}
                        onChange={handleChangeEdit} />

                    <TextField
                        margin='dense'
                        name='city'
                        label="City "
                        type='text'
                        fullwidth
                        value={editStudent.city}
                        onChange={handleChangeEdit} />

                    <TextField
                        margin='dense'
                        name='date'
                        type='date'
                        fullwidth
                        value={editStudent.date}
                        onChange={handleChangeEdit} />    
            
                    <TextField
                        margin='dense'
                        name='emailid'
                        label="EmailId"
                        type='email'
                        fullwidth
                        value={editStudent.emailid}
                        onChange={handleChangeEdit} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color='primary'>
                        Cancel
                    </Button>
                    <Button color="primary"
                        variant='contained' onClick={handleEditStudent}>
                        Update Student
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Main