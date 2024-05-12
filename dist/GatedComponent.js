"use strict";
/// <reference path="GatedComponent.d.ts" />
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
function GatedComponent({ netlifyIdentity, children, noAccessContent, reloadOnLogin = true }) {
    const [loggedIn, setLoggedIn] = (0, react_1.useState)(false);
    const [netlifyInitSet, setNetlifyInitSet] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        netlifyIdentity.init();
        const handleLogin = (user) => {
            if (!user.user_metadata || !user.user_metadata.full_name)
                return;
            setLoggedIn(true);
            if (!netlifyInitSet) {
                setNetlifyInitSet(true);
            }
            if (reloadOnLogin) {
                window.location.reload();
            }
        };
        const handleLogout = () => {
            setLoggedIn(false);
            if (reloadOnLogin) {
                window.location.reload();
            }
        };
        netlifyIdentity.on('login', handleLogin);
        netlifyIdentity.on('logout', handleLogout);
        const currentUser = netlifyIdentity.currentUser();
        if (currentUser) {
            setLoggedIn(true);
            if (!netlifyInitSet) {
                setNetlifyInitSet(true);
            }
        }
        return () => {
            // If the component is unmounted, remove the event listeners
            netlifyIdentity.off('login', handleLogin);
            netlifyIdentity.off('logout', handleLogout);
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        loggedIn && netlifyInitSet && react_1.default.createElement(react_1.default.Fragment, null, children),
        !loggedIn && react_1.default.createElement(react_1.default.Fragment, null, noAccessContent)));
}
exports.default = GatedComponent;
