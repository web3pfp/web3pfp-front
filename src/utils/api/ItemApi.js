import Base from "./Base";

export default class ItemApi extends Base {
    async create(data) {
        if (!super.getToken()) return null;
        return super.post("item/upload", data);
    }
    async getAll() {
        if (!super.getToken()) return null;
        return super.get("item");
    }
}