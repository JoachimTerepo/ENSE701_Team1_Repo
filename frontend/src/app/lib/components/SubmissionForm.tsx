"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "@/app/styles/SubmissionForm.css";

type FormData = {
  title: string;
  authors: string;
  journal: string;
  year: number;
  sections: string;
  url: string;
  content: string;
};

export default function SubmissionForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Submitted Data:", JSON.stringify(data));
    data.content = "content";
    try {
      const response = await fetch("http://localhost:3001/api/article/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.error !== null) {
        throw new Error(responseData.error);
      }
      console.log("Server Response:", responseData);
      window.alert("Submission successful!");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an error submitting the form.");
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setErrorMessage(
        "PDF files are not allowed. Please upload a BibTeX (.bib) file."
      );
      e.target.value = ""; // Reset the file input
    } else {
      setErrorMessage(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="formItem">
          <label>Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
          {errors.title && (
            <span className="error">{errors.title.message}</span>
          )}
        </div>

        <div className="formItem">
          <label>Authors</label>
          <input
            {...register("authors", { required: "Authors are required" })}
            placeholder="Authors"
          />
          {errors.authors && (
            <span className="error">{errors.authors.message}</span>
          )}
        </div>

        <div className="formItem">
          <label>Journal Name</label>
          <input
            {...register("journal", { required: "Journal name is required" })}
            placeholder="Journal Name"
          />
          {errors.journal && (
            <span className="error">{errors.journal.message}</span>
          )}
        </div>

        <div className="formItem">
          <label>Year of Publication</label>
          <input
            type="number"
            {...register("year", {
              required: "Year of publication is required",
              min: { value: 1800, message: "Year must be after 1900" },
              max: {
                value: new Date().getFullYear(),
                message: `Year must be ${new Date().getFullYear()} or earlier`,
              },
            })}
            placeholder="Year of Publication"
          />
          {errors.year && <span className="error">{errors.year.message}</span>}
        </div>

        <div className="formItem">
          <label>Volume, Number, Pages</label>
          <input
            {...register("sections", {
              required: "Volume, number, and pages are required",
            })}
            placeholder="Volume, Number, Pages"
          />
          {errors.sections && (
            <span className="error">{errors.sections.message}</span>
          )}
        </div>

        <div className="formItem">
          <label>DOI</label>
          <input
            {...register("url", {
              required: "DOI is required",
            })}
            placeholder="DOI"
          />
          {errors.url && <span className="error">{errors.url.message}</span>}
        </div>

        <div className="formItem">
          <label>Upload BibTeX File</label>
          <input type="file" onChange={handleFileUpload} accept=".bib" />
          {errorMessage && <span className="error">{errorMessage}</span>}
        </div>

        <button type="submit" className="buttonItem">
          Submit
        </button>
      </form>
    </div>
  );
}
