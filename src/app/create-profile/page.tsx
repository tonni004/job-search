"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BackButton from "@/components/BackButton";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  desiredJob: Yup.string().required("Required"),
  about: Yup.string(),
});

export default function CreateProfilePage() {
  const router = useRouter();
  const [hasProfile, setHasProfile] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    desiredJob: "",
    about: "",
  });

  const handleSubmit = (values: typeof initialValues) => {
    localStorage.setItem("profile", JSON.stringify(values));
    router.push("/jobs");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your profile?");
    if (confirmDelete) {
      localStorage.removeItem("profile");
      localStorage.removeItem("likedJobs");
      setInitialValues({ name: "", desiredJob: "", about: "" });
      setHasProfile(false);
      router.push("/jobs");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("profile");
    if (stored) {
      setInitialValues(JSON.parse(stored));
      setHasProfile(true);
    }
  }, []);

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Profile</h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProfileSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4">
            <label>
              Name
              <Field name="name" className="block w-full p-2 border rounded"/>
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>

            <label>
              Desired Job Title
              <Field
                name="desiredJob"
                className="block w-full p-2 border rounded"
              />
              <ErrorMessage
                name="desiredJob"
                component="div"
                className="text-red-500 text-sm"
              />
            </label>

            <label>
              About me
              <Field
                name="about"
                as="textarea"
                className="block w-full p-2 border rounded"
                rows={4}
              />
            </label>

            <div className="flex gap-4 justify-end">
              <BackButton/>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>

              {hasProfile && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
}
