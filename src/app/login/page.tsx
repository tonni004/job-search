"use client";

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/lib/api";
import Loader from "@/components/Loader";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setLoginError("");
    try {
      setLoading(true);
      const { data } = await loginUser(values.email, values.password);
      localStorage.setItem("token", data.token);
      router.push("/jobs");
    } catch (err: any) {
      setLoginError(err.response?.data?.error || "Login failed");
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
    <h1 className="text-2xl font-bold mb-6">Login</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
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

            {loginError && (
              <div className="text-red-600 font-semibold">{loginError}</div>
            )}

            <div className='flex'>
              <p className="mr-2">Don&#39;t have an account?</p>
              <Link href="/register" className='text-blue-600 hover:underline'>
                Sign Up
              </Link>
            </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                {loading ? 'Loading...' : "Sign In"}
              </button>
          </Form>
        )}
      </Formik>
    </main>
  );
}
