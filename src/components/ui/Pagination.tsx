interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-10">
      <button
        onClick={() => {
          onPageChange(Math.max(1, currentPage - 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg border border-border-smoke bg-elevated-surface text-sm text-ash-text hover:text-cloud-white hover:bg-muted-shell/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        Previous
      </button>
      <span className="flex items-center px-4 text-sm text-fog-text">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => {
          onPageChange(Math.min(totalPages, currentPage + 1));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg border border-border-smoke bg-elevated-surface text-sm text-ash-text hover:text-cloud-white hover:bg-muted-shell/50 transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        Next
      </button>
    </div>
  );
}
