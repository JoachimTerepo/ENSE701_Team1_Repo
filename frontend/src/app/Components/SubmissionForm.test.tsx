import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SubmissionForm from "./SubmissionForm";

describe("SubmissionForm Component", () => {
  test("renders the form with required fields", () => {
    render(<SubmissionForm />);
    
    // Check that the form fields are rendered
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Authors")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Journal Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Year of Publication")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Volume, Number, Pages")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("DOI")).toBeInTheDocument();
  });
});
