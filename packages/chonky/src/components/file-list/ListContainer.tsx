/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { CSSProperties, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { VariableSizeList } from 'react-window';

import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import { useInstanceVariable } from '../../util/hooks-helpers';
import { makeLocalChonkyStyles } from '../../util/styles';
import { SmartFileEntry } from './FileEntry';
import { FileListHeader } from './FileListHeader';
import { useDispatch } from 'react-redux';
import { ChonkyDispatch } from '../../types/redux.types';

export interface FileListListProps {
    width: number;
    height: number;
}

export const ListContainer: React.FC<FileListListProps> = React.memo((props) => {
    const { width, height } = props;
    const dispatch: ChonkyDispatch = useDispatch();

    const viewConfig = useSelector(selectFileViewConfig);

    const listRef = useRef<VariableSizeList>();

    const displayFileIds = useSelector(selectors.getDisplayFileIds);
    const displayFileIdsRef = useInstanceVariable(displayFileIds);
    const getItemKey = useCallback(
        (index: number) => displayFileIdsRef.current[index] ?? `loading-file-${index}`,
        [displayFileIdsRef]
    );

    const classes = useStyles();
    const listComponent = useMemo(() => {
        // When entry size is null, we use List view
        const rowRenderer = (data: { index: number; style: CSSProperties }) => {
            return (
                <div style={data.style}>
                    <SmartFileEntry
                        fileId={displayFileIds[data.index] ?? null}
                        displayIndex={data.index}
                        fileViewMode={FileViewMode.List}
                    />
                </div>
            );
        };

        const getRowHeight = (index: number) => {
            // Define lógicas dinámicas para la altura
            return index % 2 === 0 ? 35 : 40;
        };
        return (
            <div>
                <FileListHeader height={height} width={width} />

                <VariableSizeList
                    ref={listRef as any}
                    className={classes.listContainer}
                    itemSize={getRowHeight}
                    height={height - 50}
                    itemCount={displayFileIds.length}
                    width={width}
                    itemKey={getItemKey}
                >
                    {rowRenderer}
                </VariableSizeList>
            </div>
        );
    }, [
        classes.listContainer,
        viewConfig.entryHeight,
        height,
        displayFileIds,
        width,
        getItemKey,
    ]);

    return listComponent;
});

const useStyles = makeLocalChonkyStyles((theme) => ({
    listContainer: {
        borderTop: `solid 1px ${theme.palette.divider}`,
    },
}));
