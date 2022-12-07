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

    async updateInfo(data) {
        if (!super.getToken()) return null;
        return super.post("item/updateInfo", data);
    }

    async updateInfoConfirm(data) {
        if (!super.getToken()) return null;
        return super.post("item/updateInfoConfirm", data);
    }

    async updatePhoto(data) {
        if (!super.getToken()) return null;
        return super.post("item/updatePhoto", data);
    }

    async updatePhotoConfirm(data) {
        if (!super.getToken()) return null;
        return super.post("item/updatePhotoConfirm", data);
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

    async loadItem(data) {
        if (!super.getToken()) return null;
        return super.post("item/loadItem", data);
    }
}