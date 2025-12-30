export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const diffSec = Math.floor((now - new Date(timestamp)) / 1000);
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  return `${Math.floor(diffSec / 3600)}h ago`;
};