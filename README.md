SSH2 Async
==========

Async ssh2 client built on the JavaScript native ssh2 project. The primary focus of this library is:

* Usability
* Intuative tunneling API for bouncing through jumps
* Concurrent command exec for efficient remote controlling and configuration of servers
* Easy shell establishment for use with CLIs

## Usage
### Connect
> **Note**: Always connect before running other commands! Always end so your program can exit!
```ts
import {Service} from 'ssh2-async'

async function main() {
    const service = new Service()
    try {
        service
            .host({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
            .connect()

        await service.exec('date')
        
    } finally {
        await service.end()
    }
}

main()

```
## Service
```ts
import {Service} from 'ts-ssh'
```

`Service` is a high-level API that consumes and composes `Client`(s) for ease of use.

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
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
    .tunnel({host: 'localhost', user: 'foo', agent: process.env['SSH_AUTH_SOCK']})
    .connect()
```

**Caveats:**
- Agent forwarding is not neccessary.
- The *ssh* connection is always made from the local client, the *network* connection is established via
ssh forwarding at each intermediate host.
- Because the *ssh* connection is always made from the client, you must supply the credentials;
the credentials on the bounce hosts are not currently utilized.

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

## Client
```ts
import {Client} from 'ts-ssh'
```

`Client` is a low-level async wrapper over SSH2

### Pty
```ts
await client.pty('sudo su')
```

Executes the command on a channel, forces pty, and returns the channel.
