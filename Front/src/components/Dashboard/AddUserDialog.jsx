import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
    try {
      await axios.post('https://kostentours-api-10061c08f8f8.herokuapp.com/auth/register', userForm);
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
