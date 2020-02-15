SSH2 Async
==========

Async ssh2 client built on the JavaScript native ssh2 project. The primary focus of this library is:

* Usability
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
    await service.exec('date')
    await service.end()
}

main()

```

### Exec
> Note: You can run up to 10 concurrent exec operations on one connection! The number of
> conccurent exec operations is limited by the ssh2 server channel limit, and this
> defaults to 10 on most systems.
```ts
const result = await service.exec('date')
```

### Shell
Shell opens a terminal and pipes stdin/stdout through to it.
Returns after the connection has ended (ie logout/exit).
```ts
await service.shell()
```

### Tunnel(Hop)
```ts
await service
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK'], agentForward: true})
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
    .connect()
```

### Stream
Like `exec`, but returns the channel! Use `stream` if you would like to interact with the remote process
(ie handle `stdout`, write to `stdin`, etc). Internally used for the tunneling command:

```ts
await service.stream('nc ...')
```

### End
> **Note**: Always end or your program may hang!
```ts
await service.end()
```