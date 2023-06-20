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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSwapRequest } from 'apiSdk/swap-requests';
import { Error } from 'components/error';
import { swapRequestValidationSchema } from 'validationSchema/swap-requests';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SwapperInterface } from 'interfaces/swapper';
import { getSwappers } from 'apiSdk/swappers';
import { SwapRequestInterface } from 'interfaces/swap-request';

function SwapRequestCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SwapRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSwapRequest(values);
      resetForm();
      router.push('/swap-requests');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SwapRequestInterface>({
    initialValues: {
      status: '',
      requester_id: (router.query.requester_id as string) ?? null,
      requested_id: (router.query.requested_id as string) ?? null,
    },
    validationSchema: swapRequestValidationSchema,
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
            Create Swap Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<SwapperInterface>
            formik={formik}
            name={'requester_id'}
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
            name={'requested_id'}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'swap_request',
  operation: AccessOperationEnum.CREATE,
})(SwapRequestCreatePage);
