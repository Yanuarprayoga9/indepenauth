import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircledIcon } from "@radix-ui/react-icons";
interface FormErrorProps {
  message?: string;
}

const FormSuccess = ({ message }: FormErrorProps) => {
  if (message) {
    return (
      <Alert variant="success">
        <CheckCircledIcon className="h-4 w-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  }
};

export default FormSuccess;
