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
    fontSize: theme.listFileEntry.fontSize,
    fontWeight: 'bold',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: [2, 4],
  },
  listFileEntryIcon: {
    width: theme.listFileEntry.iconFontSize,
    padding: [2, 4],
  },
  listFileEntryName: {
    flex: '1 1 300px',
    paddingLeft: 5,
  },
  listFileEntryProperty: {
    flex: '0 1 115px',
    padding: [3, 20],
  },
  listFileEntrySize: {
    flex: '0 1 120px',
    padding: [3, 28],
  },
}));
