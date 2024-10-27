import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const EditUserDialog = ({ open, onClose, userForm, setUserForm, fetchUsers }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put('https://kostentours-api-10061c08f8f8.herokuapp.com/user/update', userForm);
      fetchUsers();
      onClose();
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle><Typography variant="h6">EDITAR USUARIO</Typography></DialogTitle>
      <DialogContent>
      <TextField
          label="Nombre"
          name="username"
          value={userForm.username}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Nombres y apellidos"
        />
        <TextField
          label="Mail"
          name="email"
          type="email"
          value={userForm.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="ejemplo@mail.com"
        />
        <TextField
          label="Número de teléfono"
          name="contact"
          value={userForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="541112345678"
        />

        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button onClick={handleSubmitEdit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;




//******************** version 0 KO *****/
// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';

// const EditUserDialog = ({ open, onClose, userForm, handleInputChange, handleSubmitEdit }) => {
//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle sx={{ padding: "10", gap: "1.25rem", alignItems: "center", justifyItems: "center" }}> 
//       <Typography variant="titleH2">REGISTRO</Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Nombre"
//           name="username"
//           value={userForm.username}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="Nombres y apellidos"
//         />
//         <TextField
//           label="Mail"
//           name="email"
//           type="email"
//           value={userForm.email}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="ejemplo@mail.com"
//         />
//         <TextField
//           label="Número de teléfono"
//           name="contact"
//           value={userForm.contact}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="541112345678"
//         />

        
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="transparent">Cerrar</Button>
//         <Button onClick={handleSubmitEdit} color="transparent">Guardar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditUserDialog;
