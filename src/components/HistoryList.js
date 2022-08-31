import { useState } from 'react';
import styled from 'styled-components';
import { MdPlaylistAdd } from 'react-icons/md';
import HistoryListItem from './HistoryListItem';
const EnptyStateStyles = styled.div`
  padding: var(--space-lg) var(--space-md);
  background-color: var(--gray);
  text-align: center;
  > div {
    margin-top: var(--space-md);
    font-size: 24px;
  }
`;

export default function HistoryList({ list }) {
  const [openListItem, setOpenListItem] = useState(false);

  if (!list.length) {
    return (
      <EnptyStateStyles className="empty-state">
        <p>No records for this day</p>
        <div>
          <MdPlaylistAdd />
        </div>
      </EnptyStateStyles>
    );
  }
  return (
    <ul>
      {list.map(([entry, item]) => (
        <HistoryListItem
          key={entry}
          item={item}
          id={entry}
          open={openListItem === entry}
          setOpen={setOpenListItem}
        />
      ))}
    </ul>
  );
}
