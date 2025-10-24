import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  photoURL: z.string().url({ message: "Please enter a valid URL for your photo." }).or(z.literal('')),
  password: z.string()
    .min(6, { message: "Password must be at least 6 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." }),
});
export type RegisterData = z.infer<typeof RegisterSchema>;


export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});
export type LoginData = z.infer<typeof LoginSchema>;


export const UpdateProfileSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    photoURL: z.string().url({ message: "Please enter a valid URL for your photo." }).or(z.literal('')),
});
export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;


export const ResetPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
});
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
