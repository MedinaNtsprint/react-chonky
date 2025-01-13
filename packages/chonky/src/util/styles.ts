import { Theme as MuiTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { DeepPartial } from 'tsdef';

export const lightTheme = {
  fontFamily: "'Poppins', sans-serif", 
  colors: {
    debugRed: '#fabdbd',
    debugBlue: '#bdd8fa',
    debugGreen: '#d2fabd',
    debugPurple: '#d2bdfa',
    debugYellow: '#fae9bd',
    defaultColor:"#000",

    textActive: '#09f',
    buttonActive: 'rgb(255 255 255 / 1)',
    backgroundActive:'hsl(210 40% 52%)',
  },

  fontSizes: {
    rootPrimary: 15,
  },

  margins: {
    rootLayoutMargin: 8,
  },

  root: {
    borderRadius: 4,
    borderStyle: 'solid 1px',
    height: '100%',
  },

  toolbar: {
    size: 30,
    lineHeight: '30px', // `px` suffix is required for `line-height` fields to work
    buttonPadding: 8,
    fontSize: '1.10rem',
    buttonRadius: 4,
  },

  dnd: {
    canDropColor: 'green',
    cannotDropColor: 'red',
    canDropMask: 'rgba(180, 235, 180, 0.75)',
    cannotDropMask: 'rgba(235, 180, 180, 0.75)',
    fileListCanDropMaskOne: 'rgba(180, 235, 180, 0.1)',
    fileListCanDropMaskTwo: 'rgba(180, 235, 180, 0.2)',
    fileListCannotDropMaskOne: 'rgba(235, 180, 180, 0.1)',
    fileListCannotDropMaskTwo: 'rgba(235, 180, 180, 0.2)',
  },

  dragLayer: {
    border: 'solid 2px #09f',
    padding: '7px 10px',
    borderRadius: 2,
  },

  fileList: {
    desktopGridGutter: 8,
    mobileGridGutter: 5,
  },

  gridFileEntry: {
    childrenCountSize: '1.6em',
    iconColorFocused: '#000',
    iconSize: '2.4em',
    iconColor: '#fff',
    borderRadius: 5,
    fontSize: 14,

    fileColorTint: 'rgba(255, 255, 255, 0.4)',
    folderBackColorTint: 'rgba(255, 255, 255, 0.1)',
    folderFrontColorTint: 'rgba(255, 255, 255, 0.4)',
  },

  listFileEntry: {
    propertyFontSize: 14,
    iconFontSize: '1.20em',
    iconBorderRadius: 5,
    lineHeight: '30px',
    fontSize: '1.05rem',
  },
  nextUIButton:{
     boxSizing:'border-box',
    display: 'none',
    overflow: 'hidden', 
    position: 'relative', 
    zIndex: 0,
    justifyContent: 'center',
    outlineStyle: 'none',
    fontWeight: 400,
    color: 'rgb(255 255 255 / 1)',
    whiteSpace: 'nowrap', 
    appearance: 'none',
    userSelect: 'none', 
    height: '2.5rem',    
  },
  iconOnlyButton:{
    color:"#000",
    width: 30,
    textAlign: 'center',
  }
};

export type ChonkyTheme = typeof lightTheme;

export const darkThemeOverride: DeepPartial<ChonkyTheme> = {
  iconOnlyButton:{
    color:"#FFF",
  },
  gridFileEntry: {
    fileColorTint: 'rgba(50, 50, 50, 0.4)',
    folderBackColorTint: 'rgba(50, 50, 50, 0.4)',
    folderFrontColorTint: 'rgba(50, 50, 50, 0.15)',
  },
};

export const mobileThemeOverride: DeepPartial<ChonkyTheme> = {
  fontSizes: {
    rootPrimary: 13,
  },
  margins: {
    rootLayoutMargin: 4,
  },
  toolbar: {
    size: 28,
    lineHeight: '28px',
    fontSize:'1rem',
  },
  gridFileEntry: {
    fontSize: 13,
  },
  listFileEntry: {
    propertyFontSize: 12,
    iconFontSize: '1em',
    fontSize: '1.10rem',
  },
};

export const useIsMobileBreakpoint = () => {
  return useMediaQuery('(max-width:480px)');
};

export const getStripeGradient = (colorOne: string, colorTwo: string) =>
  'repeating-linear-gradient(' +
  '45deg,' +
  `${colorOne},` +
  `${colorOne} 10px,` +
  `${colorTwo} 0,` +
  `${colorTwo} 20px` +
  ')';

export const makeLocalChonkyStyles = <C extends string = string>(
  styles: (theme: ChonkyTheme & MuiTheme) => any,
  // @ts-ignore
): any => createUseStyles<ChonkyTheme, C>(styles);

export const makeGlobalChonkyStyles = <C extends string = string>(
  makeStyles: (theme: ChonkyTheme & MuiTheme) => any,
) => {
  const selectorMapping = {};
  const makeGlobalStyles = (theme: ChonkyTheme) => {
    const localStyles = makeStyles(theme as any);
    const globalStyles = {};
    const localSelectors = Object.keys(localStyles);
    localSelectors.map((localSelector) => {
      const globalSelector = `chonky-${localSelector}`;
      const jssSelector = `@global .${globalSelector}`;
      // @ts-ignore
      globalStyles[jssSelector] = localStyles[localSelector];
      // @ts-ignore
      selectorMapping[localSelector] = globalSelector;
    });
    return globalStyles;
  };

  // @ts-ignore
  const useStyles = createUseStyles<ChonkyTheme, C>(makeGlobalStyles as any);
  return (...args: any[]): any => {
    const styles = useStyles(...args);
    const classes = {};
    Object.keys(selectorMapping).map((localSelector) => {
      // @ts-ignore
      classes[localSelector] = selectorMapping[localSelector];
    });
    return { ...classes, ...styles };
  };
};

export const important = <T>(value: T) => [value, '!important'];

export const c: (...args: classNames.ArgumentArray) => string = classnames.default;
