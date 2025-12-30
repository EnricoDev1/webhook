import { XCircle } from 'lucide-react';

export default function RequestDetails({ request, onClose }) {
  if (!request) return null;

  return (
    <div className="p-4 border rounded">
      <button onClick={onClose}><XCircle /></button>
      <pre>{request.body}</pre>
    </div>
  );
}
