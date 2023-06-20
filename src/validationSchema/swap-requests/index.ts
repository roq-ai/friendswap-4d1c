import * as yup from 'yup';

export const swapRequestValidationSchema = yup.object().shape({
  status: yup.string().required(),
  requester_id: yup.string().nullable().required(),
  requested_id: yup.string().nullable().required(),
});
