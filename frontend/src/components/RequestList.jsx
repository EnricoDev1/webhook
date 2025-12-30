import RequestItem from './RequestItem';

export default function RequestsList({ requests, onSelect, onDelete, theme }) {
  return (
    <div>
      {requests.map(r => (
        <RequestItem
          theme={theme}
          key={r.id}
          request={r}
          onClick={() => onSelect(r)}
          onDelete={() => onDelete(r.id)}
        />
      ))}
    </div>
  );
}
