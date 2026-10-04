import * as yup from 'yup';

export const registerSchema = yup.object({
  displayName: yup.string().trim().min(2).max(60).required(),
  email: yup.string().trim().email().max(254).required(),
  password: yup.string().min(12).max(128).required(),
});
