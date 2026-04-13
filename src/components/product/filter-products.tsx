import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "@/lib/utils";
import { Search, X, ArrowUpDown } from "lucide-react";
import type { SortOption } from "@/types/product";
import {
  setSearch,
  setSortBy,
  resetFilters,
} from "@/features/product/productSlice";
import type { RootState } from "@/store/store";

const sortOptions = [
  { value: "title-asc" as const, label: "Title A → Z" },
  { value: "title-desc" as const, label: "Title Z → A" },
  { value: "price-asc" as const, label: "Price Low → High" },
  { value: "price-desc" as const, label: "Price High → Low" },
];

export function FilterProducts() {
  const dispatch = useDispatch();
  const { search, sortBy } = useSelector((state: RootState) => state.product);

  const [searchInput, setSearchInput] = useState(search);

  // Sync local search input with global state (useful for reset)
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounced handler for global state update
  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setSearch(value));
      }, 500),
    [dispatch],
  );

  // Cleanup the debounced timer on unmount
  useEffect(() => {
    return () => debouncedSetSearch.cancel();
  }, [debouncedSetSearch]);

  // Fire debounced search when input changes
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchInput(value);
      debouncedSetSearch(value);
    },
    [debouncedSetSearch],
  );

  // Sort changes fire immediately
  const handleSortChange = useCallback(
    (value: string) => {
      const sort = value as SortOption;
      dispatch(setSortBy(sort));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    debouncedSetSearch.cancel();
  }, [dispatch, debouncedSetSearch]);

  const hasActiveFilters = search.length > 0 || sortBy !== "";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search input with icon */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="filter-search"
          type="text"
          placeholder="Search products by title…"
          value={searchInput}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>

      {/* Sort + Reset controls */}
      <div className="flex items-center gap-2">
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger
            id="filter-sort"
            className="w-45"
            aria-label="Sort products"
          >
            <ArrowUpDown className="mr-1 size-3.5 text-muted-foreground" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent align="start" position="popper">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="destructive" onClick={handleReset}>
            <X className="size-4" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
