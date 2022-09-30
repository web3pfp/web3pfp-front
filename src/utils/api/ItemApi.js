import Base from "./Base";

export default class ItemApi extends Base {
    async getAll() {
        if (!super.getToken()) return null;
        return super.get("item");
    }

    async create(data) {
        if (!super.getToken()) return null;
        return super.post("item/create", data);
    }

    async confirm(data) {
        if (!super.getToken()) return null;
        return super.post("item/confirm", data);
    }

    async delete(data) {
        if (!super.getToken()) return null;
        return super.post("item/delete", data);
    }

    async update(data) {
        if (!super.getToken()) return null;
        return super.post("item/update", data);
    }

    async getContract() {
        if (!super.getToken()) return null;
        return super.get("item/getContract");
    }

    async getTokenContract(data) {
        if (!super.getToken()) return null;
        return super.post("item/getTokenContract", data);
    }

    async changeOwner(data) {
        if (!super.getToken()) return null;
        return super.post("item/changeOwner", data);
    }
}