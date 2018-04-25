SSH2 Async
==========

This library attempts to create an easy to consume client API
built on top of the excellent work of the ssh2 project. The primary focus of this library is:

* Ease of use
* Intuative tunneling API for bouncing through jumps
* Concurrent command exec for efficient remote controlling and configuration of servers
* Easy shell establishment for use with CLIs


## Usage
### Connect
> **Note**: Always connect before running other commands!
```ts
import {Service} from 'ssh2-async'

async function main() {
    const service = new Service()
    service.host({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
    await service.connect()
}

main()

```

### Exec
```ts
const result = await service.exec('date')
```

### Shell
Shell opens a terminal and pipes stdin/stdout through to it.
Returns after the connection has ended (ie logout/exit).
```ts
await service.shell()
```

### Tunnel
```ts
await service
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK'], agentForward: true})
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
    .connect()
```

### End
> **Note**: Always end or your program may hang!
```ts
await service.end()
```