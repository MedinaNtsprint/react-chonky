import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Typography from '@mui/material/Typography';
import { FileBrowser, FileNavbar, FileToolbar, FileList, FileContextMenu } from '../dist/chonky.esm.js';
import { ChonkyIconFA } from '../../chonky-icon-fontawesome';
import { ChonkyActions } from '../dist/index.js';

const App = () => {
  const pathEntries = ['test', 'folder'];
  const [appendInfo, setAppendInfo] = React.useState('Test Info');
  React.useEffect(() => {
    var num = 0;
    setInterval(() => {
      setAppendInfo(`Test Info ${num}`);
      num++;
    }, 1000);
  }, []);

  return (
    <div style={{ height: 400 }}>


      <FileBrowser
          // darkMode={theme !== "light"}
        iconComponent={ChonkyIconFA}

          files={[
            { id: 'zxc', name: 'My File.txt' },
            { id: 'sdsds', name: 'My Folder' },
          ]}
          folderChain={pathEntries.map((name, idx) => ({
            id: `${idx}`,
            name,
          }))}
          // fileActions={fileActions}
          // onFileAction={handleFileAction}
          disableDefaultFileActions={[
            ChonkyActions.SortFilesByName.id,
            ChonkyActions.SortFilesByDate.id,
            ChonkyActions.SortFilesBySize.id,
            ChonkyActions.ToggleShowFoldersFirst.id,
            ChonkyActions.ToggleHiddenFiles.id,
            ChonkyActions.FocusSearchInput.id,
          ]}
        >
          <FileNavbar />
          <FileToolbar />
          <FileList />
          <FileContextMenu />
        </FileBrowser>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
