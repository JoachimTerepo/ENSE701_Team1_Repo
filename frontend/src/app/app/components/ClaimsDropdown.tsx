import { Article } from "@/app/lib/types/article";
import React, { useState, useEffect } from "react";

interface Claim {
  _id: string;
  name: string;
  colour: string;
  parent: string;
  is_parent: boolean;
}

interface ClaimItem extends Claim {
  children: ClaimItem[] | null;
}

interface ClaimsDropdownProps {
  onClaimSelect: (claim: ClaimItem) => void;
  onArticlesFetch: (articles: Article[]) => void;
}

const ClaimsDropdown: React.FC<ClaimsDropdownProps> = ({
  onClaimSelect,
  onArticlesFetch,
}) => {
  const [claims, setClaims] = useState<ClaimItem[]>([]);
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  const [nonParentClaims, setNonParentClaims] = useState<ClaimItem[]>([]);
  const claimIds = new Set<string>();

  const fetchParents = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/claim", {
        method: "GET",
        headers: [["Content-Type", "application/json"]],
      });

      const data = await res.json();

      if (data === null) {
        console.error("No claims returned");
        return;
      }

      const list = data.map((c: ClaimItem) => {
        c.children = null;
        return c;
      });

      console.log("Fetched parent claims:", list); // Log the fetched parent claims

      setClaims(list);

      if (list.length > 0) {
        setSelectedClaim(list[0]._id);
        onClaimSelect(list[0]);
        await fetchChildren(list[0]._id); // Fetch children for the first claim
      }
    } catch (e) {
      console.error(e);
    }
  };

  const addChildren = (
    list: ClaimItem[],
    id: string,
    children: ClaimItem[]
  ): ClaimItem[] => {
    return list.map((c) => {
      if (c.children !== null && c.children.length !== 0) {
        addChildren(c.children, id, children);
      } else if (id === c._id) {
        c.children = children;
        c.is_parent = true;
      }
      return c;
    });
  };

  const fetchChildren = async (id: string) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/claim/" + id,
        {
          method: "GET",
          headers: [["Content-Type", "application/json"]],
        }
      );

      const data = (await res.json()) as Claim[] | null;

      if (data === null) {
        console.error("No claims returned");
        return;
      }

      console.log(`Fetched children for claim ${id}:`, data); // Log the fetched children

      const list: ClaimItem[] = data.map((claim: Claim) => {
        const c: ClaimItem = {
          ...claim,
          children: null,
        };
        return c;
      });

      if (claims !== null) {
        const claimsList = addChildren(claims, id, list);
        setClaims(claimsList);

        // Recursively fetch children if they are parents
        for (const child of list) {
          if (child.is_parent) {
            await fetchChildren(child._id);
          } else {
            if (!claimIds.has(child._id)) {
              claimIds.add(child._id);
              setNonParentClaims((prev) => [...prev, child]);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchArticles = async (claimId: string) => {
    try {
      console.log(`Fetching articles for claim ${claimId}...`);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/article?claimId=${claimId}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Handle when the response fails or does not contain any articles
      if (data === undefined || data === null || data.message !== undefined) {
        onArticlesFetch([]);
        return;
      }

      // Ensure that each article has a 'claims' array
      const articlesWithClaims = data.map((article: any) => ({
        ...article,
        claims: article.claims || [], // Default to empty array if claims field is missing
      }));
      console.log(`Fetched articles for claim ${claimId}:`, articlesWithClaims);
      onArticlesFetch(articlesWithClaims);
    } catch (e) {
      console.error(`Error fetching articles for claim ${claimId}:`, e);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handleClaimChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const claimId = event.target.value;
    console.log(`Claim changed to ${claimId}`);
    setSelectedClaim(claimId);

    const selectedClaimItem = nonParentClaims.find(
      (claim) => claim._id === claimId
    );
    if (selectedClaimItem) {
      console.log(`Selected claim item:`, selectedClaimItem);
      onClaimSelect(selectedClaimItem);
      await fetchArticles(claimId);
    } else {
      console.log(`Claim item not found for ID: ${claimId}`);
    }
  };

  const findClaimById = (claims: ClaimItem[], id: string): ClaimItem | null => {
    for (const claim of claims) {
      if (claim._id === id) {
        return claim;
      }
      if (claim.children) {
        const found = findClaimById(claim.children, id);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  return (
    <div className="claimsDropdown">
      <select
        className="inputField"
        value={selectedClaim}
        onChange={handleClaimChange}
      >
        <option value="" disabled>
          Select a claim
        </option>
        {nonParentClaims.map((claim) => (
          <option key={claim._id} value={claim._id}>
            {claim.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClaimsDropdown;
