import * as React from "react";
import {SFC} from "react";
import * as classNames from "classnames";

import "../ui/badge.css";

export interface BadgeProps
{
    isVisible?: boolean;
    badgeType: "badge" | "label";
    defaultValue?: string;
    className?: string;
    style?: object;
    value?: string;
    bootstrapStyle?: BootstrapStyle;
    clickable?: boolean;
    onClickAction?: () => void;
    getRef?: (node: HTMLElement) => void;
}

export type BootstrapStyle = "default" | "info" | "inverse" | "primary" | "danger" | "success" | "warning";

export const Badge: SFC<BadgeProps> = (props) =>
{
    if(props.isVisible)
    {
        return (
            <span
                className=
                    {
                        classNames(
                            "widget-badge",
                            props.badgeType,
                            props.className,
                            {
                                [`label-${props.bootstrapStyle}`]: !!props.bootstrapStyle,
                                "widget-badge-clickable": props.clickable
                            })
                    }
                onClick={props.onClickAction}
                ref={props.getRef}
                style={props.style}
            >
                {props.value || props.defaultValue}
            </span>
        );
    }
    else
    {
        return null;
    }
};
