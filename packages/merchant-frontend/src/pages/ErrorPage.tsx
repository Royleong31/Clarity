// src/pages/NotFound.tsx
import React from "react";
import { useRouteError } from "react-router-dom";
import errorImg from "../assets/error.svg";
import { Button } from "@/components/ui/button";

const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <img src={errorImg} alt="error" className="w-sm" />
      <h1 className="text-2xl font-bold text-center">Something went wrong!</h1>
      <p className="text-center">
        {error instanceof Error
          ? error.message
          : "This is not the person, place, or thing you're looking for"}
      </p>
      <a href="/" className="mt-4 text-blue-500 btn">
        <Button variant="outline">Click here to go home</Button>
      </a>
    </div>
  );
};

export default ErrorPage;
