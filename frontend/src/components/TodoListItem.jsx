export default function TodoListItem({   id,
  text,
  isEditing,
  editText,
  onEdit,
  onChangeEditText,
  onSave,
  onDelete, }) {
    return (
         <li className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
      {isEditing ? (
        <input
          className="border rounded p-1 flex-1 mr-2"
          value={editText}
          onChange={(e) => onChangeEditText(e.target.value)}
        />
      ) : (
        <span className="text-slate-700">{text}</span>
      )}

      <div className="flex gap-2">
        {isEditing ? (
          <button
            className="text-sm text-green-600 hover:underline"
            onClick={onSave}
          >
            Save
          </button>
        ) : (
          <button
            className="text-sm text-indigo-600 hover:underline"
            onClick={onEdit}
          >
            Edit
          </button>
        )}
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </li>
    );
}