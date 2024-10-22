import React, {useState, useCallback, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Typography
} from '@mui/material';
import {createPackage, getAllPackages, getPackageById} from "../../../api/packageApi.js";
import Container from "@mui/material/Container";
import {useParams} from "react-router-dom";

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const niveles = ['Principiante', 'Intermedio', 'Intermedio-Avanzado', 'Avanzado'];

const paqueteSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    punctuation: Yup.number().min(0).max(10),
    all_months: Yup.array().of(Yup.number()).min(1, 'Selecciona al menos un mes'),
});

export const CreateEditPackage = (props) => {

    const [disabledButton, setDisabledButton] = useState(false);
    const [imagenes, setImagenes] = useState([]);
    const [package_, setPackage] = useState(null);

    const params = useParams();

    const { setOpenTransitionMessage, setMessageTransitionMessage, setSeverityTransitionMessage } = props;

    const getPackById = useCallback(async ( id ) => {
        try {
            const { data: dataPackages } = await getPackageById( id );
            setPackage( dataPackages.data );
            console.log('Months: ', dataPackages.data.months.map(month => month.name));

            console.log('Respuesta del backend: ', dataPackages);
        } catch (error) {
            console.error('Error al obtener los departures: ', error);
        }
    }, []);

    const requestPackage = useCallback(async (values) => {
        console.log('Valores del formulario: ', values);
        setDisabledButton(true);

        const formData = new FormData();
        formData.append('packageData', new Blob([JSON.stringify(values)], { type: 'application/json' }));
        imagenes.forEach((imagen) => {
            formData.append('filesImages', imagen, imagen.name);
        });

        console.log('Contenido de formData:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        /*try {
            // Aquí iría la lógica para enviar formData al backend
            const { data: dataPackage } = await createPackage(formData);
            console.log('Respuesta del backend: ', dataPackage);
            // const data = await response.json();

            // Simulamos una respuesta exitosa
            /!*const data = { error: false, message: 'Paquete creado con éxito' };

            if (!data.error) {
                setSeverityTransitionMessage('success');
                setMessageTransitionMessage('Paquete creado exitosamente');
            } else {
                setSeverityTransitionMessage('error');
                setMessageTransitionMessage(data.message);
            }*!/
        } catch (error) {
            console.error('Error al crear el paquete: ', error);
            // setSeverityTransitionMessage('error');
            // setMessageTransitionMessage('Error al crear el paquete');
        } finally {
            // setOpenTransitionMessage(true);
            setDisabledButton(false);
        }*/
    }, [imagenes, setOpenTransitionMessage, setMessageTransitionMessage, setSeverityTransitionMessage]);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            punctuation: '',
            duration: '',
            itinerary: '',
            physical_level: '',
            technical_level: '',
            included_services: '',
            all_months: [],
        },
        validationSchema: paqueteSchema,
        onSubmit: (values) => {
            requestPackage(values);
            // getPackages();
        },
    });

    const handleImageChange = (event) => {
        setImagenes( prev => [...prev, ...event.target.files]);
    };

    const handleClearForm = () => {
        formik.resetForm();
        setImagenes([]);
    };

    useEffect(() => {
        if (params.id) {
            getPackById(params.id);
        }
    }, [ params.id, getPackById ]);

    return (
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Nuevo Paquete</Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Nombre"
                            value={ package_ ? package_.name : formik.values.name }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Descripción"
                            multiline
                            rows={4}
                            value={ package_ ? package_.description : formik.values.description }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="punctuation"
                            name="punctuation"
                            label="Puntuación"
                            type="number"
                            value={ package_ ? package_.punctuation : formik.values.punctuation }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.punctuation && Boolean(formik.errors.punctuation)}
                            helperText={formik.touched.punctuation && formik.errors.punctuation}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="duration"
                            name="duration"
                            label="Duración"
                            value={ package_ ? package_.duration : formik.values.duration }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.duration && Boolean(formik.errors.duration)}
                            helperText={formik.touched.duration && formik.errors.duration}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="itinerary"
                            name="itinerary"
                            label="Itinerario"
                            multiline
                            rows={4}
                            value={ package_ ? package_.itinerary : formik.values.itinerary }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.itinerary && Boolean(formik.errors.itinerary)}
                            helperText={formik.touched.itinerary && formik.errors.itinerary}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={formik.touched.physical_level && Boolean(formik.errors.physical_level)}>
                            <InputLabel id="physical-level-label">Nivel físico</InputLabel>
                            <Select
                                labelId="physical-level-label"
                                id="physical_level"
                                name="physical_level"
                                value={ package_ ? package_.physical_level : formik.values.physical_level }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="standard"
                            >
                                {niveles.map((nivel) => (
                                    <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                                ))}
                            </Select>
                            {formik.touched.physical_level && formik.errors.physical_level && (
                                <Typography variant="caption" color="error">{formik.errors.physical_level}</Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={formik.touched.technical_level && Boolean(formik.errors.technical_level)}>
                            <InputLabel id="technical-level-label">Nivel técnico</InputLabel>
                            <Select
                                labelId="technical-level-label"
                                id="technical_level"
                                name="technical_level"
                                value={ package_ ? package_.technical_level : formik.values.technical_level }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="standard"
                            >
                                {niveles.map((nivel) => (
                                    <MenuItem key={nivel} value={nivel}>{nivel}</MenuItem>
                                ))}
                            </Select>
                            {formik.touched.technical_level && formik.errors.technical_level && (
                                <Typography variant="caption" color="error">{formik.errors.technical_level}</Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth error={formik.touched.all_months && Boolean(formik.errors.all_months)}>
                            <InputLabel id="all-months-label">Meses disponibles</InputLabel>
                            <Select
                                labelId="all-months-label"
                                id="all_months"
                                name="all_months"
                                multiple
                                value={ package_ ? package_.months.map(month => month.name) : formik.values.all_months }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                variant="standard"
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={meses[value - 1]} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {meses.map((mes, index) => (
                                    <MenuItem key={mes} value={index + 1}>
                                        {mes}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.all_months && formik.errors.all_months && (
                                <Typography variant="caption" color="error">{formik.errors.all_months}</Typography>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="included_services"
                            name="included_services"
                            label="Servicios incluidos"
                            multiline
                            rows={4}
                            value={ package_ ? package_.included_services : formik.values.included_services }
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.included_services && Boolean(formik.errors.included_services)}
                            helperText={formik.touched.included_services && formik.errors.included_services}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span">
                                Subir imágenes
                            </Button>
                        </label>
                        <Box mt={2} sx={{ display: 'flex', gap: 2, minHeight: '40px' }}>
                            {imagenes.map((imagen, index) => (
                                <Chip
                                    key={index}
                                    label={imagen.name}
                                    onDelete={() => {
                                        const newImagenes = [...imagenes];
                                        newImagenes.splice(index, 1);
                                        setImagenes(newImagenes);
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleClearForm}
                        sx={{ width: '48%' }}
                    >
                        Limpiar
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={disabledButton}
                    >
                        {
                            params.id ? 'Actualizar' : 'Crear Paquete'
                        }
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};