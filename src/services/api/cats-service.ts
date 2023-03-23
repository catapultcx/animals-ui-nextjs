import { Cat } from "@/domain/cat";
import { BaseAPIService } from "./base-api-service";

interface GetCommand {
	id: string;
}

interface CreateCommand {
	name: string;
	description: string;
}

interface UpdateCommand {
	id: string;
	cat: Cat;
}

interface SearchCommand {
	name?: string;
	description?: string;
}

export class CatsService extends BaseAPIService {
	async get(params: GetCommand): Promise<Cat | null> {
		return await this._fetchGET(`${this.baseUrl}/cats/${params.id}`);
	}

	async all(): Promise<{ cats: Cat[] } | null> {
		return await this._fetchGET(`${this.baseUrl}/cats`);
	}

	async create(createCommand: CreateCommand): Promise<Cat | null> {
		return await fetch(`${this.baseUrl}/cats`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(createCommand),
		})
			.then(this.handleError)
			.catch((err) => {
				console.log(err.message);
				throw err;
			});
	}

	async delete(id: string): Promise<void> {
		return await fetch(`${this.baseUrl}/cats/${id}`, {
			method: "DELETE",
		})
			.then(this.handleError)
			.catch((err) => {
				console.log(err.message);
				throw err;
			});
	}

	async update({ id, cat }: UpdateCommand): Promise<Cat | null> {
		return await fetch(`${this.baseUrl}/cats/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cat),
		})
			.then(this.handleError)
			.catch((err) => {
				console.log(err.message);
				throw err;
			});
	}

	async search({ name, description }: SearchCommand): Promise<{ cats: Cat[] } | null> {
		const url = new URL(`${this.baseUrl}/cats/search`);
		if (name) {
			url.searchParams.append("name", name);
		}
		if (description) {
			url.searchParams.append("description", description);
		}
		return await this._fetchGET(url.toString());
	}
}
