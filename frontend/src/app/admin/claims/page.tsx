"use client";

import Blocker from "@/lib/components/Blocker";
import { useEffect, useState } from "react";

type ClaimItem = Claim & {
  children: ClaimItem[] | null;
};

type ClaimList = ClaimItem[];

export default function Page() {
  const [claims, setClaims] = useState<ClaimList | null>(null);

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

      setClaims(list);
    } catch (e) {
      // TODO: There is a better way we can handle this
      console.error(e);
    }
  };

  const addChildren = (
    list: ClaimList,
    id: string,
    children: ClaimList
  ): ClaimList => {
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

      const list: ClaimList = data.map((claim: Claim) => {
        const c: ClaimItem = {
          ...claim,
          children: null,
        };
        return c;
      });

      if (claims !== null) {
        const claimsList = addChildren(claims, id, list);

        setClaims(claimsList);
      }
    } catch (e) {
      // TODO: There is a better way we can handle this
      console.error(e);
    }
  };

  const createNew = async (parent: ClaimItem | null, name: string) => {
    try {
      const parentID = parent?._id ?? null;

      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/claim/create",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            parent: parentID,
            is_parent: false,
          }),
          headers: [["Content-Type", "application/json"]],
        }
      );

      const data = (await res.json()) as { error: string | null };

      if (data.error !== null) {
        console.error(data.error);
        return;
      }

      if (parent !== null && parent.is_parent === false) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/claim/update",
          {
            method: "POST",
            body: JSON.stringify({
              _id: parent._id,
              is_parent: true,
            }),
            headers: [["Content-Type", "application/json"]],
          }
        );

        const data = (await res.json()) as { error: string | null };

        if (data.error !== null) {
          console.error(data.error);
          return;
        }
      }

      if (parent !== null) {
        fetchChildren(parent._id);
      } else {
        fetchParents();
      }
    } catch (e) {
      // TODO: There is a better way we can handle this
      console.error(e);
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  if (claims === null) {
    return <Blocker></Blocker>;
  } else {
    return (
      <div className="m-auto w-full md:w-2/3 lg:w-1/2 py-8">
        <List
          claims={claims}
          fetchChildren={fetchChildren}
          addNew={createNew}
        ></List>
      </div>
    );
  }
}

const List = ({
  claims,
  fetchChildren,
  addNew,
}: {
  claims: ClaimList;
  fetchChildren: (id: string) => Promise<void>;
  addNew: (parent: ClaimItem | null, name: string) => void;
}) => {
  return claims.map((c) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);
    const [newName, setName] = useState("");

    const handleOpen = async (id: string) => {
      setLoading(true);
      if (c.children === null) {
        await fetchChildren(id);
      }

      setLoading(false);

      if (c.children?.length === 0) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div key={c._id} className="border-l-2 border-neutral-300 px-2 py-1">
        <div className="flex justify-between items-center">
          <div className="w-1/2">
            <div>{c.name}</div>
          </div>
          <div className="w-1/2 text-end">
            {add ? (
              <div className="space-x-2">
                <input
                  className="border px-2 py-1 rounded focus-within:outline-none focus:ring focus:ring-blue-200 transition"
                  type="text"
                  placeholder="Claim name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={async () => {
                    await addNew(c, newName);
                    setAdd(false);
                    handleOpen(c._id);
                  }}
                >
                  Add Below
                </button>
                <button
                  onClick={() => setAdd(false)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <button
                  className="border border-black px-2 py-1 rounded"
                  onClick={() => setAdd(true)}
                >
                  Add below
                </button>
                {open ? (
                  <button
                    onClick={handleClose}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Close
                  </button>
                ) : (
                  <button
                    disabled={loading || !c.is_parent}
                    className="bg-blue-500 text-white px-2 py-1 rounded disabled:bg-blue-300"
                    onClick={() => handleOpen(c._id)}
                  >
                    {loading
                      ? "Loading..."
                      : !c.is_parent
                      ? "No children"
                      : "Open"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        {c.children !== null && c.children.length > 0 && c.is_parent && open ? (
          <List
            claims={c.children}
            fetchChildren={fetchChildren}
            addNew={addNew}
          ></List>
        ) : (
          <></>
        )}
      </div>
    );
  });
};
