/**
 * @flow
 */

import { StyleSheet, View } from 'react-native';

import type { ElementType } from 'react';
import React from 'react';

type PropsType = {
    +children?: Node | Array<Node>,

    style?: StylesType,
    as?: ElementType,

    alignContentFlexStart?: boolean,
    alignContentFlexEnd?: boolean,
    alignContentCenter?: boolean,
    alignContentStretch?: boolean,
    alignContentSpaceBetween?: boolean,
    alignContentSpaceAround?: boolean,

    alignItemsFlexStart?: boolean,
    alignItemsFlexEnd?: boolean,
    alignItemsCenter?: boolean,
    alignItemsStretch?: boolean,
    alignItemsBaseline?: boolean,

    alignSelfAuto?: boolean,
    alignSelfFlexStart?: boolean,
    alignSelfFlexEnd?: boolean,
    alignSelfCenter?: boolean,
    alignSelfStretch?: boolean,
    alignSelfBaseline?: boolean,

    // In React Native flex does not work the same way that it does in CSS. flex is a number rather than a string, and it works according to the Yoga library at
    // https://github.com/facebook/yoga
    // When flex is a positive number, it makes the component flexible and it will be sized proportional to its flex value. So a component with flex set to 2 will take twice the space as a component with flex set to 1.
    // When flex is 0, the component is sized according to width and height and it is inflexible.
    // When flex is -1, the component is normally sized according width and height. However, if there's not enough space, the component will shrink to its minWidth and minHeight.
    // flexGrow, flexShrink, and flexBasis work the same as in CSS.
    flex?: number,

    basis?: number | string,

    directionRow?: boolean,
    directionRowReverse?: boolean,
    directionColumn?: boolean,
    directionColumnReverse?: boolean,

    grow?: number,
    noGrow?: boolean,
    shrink?: number,
    noShrink?: boolean,

    wrap?: boolean,
    noWrap?: boolean,

    justifyContentFlexStart?: boolean,
    justifyContentFlexEnd?: boolean,
    justifyContentCenter?: boolean,
    justifyContentSpaceBetween?: boolean,
    justifyContentSpaceAround?: boolean,
    justifyContentSpaceEvenly?: boolean,

    // shortcuts
    alignCenter?: boolean,
    alignVCenter?: boolean,
    alignHCenter?: boolean
};

const style = StyleSheet.create({
    alignContentFlexStart: {
        alignContent: 'flex-start'
    },
    alignContentFlexEnd: {
        alignContent: 'flex-end'
    },
    alignContentCenter: {
        alignContent: 'center'
    },
    alignContentStretch: {
        alignContent: 'stretch'
    },
    alignContentSpaceBetween: {
        alignContent: 'space-between'
    },
    alignContentSpaceAround: {
        alignContent: 'space-around'
    },

    alignItemsFlexStart: {
        alignItems: 'flex-start'
    },
    alignItemsFlexEnd: {
        alignItems: 'flex-end'
    },
    alignItemsCenter: {
        alignItems: 'center'
    },
    alignItemsStretch: {
        alignItems: 'stretch'
    },
    alignItemsBaseline: {
        alignItems: 'baseline'
    },

    alignSelfAuto: {
        alignSelf: 'auto'
    },
    alignSelfFlexStart: {
        alignSelf: 'flex-start'
    },
    alignSelfFlexEnd: {
        alignSelf: 'flex-end'
    },
    alignSelfCenter: {
        alignSelf: 'center'
    },
    alignSelfStretch: {
        alignSelf: 'stretch'
    },
    alignSelfBaseline: {
        alignSelf: 'baseline'
    },

    directionRow: {
        flexDirection: 'row'
    },
    directionRowReverse: {
        flexDirection: 'row-reverse'
    },
    directionColumn: {
        flexDirection: 'column'
    },
    directionColumnReverse: {
        flexDirection: 'column-reverse'
    },

    noGrow: {
        flexGrow: 0
    },
    noShrink: {
        flexShrink: 0
    },

    wrap: {
        flexWrap: 'wrap'
    },
    noWrap: {
        flexWrap: 'nowrap'
    },

    justifyContentFlexStart: {
        justifyContent: 'flex-start'
    },
    justifyContentFlexEnd: {
        justifyContent: 'flex-end'
    },
    justifyContentCenter: {
        justifyContent: 'center'
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    justifyContentSpaceAround: {
        justifyContent: 'space-around'
    },
    justifyContentSpaceEvenly: {
        justifyContent: 'space-evenly'
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const FlexBox = (props: PropsType) => {
    const cProps = Object.keys(props).reduce(
        (obj, k) => {
            if (k in style) {
                obj.filterStyle.push(style[k]);
            } else {
                obj.other[k] = props[k];
            }
            return obj;
        },
        { filterStyle: [], other: {} }
    );

    const {
        filterStyle,
        other: { style: propsStyle, as: Component = View, children, flex, basis, alignHCenter, alignVCenter, ...rest }
    } = (cProps: any);

    const compStyle = {};
    flex && (compStyle.flex = flex);
    basis && (compStyle.flexBasis = basis);
    if (alignHCenter) {
        switch (true) {
            case props.directionRow:
            case props.directionRowReverse:
                compStyle.justifyContent = 'center';
                break;
            case props.directionColumn:
            case props.directionColumnReverse:
            default:
                compStyle.alignItems = 'center';
                break;
        }
    }
    if (alignVCenter) {
        switch (true) {
            case props.directionRow:
            case props.directionRowReverse:
                compStyle.alignItems = 'center';
                break;
            case props.directionColumn:
            case props.directionColumnReverse:
            default:
                compStyle.justifyContent = 'center';
                break;
        }
    }

    return (
        <Component style={[...filterStyle, compStyle, propsStyle]} {...rest}>
            {children}
        </Component>
    );
};

export default FlexBox;
