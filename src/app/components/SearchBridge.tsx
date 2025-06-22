import { useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch";

export default function SearchBridge({ searchTerm }: { searchTerm: string }) {
  const { refine } = useSearchBox();
  const prevSearchRef = useRef<string>("");

  useEffect(() => {
    if (searchTerm !== prevSearchRef.current) {
      refine(searchTerm);
      prevSearchRef.current = searchTerm;
    }
  }, [searchTerm, refine]);

  return null;
}
