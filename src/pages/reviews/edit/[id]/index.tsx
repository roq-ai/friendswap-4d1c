import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getReviewById, updateReviewById } from 'apiSdk/reviews';
import { Error } from 'components/error';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { ReviewInterface } from 'interfaces/review';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SwapperInterface } from 'interfaces/swapper';
import { getSwappers } from 'apiSdk/swappers';

function ReviewEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ReviewInterface>(
    () => (id ? `/reviews/${id}` : null),
    () => getReviewById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ReviewInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateReviewById(id, values);
      mutate(updated);
      resetForm();
      router.push('/reviews');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ReviewInterface>({
    initialValues: data,
    validationSchema: reviewValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Review
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="rating" mb="4" isInvalid={!!formik.errors?.rating}>
              <FormLabel>Rating</FormLabel>
              <NumberInput
                name="rating"
                value={formik.values?.rating}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.rating && <FormErrorMessage>{formik.errors?.rating}</FormErrorMessage>}
            </FormControl>
            <FormControl id="comment" mb="4" isInvalid={!!formik.errors?.comment}>
              <FormLabel>Comment</FormLabel>
              <Input type="text" name="comment" value={formik.values?.comment} onChange={formik.handleChange} />
              {formik.errors.comment && <FormErrorMessage>{formik.errors?.comment}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<SwapperInterface>
              formik={formik}
              name={'reviewer_id'}
              label={'Select Swapper'}
              placeholder={'Select Swapper'}
              fetcher={getSwappers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<SwapperInterface>
              formik={formik}
              name={'reviewed_id'}
              label={'Select Swapper'}
              placeholder={'Select Swapper'}
              fetcher={getSwappers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'review',
  operation: AccessOperationEnum.UPDATE,
})(ReviewEditPage);
