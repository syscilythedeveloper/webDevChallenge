import { useEffect, useRef } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

export default function SearchBridge({ searchTerm }: { searchTerm: string }) {
    const { refine } = useSearchBox();
    const prevSearchRef = useRef<string>("");

    useEffect(() => {
        if (searchTerm !== prevSearchRef.current) {
            refine(searchTerm);
            prevSearchRef.current = searchTerm;
        }
        // 🔴 Remove 'refine' from deps
    }, [searchTerm]);

    return null;
}
