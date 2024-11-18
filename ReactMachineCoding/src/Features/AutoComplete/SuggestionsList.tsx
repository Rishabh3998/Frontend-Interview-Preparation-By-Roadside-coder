import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const SuggestionsList = ({
  highlight = "",
  suggestions,
  dataKey,
  onSuggestionClick,
}: {
  highlight: string;
  suggestions: any[];
  dataKey: string;
  onSuggestionClick: any;
}) => {
  //   const getHighlightedText = (suggestion: any, highlight: string) => {
  //     const text = suggestion.split(new RegExp(`${highlight}`, "gi"));
  //     return (
  //       <div>
  //         {text.map((item: string, index: number) => {
  //           if (text.toLowerCase() === highlight.toLowerCase()) {
  //             return <b key={index}>{item}</b>;
  //           } else {
  //             return <>{item}</>;
  //           }
  //         })}
  //       </div>
  //     );
  //   };

  console.log({ highlight });

  return (
    <React.Fragment>
      {suggestions?.map((suggestion, index) => {
        const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
        return (
          <li
            key={index}
            className="suggestion__item"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {/* {getHighlightedText(currentSuggestion, highlight)} */}
            {currentSuggestion}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default SuggestionsList;
