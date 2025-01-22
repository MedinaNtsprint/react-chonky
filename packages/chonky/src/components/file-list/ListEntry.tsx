import React, { useContext, useMemo, useState } from 'react';

import { DndEntryState, FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import {
    useDndIcon,
    useFileEntryHtmlProps,
    useFileEntryState,
} from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';
import { useDispatch } from 'react-redux';
import { ChonkyDispatch } from '../../types/redux.types';

interface StyleState {
    entryState: FileEntryState;
    dndState: DndEntryState;
}
interface ChildContainerProps {
    childrenFiles: any[]; // Ajusta el tipo según tu modelo
    dndState: any; // Ajusta según sea necesario
    keyChildren: string;
}

export const ChildContainer: React.FC<ChildContainerProps> = ({
    childrenFiles,
    dndState,
    keyChildren,
}) => {
    return (
        <div
            style={{
                paddingLeft: '1rem',
                borderLeft: '2px solid #ddd',
                display: 'block', // Asegurar que crezca como bloque
                marginTop: '0.5rem', // Espaciado opcional
            }}
            key={keyChildren}
        >
            {childrenFiles.map((child: any) => (
                <ListEntry
                    key={child.id}
                    file={child}
                    selected={false}
                    focused={false}
                    dndState={dndState}
                />
            ))}
        </div>
    );
};

export const ListEntry: React.FC<FileEntryProps> = React.memo(
    ({ file, selected, focused, dndState }) => {
      const dispatch: ChonkyDispatch = useDispatch();
  

        const entryState: FileEntryState = useFileEntryState(file, selected, focused);
        const dndIconName = useDndIcon(dndState);
        const [isExpanded, setIsExpanded] = useState(false); // Estado para manejar el dropdown
        const { fileModDateString, fileSizeString } =
            useLocalizedFileEntryStrings(file);
        const styleState = useMemo<StyleState>(
            () => ({
                entryState,
                dndState,
            }),
            [dndState, entryState]
        );
        const classes = useStyles(styleState);
        const commonClasses = useCommonEntryStyles(entryState);
        const ChonkyIcon = useContext(ChonkyIconContext);
        const fileEntryHtmlProps = useFileEntryHtmlProps(file);

        const hasChildren =
            file && file.childrenCount !== undefined && file.childrenCount > 0;
        const toggleExpandItem = () => {
            setIsExpanded((prev) => !prev);
            dispatch(toggleExpand(file.id));
        };
        return (
            <div className={classes.accordionContainer}>
                {/* Cabecera del acordeón */}
                <div
                    className={`${classes.listFileEntry} ${
                        isExpanded ? classes.listFileEntryExpanded : ''
                    }`}
                    {...fileEntryHtmlProps}
                >
                    <div className={commonClasses.focusIndicator}></div>
                    <div
                        className={c([
                            commonClasses.selectionIndicator,
                            classes.listFileEntrySelection,
                        ])}
                    ></div>

                    <div className={classes.listFileEntryIcon}>
                        <div
                            onClick={(e) => {
                                e.stopPropagation(); // Evita que el evento se propague a la fila
                                toggleExpand(); // Lógica para expandir o contraer
                            }}
                            className={classes.dropdownButton}
                        >
                            {hasChildren ? (
                                isExpanded ? (
                                    '▼'
                                ) : (
                                    '▶'
                                )
                            ) : (
                                <span className={classes.placeholder}></span>
                            )}
                        </div>
                        <ChonkyIcon
                            icon={dndIconName ?? entryState.icon}
                            spin={dndIconName ? false : entryState.iconSpin}
                            fixedWidth={true}
                        />
                    </div>
                    <div
                        className={classes.listFileEntryName}
                        title={file ? file.name : undefined}
                    >
                        <FileEntryName file={file} />
                    </div>

                    <div className={classes.listFileEntryProperty}>
                        {file ? (
                            (fileModDateString ?? <span>—</span>)
                        ) : (
                            <TextPlaceholder minLength={5} maxLength={15} />
                        )}
                    </div>
                    <div className={classes.listFileEntryProperty}>
                        {file ? (
                            (fileSizeString ?? <span>—</span>)
                        ) : (
                            <TextPlaceholder minLength={10} maxLength={20} />
                        )}
                    </div>
                </div>
                {isExpanded && hasChildren && (
                    <ChildContainer
                        childrenFiles={file?.children || []}
                        dndState={dndState}
                        keyChildren={file.id}
                    />
                )}
            </div>
        );
    }
);

const useStyles = makeLocalChonkyStyles((theme) => ({
    accordionContainer: {
        marginBottom: '0.5rem',
    },
    listFileEntry: {
        // boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
        fontSize: theme.listFileEntry.fontSize,
        color: ({ dndState }: StyleState) =>
            dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : 'inherit',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
        transition: 'height 0.3s ease',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryIcon: {
        color: ({ entryState, dndState }: StyleState) =>
            dndState.dndIsOver
                ? dndState.dndCanDrop
                    ? theme.dnd.canDropColor
                    : theme.dnd.cannotDropColor
                : entryState.color,
        fontSize: theme.listFileEntry.iconFontSize,
        boxSizing: 'border-box',
        padding: [2, 4],
        zIndex: 20,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    listFileEntryName: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1 1 300px',
        zIndex: 20,
        borderRight: `1px solid ${theme.palette.divider}`,
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: 400,
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
    },
    listFileEntryProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
    dropdownButton: {
        color: theme.iconOnlyButton.color,
        width: '1rem', // Ajusta según el tamaño de las flechas
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        display: 'inline-block',
        width: '1rem', // Igual que el tamaño de las flechas
        height: '1rem',
    },
    listFileEntryExpanded: {
        height: '4rem', // Altura de la fila cuando está expandida
    },
}));
