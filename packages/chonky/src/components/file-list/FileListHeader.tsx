import React from 'react';
import { makeLocalChonkyStyles } from '../../util/styles';

export interface FileListHeaderPropos {
    height: number;
    width: number;
}
export const FileListHeader: React.FC<FileListHeaderPropos> = ({width}) => {
  const classes = useStyles();

  return (
    <div className={classes.listHeader} style={{width}}>
      <div></div>
      <div ></div>
      <div className={classes.listFileEntryIcon}></div>
      <div className={classes.listFileEntryName}>Name</div>
      <div className={classes.listFileEntryProperty}>Modified Date</div>
      <div className={classes.listFileEntrySize}>Size</div>
    </div>
  );
};

const useStyles = makeLocalChonkyStyles((theme) => ({
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 700,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: [2, 4],
  },
  listFileEntrySelection: {
    opacity: 0.6,
  },
  listFileEntryIcon: {
    width: theme.listFileEntry.iconFontSize,
    padding: [2, 4],
  },
  listFileEntryName: {
    textOverflow: 'ellipsis',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: '1 1 300px',
    paddingLeft: 8,
    zIndex: 20,
  },
  listFileEntryProperty: {
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: '0 1 150px',
    padding: [2, 8],
    zIndex: 20,
  },
  listFileEntrySize: {
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flex: '0 1 150px',
    padding: [2, 8],
    zIndex: 20,
  },
}));
