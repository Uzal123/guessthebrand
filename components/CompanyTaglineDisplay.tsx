// CompanyTaglineDisplay.js

import React from "react";

const CompanyTaglineDisplay = ({ tagline }: { tagline: string }) => {
  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">Company Tagline:</h2>
      <p className="text-xl">{tagline}</p>
    </div>
  );
};

export default CompanyTaglineDisplay;
