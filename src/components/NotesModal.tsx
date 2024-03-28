const NotesModal = ({ courseId }) => {
  return (
    <div>
      <textarea
        placeholder="Add a note..."
        onChange={(e) =>
          localStorage.setItem(`courseNote-${courseId}`, e.target.value)
        }
      />
    </div>
  )
}

export default NotesModal