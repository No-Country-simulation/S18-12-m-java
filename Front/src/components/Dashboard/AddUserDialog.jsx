import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { NotificationService } from "../../shared/services/notistack.service.jsx";

import axios from 'axios';

const AddUserDialog = ({ open, onClose, fetchUsers }) => {
  const [userForm, setUserForm] = useState({ username: '', email: '', contact: '', password: '', confirmPassword: '', role: 'USER' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAdd = async () => {
    if (!validatePassword(userForm.password)) {
      NotificationService.info(
        " La contraseña debe tener entre 6-12 caracteres, al menos 1 mayuscula, 1 numero y 1 caracter especial. ",
        5000
      );
      return;
    }
    if (!validateContact(userForm.contact)) {
      NotificationService.info(
        " El telefono debe tener entre 8-14 caracters y '+' al inicio es opcional. ",
        5000
      );
      return;
    }
    try {
      await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/auth/register', userForm);
      NotificationService.success(
        " Usuario registrado exitosamente ",
        2000
      );
      fetchUsers();
      onClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // // Validate contact (min 8, max 14 numbers, '+' opcional)
  const validateContact = (contact) => {
      const regex1 =/^\+?[1-9]\d{8,14}$/;
    return regex1.test(contact);
  };

  // Validate password (min 6, max 12 characters, letters & numbers, at least 1 uppercase)
  const validatePassword = (password) => {
    // const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
      const regex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    return regex.test(password);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle><Typography variant="h6">NUEVO USUARIO</Typography></DialogTitle>
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
          label="Número de Teléfono"
          name="contact"
          value={userForm.contact}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="541112345678"
        />
        <TextField
          label="Contraseña"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={userForm.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText="Debe contener al menos 1 número y tener un mínimo de 6 caracteres."
        />
        <TextField
          label="Confirme contraseña"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={userForm.confirmPassword}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText={userForm.password === userForm.confirmPassword ? 'Contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
        <Button onClick={handleSubmitAdd}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;




//******************** version 0 KO *****/
// import React from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// const AddUserDialog = ({ open, onClose, userForm, handleInputChange, handleSubmit, toggleShowPassword, showPassword, toggleShowConfirmPassword, showConfirmPassword }) => {
//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle sx={{ padding: "10", gap: "1.25rem", alignItems: "center", justifyItems: "center" }}> 
//       <Typography variant="titleH2">NUEVO USUARIO</Typography>
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
//           label="Número de Teléfono"
//           name="contact"
//           value={userForm.contact}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           placeholder="541112345678"
//         />
//         <TextField
//           label="Contraseña"
//           name="password"
//           type={showPassword ? 'text' : 'password'}
//           value={userForm.password}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleShowPassword}>
//                   {showPassword ? <Visibility /> : <VisibilityOff />}
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//           helperText="Debe contener al menos 1 número y tener un mínimo de 6 caracteres."
//         />
//         <TextField
//           label="Confirme contraseña"
//           name="confirmPassword"
//           type={showConfirmPassword ? 'text' : 'password'}
//           value={userForm.confirmPassword}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//           variant="outlined"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={toggleShowConfirmPassword}>
//                   {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
//                 </IconButton>
//               </InputAdornment>
//             )
//           }}
//           helperText={userForm.password === userForm.confirmPassword ? 'Contraseñas coinciden.' : 'Las contraseñas no coinciden.'}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="transparent">Cerrar</Button>
//         <Button onClick={handleSubmit} color="transparent">Guardar</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddUserDialog;
