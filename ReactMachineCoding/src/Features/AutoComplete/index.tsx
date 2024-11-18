/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Functional requirements:
// Real time suggestion
// Dynamic and static data support
// Debouncing and keyboard navigation
// Highlighted match
// Customizable
// loading indicator

import { useEffect, useState } from "react";
import SuggestionsList from "./SuggestionsList";

// Non-Functional requirements:
// Performance
// Responsiveness
// Security
// Caching
// Accessibility
// Compatibility

// HLD:
// Step 1: User input (use debounce)
// Step 2: To cache or not to cache (?)
// Step 3: If No cache -> API call -> Response -> Success,
//         If yes -> Render suggestions -> Highlight matches
// Step 4: Success: ✅ Update cache -> Render suggestions -> Highlight matches
//         :  Error handling -> Display error

interface IAutComplete {
  placeholder: string;
  staticData?: string[];
  fetchSuggestions: any;
  dataKey: string;
  customLoading: React.ReactNode;
  onSelect: any;
  onChange: (event: any) => any;
  onBlur: () => any;
  onFocus: () => any;
  customStyles: any;
}

const AutoComplete = ({
  placeholder,
  staticData = [],
  fetchSuggestions,
  dataKey,
  customLoading = "Loading....",
  onSelect,
  onChange,
  onBlur,
  onFocus,
  customStyles = {},
}: IAutComplete) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (query: string) => {
    setError(null);
    setLoading(true);
    try {
      let response;
      if (staticData.length > 0) {
        response = staticData.filter((item: string) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
      } else if (fetchSuggestions) {
        response = await fetchSuggestions(query);
      }
      setSuggestions(response);
    } catch (err: any) {
      setError(err);
      setSuggestions([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value.length > 1) {
      getSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={customStyles}
      />
      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestion__list">
          {error && <div>{error}</div>}
          {loading && <div>{customLoading}</div>}
          <SuggestionsList
            highlight={value}
            suggestions={suggestions}
            dataKey={dataKey}
            onSuggestionClick={onSelect}
          />
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
