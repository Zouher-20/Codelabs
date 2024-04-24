import { string } from 'yup';
import { z } from 'zod';

// Yup
export const searchField = string().required('This field is required');
export const textField = string().required('This field is required');
export const email = string()
    .email('Please enter a valid email')
    .required('This field is required');
export const password = string().min(8).required('Required');
export const username = string().min(4).required('Required');

// Zod
export const zemail = z.string().email();
export const ztext = (min = 5, max = 50) => z.string().min(min).max(max);
export const zpass = z.string().min(8);
export const zPage = z.number().nullable();
export const zpageSize = z.number().nullable();
