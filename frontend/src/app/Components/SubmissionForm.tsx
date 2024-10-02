"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "../styles/SubmissionForm.css"; 

type FormData = {
  title: string;
  authors: string;
  journal_name: string;
  year_of_publication: number;
  volume_number_pages: string;
  doi: string;
};

export default function SubmissionForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Submitted Data:", data);
    window.alert("Submission successful!");
  };

  // pdf handle 
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setErrorMessage("PDF files are not allowed. Please upload a BibTeX (.bib) file.");
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
          <input {...register("title", { required: "Title is required" })} placeholder="Title" />
          {errors.title && <span className="error">{errors.title.message}</span>}
        </div>

        <div className="formItem">
          <label>Authors</label>
          <input {...register("authors", { required: "Authors are required" })} placeholder="Authors" />
          {errors.authors && <span className="error">{errors.authors.message}</span>}
        </div>

        <div className="formItem">
          <label>Journal Name</label>
          <input {...register("journal_name", { required: "Journal name is required" })} placeholder="Journal Name" />
          {errors.journal_name && <span className="error">{errors.journal_name.message}</span>}
        </div>

        <div className="formItem">
          <label>Year of Publication</label>
          <input
            type="number"
            {...register("year_of_publication", {
              required: "Year of publication is required",
              min: { value: 1800, message: "Year must be after 1900" },
              max: { value: new Date().getFullYear(), message: `Year must be ${new Date().getFullYear()} or earlier` }
            })}
            placeholder="Year of Publication"
          />
          {errors.year_of_publication && (
            <span className="error">{errors.year_of_publication.message}</span>
          )}
        </div>

        <div className="formItem">
          <label>Volume, Number, Pages</label>
          <input
            {...register("volume_number_pages", { required: "Volume, number, and pages are required" })}
            placeholder="Volume, Number, Pages"
          />
          {errors.volume_number_pages && <span className="error">{errors.volume_number_pages.message}</span>}
        </div>

        <div className="formItem">
          <label>DOI</label>
          <input
            {...register("doi", {
              required: "DOI is required"
            })}
            placeholder="DOI"
          />
          {errors.doi && <span className="error">{errors.doi.message}</span>}
        </div>

        <div className="formItem">
          <label>Upload BibTeX File</label>
          <input type="file" onChange={handleFileUpload} accept=".bib" />
          {errorMessage && <span className="error">{errorMessage}</span>}
        </div>

        <button type="submit" className="buttonItem">Submit</button>
      </form>
    </div>
  );
}
