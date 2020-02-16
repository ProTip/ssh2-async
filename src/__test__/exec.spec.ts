import {Service} from '../index'

jest.setTimeout(10000)

describe("Service", async () => {
    it('Connects', async () => {
        const service = new Service()
        service.host({host: '127.0.0.1', port: 2222, username: 'test', password: 'password'})
        await service.connect()
        await service.end()
    })

    /** Two second timeout ensures we are running these concurrently */
    it('Runs concurrent exec', async () => {
        const service = new Service()
        service.host({host: '127.0.0.1', port: 2222, username: 'test', password: 'password'})
        await service.connect()
        
        const results = await Promise.all(
            Array(5).fill(0).map( (k, i) => {
                return service.exec(`echo -n '${i}'; sleep 1`)
            })
        )
        await service.end()

        results.forEach( (r, i) => {
            expect(r.stdout).toBe(`${i}`)
        })
    }, 2000)

    it('Hops', async () => {
        const service = new Service()
        await service
            .tunnel({host: '127.0.0.1', port: 2222, username: 'test', password: 'password'})
            .tunnel({host: '127.0.0.1', port: 22, username: 'test', password: 'password'})
            .connect()
        
        await service.end()
    })
})