"use client";

import EmptyState from "../common/EmptyState";

const Recent = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Recent Sales</h1>
          <p className="text-muted-foreground text-sm mt-1">
          Create sales order and track order sales and performance here
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm text-muted-foreground hover:bg-muted">
          April-June 2024
          </button>
        </div>
      </div>

      {/* Empty State Section */}
      <div className="w-full">
        <EmptyState
          
          description="You have no data here yet."
        />
      </div>
    </div>
  );
};

export default Recent;
