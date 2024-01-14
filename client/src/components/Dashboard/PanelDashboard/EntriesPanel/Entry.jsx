// Entry component
const Entry = ({ entry }) => {
  return (
    <div className="entry entry-thumbnail container">
      <h3>{entry.title}</h3>
      <p>{entry.textBody}</p>
    </div>
  );
};

export default Entry;
