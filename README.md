# GatedComponent

This is an NPM package that creates a React component for gated content functionality using Netlify Identity. It allows you to restrict access to certain parts of your application based on the user's authentication status.

Or more simply understood, put anything that needs authentication inside a `<GatedComponent></GatedComponent>` tag and it will only be rendered if the user is logged in.

If you want to render a login form when the user is not authenticated, you can pass a component as a prop to the `noAccessContent` prop.

<img width="500" alt="screenie" src="https://github.com/neontomo/netlify-gated-components/assets/105588693/33283358-b97e-4614-89b3-4a5693d41cf4">

_Styling is not included in the package._

## Installation

To install this package, run the following command:

```bash
# npm
npm install netlify-gated-components
# or yarn
yarn add netlify-gated-components
# or pnpm
pnpm add netlify-gated-components
```

## Install dependencies

You also need to install the `netlify-identity-widget` package to use this component. You can install it by running the following command:

```bash
# npm
npm install netlify-identity-widget
# or yarn
yarn add netlify-identity-widget
# or pnpm
pnpm add netlify-identity-widget

# Install types for TypeScript
npm install @types/netlify-identity-widget
# or yarn
yarn add @types/netlify-identity-widget
# or pnpm
pnpm add @types/netlify-identity-widget
```

## Import the package into your React component:

```javascript
import GatedComponent from 'netlify-gated-components'
```

## Usage

To use the `GatedComponent` component, you need to wrap the content you want to restrict access to inside the component. You can also specify a component to render when the user is not authenticated.

**Note:** To use this package, you need to pass the `netlifyIdentity` object as a prop to the `GatedComponent` component.

### Props

- `netlifyIdentity` (required): The Netlify Identity object.
- `children` (required): The content to render when the user is authenticated. Takes a valid React component.
- `noAccessContent` (optional): The component to render when the user is not authenticated.
- `reloadOnLogin` (optional): A boolean value that determines whether the page should be reloaded when the user logs in and out. Default is `true`.

## Example

```javascript
'use client'
import React, { useState, useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import GatedComponent from 'netlify-gated-components'

function Component() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    setUserName(
      netlifyIdentity?.currentUser()?.user_metadata?.full_name || 'Anon'
    )
  }, [])

  const noAccessContent = (
    <div className="gated-content-no-access">
      <h4 className="gated-content-no-access-heading">
        🔓 You must be logged in to see this content.
      </h4>
      <div className="gated-content-no-access-button-group">
        <input
          type="button"
          value="Log in"
          onClick={() => netlifyIdentity.open('login')}
          className="gated-content-no-access-button"
          id="gated-content-no-access-login-button"
        />
        <input
          type="button"
          value="Sign up"
          onClick={() => netlifyIdentity.open('signup')}
          className="gated-content-no-access-button"
          id="gated-content-no-access-signup-button"
        />
      </div>
    </div>
  )

  const content = (
    <div className="gated-content">
      <h4 className="gated-content-heading">👋 Logged in as {userName}.</h4>
      <div className="gated-content-button-group">
        <input
          type="button"
          value="Log out"
          onClick={() => netlifyIdentity.logout()}
        />
      </div>
    </div>
  )

  return (
    <div>
      <GatedComponent
        netlifyIdentity={netlifyIdentity}
        noAccessContent={noAccessContent}
        reloadOnLogin={true}>
        {content}
      </GatedComponent>
    </div>
  )
}

export default Component
```

## License

NO license.

## Author

- [neontomo on GitHub](https://github.com/neontomo)
- [neontomo on LinkedIn](https://www.linkedin.com/in/tomo-myrman)

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue if you have any questions or suggestions.

https://github.com/neontomo/netlify-gated-components-npm
