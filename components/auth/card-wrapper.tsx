import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Social } from "./social";
import Header from "./header";
import BackButton from "./back-button";

interface CardWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  showSocial?: boolean;
  backButtonHref: string;
  backButtonLabel: string;
}
export const CardWrapper = ({
  title,
  description,
  children,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[600px] mt-48 shadow-md bg-slate-100">
      <CardHeader className="">
        <CardTitle>
          <Header headerTitle={title} />
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton link={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
