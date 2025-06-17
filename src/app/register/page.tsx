"use client";

import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/lib/api";
import Link from "next/link";
import Loader from "@/components/Loader";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setRegisterError("");
    try {
      setLoading(true);
      await registerUser(values.email, values.password);
      router.push("/login");
    } catch (err: any) {
      setRegisterError(err.response?.data?.error || "Registration failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/jobs");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) return <div className="flex items-center justify-center min-h-screen"><Loader/></div>;


  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <label>
              Email
              <Field
                name="email"
                type="email"
                className="block w-full p-2 border rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>

            <label>
              Password
              <Field
                name="password"
                type="password"
                className="block w-full p-2 border rounded"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>

            <label>
              Confirm Password
              <Field
                name="confirmPassword"
                type="password"
                className="block w-full p-2 border rounded"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>

            {registerError && (
              <div className="text-red-600 font-semibold">{registerError}</div>
            )}

            <div className='flex'>
              <p className="mr-2">Already have an account?</p>
              <Link href="/login" className='text-blue-600 hover:underline'>
                Sign In
              </Link>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {loading ? 'Loading...' : "Sign Up"}
            </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
