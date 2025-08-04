import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Checkbox,
    Button,
    FormControlLabel,
    Link,
    Paper,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import BannerImg from '../../assets/banner.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { REGISTER } from '../../api/post';
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = useForm();

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const navigate = useNavigate();
    const base_url = import.meta.env.VITE_BASE_URL;

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            });
            return;
        }
        const bodyData = {
            name: data.fullName,
            email: data.email,
            password: data.password,
            role: "admin",
            number: data.phone
        }
        REGISTER(bodyData).then((res) => {
            toast.success('Registered successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });

            // Optional: reset form or redirect
            // reset();
            navigate('/login');
        })
            .catch((err) => {
                const message =
                    err?.response?.data?.message || 'Something went wrong, please try again.';
                toast.error(message, {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <Box display="flex" height="100vh">
            {/* Left Panel */}
            <Box
                flex="1"
                position="relative"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundImage: `url(${BannerImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    overflow: 'hidden',
                }}
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgcolor="rgba(17, 24, 39, 0.7)"
                    zIndex={1}
                />

                <Box position="relative" zIndex={2} p={4} textAlign="center">
                    <Typography variant="h4" fontWeight={600} mb={1}>
                        Welcome to Admin Panel
                    </Typography>
                    <Typography variant="body1" mb={4}>
                        Manage your business with powerful tools
                    </Typography>
                </Box>
            </Box>

            {/* Right Panel */}
            <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                <Paper elevation={0} sx={{ width: '80%', maxWidth: 420 }}>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            Create Account
                        </Typography>
                        <Typography variant="body2" mb={3}>
                            Fill in your details to create an admin account
                        </Typography>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Full Name"
                            placeholder="Enter your full name"
                            {...register('fullName', { required: 'Full name is required' })}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email Address"
                            placeholder="Enter your email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Enter a valid email',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            placeholder="Create a password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword', { required: 'Please confirm your password' })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number [Optional]"
                            placeholder="Enter phone number"
                            {...register('phone')}
                        />

                        <FormControlLabel
                            control={<Checkbox {...register('agree', { required: 'You must agree to continue' })} />}
                            label={
                                <Typography variant="body2">
                                    I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>
                                </Typography>
                            }
                        />
                        {errors.agree && (
                            <Typography variant="caption" color="error" ml={1}>
                                {errors.agree.message}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Create Account
                        </Button>

                        <Typography variant="body2" align="center" mt={2}>
                            Already have an account? <Link href="/login">Sign In</Link>
                        </Typography>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Register;