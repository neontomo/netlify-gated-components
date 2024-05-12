/// <reference path="../GatedComponent.d.ts" />
import React from 'react';
export default function GatedComponent({ netlifyIdentity, children, noAccessContent, reloadOnLogin }: {
    netlifyIdentity: any;
    children: React.ReactNode;
    noAccessContent?: React.ReactNode;
    reloadOnLogin?: boolean;
}): React.JSX.Element;
