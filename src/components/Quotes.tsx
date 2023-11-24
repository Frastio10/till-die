import { useInterval } from "@/hooks/useInterval";
import React, { useEffect, useState } from "react";

type Quote = {
  quote: string;
  source: string;
};

interface QuotesProps {
  quotes: Quote[];
}

export const Quotes = ({ quotes }: QuotesProps) => {
  const [quote, setQuote] = useState<Quote>(
    quotes[Math.floor(Math.random() * quotes.length)],
  );

  useInterval(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, 5000);

  if (!quote) return null;
  return (
    <p style={{ textAlign: "center" }}>
      &quot;{quote.quote}&quot; - {quote.source}
    </p>
  );
};
