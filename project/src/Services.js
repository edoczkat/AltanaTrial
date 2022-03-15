export class Services {

    http = "https://api.altana.ai/atlas/v1/ui/#/";
    token = "MTpJbnRlcnZpZXclMjAyMDIxLTA5LTIyOjE2MzIzNTk2NTU6NWNhMzViYjk.ZmEwZWI5OTdmYWJjYWFlZWJmY2YyNGYyN2FkMmQ5YzkwODQ4NWNiYg";

    constructor(url_prefix = "") {
        this.http = (new HttpService(url_prefix))
    }

    async getAll() {
        return await this.http.get(``)
    }

    async get(id) {
        return await this.http.get(`/${id}`)
    }

    async create(body) {
        return await this.http.post(``, body)
    }

    async update(id, body) {
        return await this.http.put(`/${id}`, body)
    }

    async delete(id) {
        return await this.http.remove(`/${id}`)
    }

    async get(url, queryParams) {
        try {
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                headers: this.headers
            })
            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error)
            return null
        }
    }
}