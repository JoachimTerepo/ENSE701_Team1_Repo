import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Moderate from "../page"; // Adjust the import path
import "@testing-library/jest-dom";

// Sample mock articles
const mockArticles = [
  {
    _id: "1",
    title: "Article 1",
    authors: "Author A",
    year: 2020,
    url: "https://article1.com",
    is_approved: null,
    quality_check_pass: null,
    quality_checked_at: null,
  },
  {
    _id: "2",
    title: "Article 2",
    authors: "Author B",
    year: 2021,
    url: "https://article2.com",
    is_approved: null,
    quality_check_pass: null,
    quality_checked_at: null,
  },
];

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => mockArticles,
  } as Response);
});

afterEach(() => {
  jest.clearAllMocks(); // Clear mock history
});

test("renders articles table", async () => {
  render(<Moderate />);

  expect(await screen.findByText("Article 1")).toBeInTheDocument();
  expect(screen.getByText("Article 2")).toBeInTheDocument();
});

import { within } from "@testing-library/react";

test("clicking accept button sends correct approval data", async () => {
  render(<Moderate />);

  // Select the first "✓" button
  const acceptButtons = await screen.findAllByText("✓");
  fireEvent.click(acceptButtons[0]);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/article/update"),
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"is_approved":true'),
      })
    );
  });
});
