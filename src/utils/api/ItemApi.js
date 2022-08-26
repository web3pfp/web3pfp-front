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

    async update(data) {
        if (!super.getToken()) return null;
        return super.post("item/update", data);
    }
}