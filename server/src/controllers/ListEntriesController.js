import { Auth0Provider } from "@bcwdev/auth0provider";
import { listEntriesService } from "../services/ListEntriesService.js";
import BaseController from "../utils/BaseController.js";

export class ListEntriesController extends BaseController {
    constructor() {
        super('api/listentries')
        this.router
            .get('', this.getListEntries)
            .get('/:listEntryId', this.getListEntryById)
            // 🔽 AUTHENTICATION REQUIRED 🔽
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createListEntry)
            .put('', this.editPosition)
            .put('/:listEntryId', this.editListEntry)
            .delete('/:listEntryId', this.destroyListEntry)
    }

    async getListEntries(request, response, next) {
        try {
            const listEntries = await listEntriesService.getListEntries()
            return response.send(listEntries)
        } catch (error) { next(error) }
    }

    async getListEntryById(request, response, next) {
        try {
            const listEntryId = request.params.listEntryId
            const listEntry = await listEntriesService.getListEntryById(listEntryId)
            return response.send(listEntry)
        } catch (error) { next(error) }
    }

    // SECTION 🔽 AUTHENTICATION REQUIRED 🔽

    async editListEntry(request, response, next) {
        try {
            const listEntryId = request.params.listEntryId
            const userId = request.userInfo.id
            const listEntryData = request.body
            const updatedListEntry = await listEntriesService.editListEntry(listEntryId, userId, listEntryData)
            return response.send(updatedListEntry)
        } catch (error) { next(error) }
    }

    async editPosition(request, response, next) {
        try {
            request.body.userId = request.userInfo.id
            const updatedListEntries = await listEntriesService.editPosition(request.body)
            return response.send(updatedListEntries)
        } catch (error) { next(error) }
    }

    async createListEntry(request, response, next) {
        try {
            const listEntryData = request.body
            const userId = request.userInfo.id
            listEntryData.creatorId = userId
            const newListEntry = await listEntriesService.createListEntry(listEntryData)
            return response.send(newListEntry)
        } catch (error) { next(error) }
    }

    async destroyListEntry(request, response, next) {
        try {
            const listEntryId = request.params.listEntryId
            const userId = request.userInfo.id
            const listEntry = await listEntriesService.destroyListEntry(listEntryId, userId)
            return response.send(listEntry)
        } catch (error) { next(error) }
    }

}