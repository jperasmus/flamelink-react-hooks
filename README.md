<!-- TITLE/ -->

<h1>flamelink-react-hooks</h1>

<!-- /TITLE -->

<!-- BADGES/ -->

<!-- /BADGES -->

<!-- DESCRIPTION/ -->

Some Flamelink SDK functionality exposed as React Hooks

<!-- /DESCRIPTION -->

## Installation

```bash
npm install -S flamelink-react-hooks
```

## Usage

`flamelink-react-hooks` uses the [Flamelink SDK](https://flamelink.github.io/flamelink-js-sdk/) internally, so please take a look at the [Installation & Usage sections](https://flamelink.github.io/flamelink-js-sdk/#/getting-started?id=usage) for the SDK to see how you can instantiate the `flamelinkApp` instance.

```javascript
import { createFlamelinkHooks } from 'flamelink-react-hooks'
import flamelink from 'flamelink/app'
import 'flamelink/content'
import 'flamelink/storage'

const flamelinkApp = flamelink(/* init flamelink app */)

const { useContent, useContentOnce } = createFlamelinkHooks({ flamelinkApp })

const YourComponent = function(props) {
  const [error, content] = useContent({ schemaKey: 'homepage' })

  if (error) {
    return <p>Error Error Error</p>
  }

  return (
    <section>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </section>
  )
}
```

## Available Hooks

The following hooks are currently available

### useContent

This hook sets up a real-time subscription for the content you want.

**returns:** [error, content]
Array with the first item an error object, otherwise it will be `null` and the second item will be the content payload - initially it will be `null`

### useContentOnce

This hook queries once for the content you want without setting up a real-time connection.

**returns:** [error, content]
Same as `useContent`

### useNav

This hook sets up a real-time subscription for the navigation you want.

**returns:** [error, navigation]
Array with the first item an error object, otherwise it will be `null` and the second item will be the navigation payload - initially it will be `null`

### useNavOnce

This hook queries once for the navigation you want without setting up a real-time connection.

**returns:** [error, navigation]
Same as `useNav`

### useUsers

This hook sets up a real-time subscription for the users you want.

**returns:** [error, users]
Array with the first item an error object, otherwise it will be `null` and the second item will be the users payload - initially it will be `null`

### useUsersOnce

This hook queries once for the users you want without setting up a real-time connection.

**returns:** [error, users]
Same as `useUsers`

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/jperasmus/flamelink-react-hooks/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->

<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li><a href="http://jperasmus.me">JP Erasmus</a> — <a href="https://github.com/jperasmus/flamelink-react-hooks/commits?author=jperasmus" title="View the GitHub contributions of JP Erasmus on repository jperasmus/flamelink-react-hooks">view contributions</a></li></ul>

<h3>Sponsors</h3>

No sponsors yet! Will you be the first?

<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://jperasmus.me">JP Erasmus</a> — <a href="https://github.com/jperasmus/flamelink-react-hooks/commits?author=jperasmus" title="View the GitHub contributions of JP Erasmus on repository jperasmus/flamelink-react-hooks">view contributions</a></li>
<li><a href="http://github.com/apps/dependabot">dependabot[bot]</a> — <a href="https://github.com/jperasmus/flamelink-react-hooks/commits?author=dependabot[bot]" title="View the GitHub contributions of dependabot[bot] on repository jperasmus/flamelink-react-hooks">view contributions</a></li></ul>

<!-- /BACKERS -->

<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://jperasmus.me">JP Erasmus</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/ISC.html">ISC License</a></li></ul>

<!-- /LICENSE -->
