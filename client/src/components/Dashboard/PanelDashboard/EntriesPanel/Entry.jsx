import moment from 'moment';

const Entry = ({ entry }) => {
  const formatDate = (entry) => {
    const date = entry.journaledDate ? entry.journaledDate : entry.updatedAt;
    return moment(date).format('MMM Do YYYY, h:mm a');
  };

  const formattedDate = formatDate(entry);
  return (
    <div className="entry entry-thumbnail container">
      <div className="entry-header">
        <h3>{entry.title}</h3>
        <h4>{formattedDate}</h4>
      </div>
      <p className="entry-body">{entry.textBody}</p>
    </div>
  );
};

export default Entry;
