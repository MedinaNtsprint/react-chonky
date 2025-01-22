/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Button from '@mui/material/Button';
import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { ChonkyIconName } from '../../types/icons.types';
import { CustomVisibilityState } from '../../types/action.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { useLocalizedFileActionStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, important, makeGlobalChonkyStyles } from '../../util/styles';
import { colors } from '@mui/material';

export interface ToolbarButtonProps {
    className?: string;
    text: string;
    tooltip?: string;
    active?: boolean;
    icon?: Nullable<ChonkyIconName | string>;
    iconOnly?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dropdown?: boolean;
    isToolbarButton?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo((props) => {
    const {
        className: externalClassName,
        text,
        tooltip,
        active,
        icon,
        iconOnly,
        onClick,
        disabled,
        dropdown,
        isToolbarButton,
    } = props;
    const classes = useStyles();
    const ChonkyIcon = useContext(ChonkyIconContext);
    const iconClassName = c({
        [classes.iconWithText]: true,
        [classes.iconButtonText]: !isToolbarButton,
    });
    const iconComponent =
        icon || iconOnly ? (
            <div className={iconOnly ? '' : iconClassName}>
                <ChonkyIcon
                    icon={icon ? icon : ChonkyIconName.fallbackIcon}
                    fixedWidth={true}
                />
            </div>
        ) : null;

    const className = c({
        [externalClassName ?? '']: true,
        [classes.iconOnlyButton]: iconOnly,
        [classes.buttonActive]: !!active,
        [classes.folderChainBackground]: text && !iconOnly && !isToolbarButton,
    });
    const textClassName = c({
        [classes.spanText]: text && !iconOnly && !isToolbarButton,
    });
    return (
        <Button
            className={className}
            onClick={onClick}
            title={tooltip ? tooltip : text}
            disabled={disabled || !onClick}
        >
            {iconComponent}
            {text && !iconOnly && <span className={textClassName}>{text}</span>}
            {dropdown && text && !iconOnly && (
                <div className={classes.iconDropdown}>
                    <ChonkyIcon icon={ChonkyIconName.dropdown} fixedWidth={true} />
                </div>
            )}
        </Button>
    );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
    spanText: {
        fontFamily: "'Poppins', sans-serif",
        fontSize: '0.875rem',
        textTransform: 'none',
        fontWeight:400
    },
    folderChainBackground: {
        backgroundColor: theme.colors.backgroundActive,
        color: '#fff',
    },
    iconWithText: {
        marginRight: 8,
        color: theme.iconOnlyButton.color,
    },
    iconButtonText: {
        color: '#fff',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '0.875rem',
    },
    iconDropdown: {
        fontSize: '0.7em',
        marginLeft: 2,
        marginTop: 1,
    },
    buttonActive: {
        color: important(theme.colors.buttonActive),
    },
    iconOnlyButton: {
        color: theme.iconOnlyButton.color,
        width: 30,
        textAlign: 'center',
    },
}));

export interface SmartToolbarButtonProps {
    fileActionId: string;
}

export const SmartToolbarButton: React.FC<SmartToolbarButtonProps> = React.memo(
    (props) => {
        const { fileActionId } = props;

        const action = useParamSelector(selectFileActionData, fileActionId);
        const triggerAction = useFileActionTrigger(fileActionId);
        const { icon, active, disabled } = useFileActionProps(fileActionId);
        const { buttonName, buttonTooltip } = useLocalizedFileActionStrings(action);

        if (!action) return null;
        const { button } = action;
        if (!button) return null;
        if (
            action.customVisibility !== undefined &&
            action.customVisibility() === CustomVisibilityState.Hidden
        )
            return null;

        return (
            <ToolbarButton
                text={buttonName}
                tooltip={buttonTooltip}
                icon={icon}
                iconOnly={button.iconOnly}
                active={active}
                onClick={triggerAction}
                disabled={disabled}
            />
        );
    }
);
