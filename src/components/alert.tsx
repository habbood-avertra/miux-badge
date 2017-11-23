import * as React from "react";
// import * as ReactDOM from "react-dom";
import {SFC} from "react";
import * as classNames from "classnames";

export interface AlertProps
{
    message: string;
    className?: string;
    bootstrapStyle: "default" | "primary" | "success" | "info" | "warning" | "danger";
}

export const Alert: SFC<AlertProps> = ({className, bootstrapStyle, message}) =>
{
    if(message)
    {
        return (
            <div className={classNames(`alert alert-${bootstrapStyle}`, className)}>
                {message}
            </div>
        );
    }
    else
    {
        return null;
    }
};

Alert.displayName = "Alert";
